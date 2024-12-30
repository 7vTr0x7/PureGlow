import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

const SkinAnalyser: React.FC = () => {
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const [tags, setTags] = useState<[]>([]);
  const [error, setError] = useState<string | null>(null);

  const API_KEY = import.meta.env.VITE_CLARIFAI_API_KEY; // Store your Clarifai API key in env
  const API_URL = 'https://api.clarifai.com/v2/models/skin-disease-model/outputs';

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

 const handleAnalyze = async () => {
  setError(null);
  setTags([]);

  if (!image) {
    setError('Please upload an image to analyze.');
    return;
  }

  const loadingToast = toast.loading('Analyzing your image...');

  try {
    const imageBase64 = (image as string).split(',')[1];
    if (!imageBase64) {
      toast.error('Invalid image data. Please try again.', { id: loadingToast });
      return;
    }

    await axios.options(API_URL, {
      headers: {
        Authorization: `Key ${API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    const response = await axios.post(
      API_URL,
      {
        inputs: [
          {
            data: {
              image: {
                base64: imageBase64,
              },
            },
          },
        ],
      },
      {
        headers: {
          Authorization: `Key ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.status === 200) {
      const skinTags = response.data.outputs[0].data.concepts;
      setTags(skinTags);
      toast.success('Image analyzed successfully!', { id: loadingToast });
    } else {
      toast.error('Failed to analyze the image.', { id: loadingToast });
    }
  } catch (error: any) {
    console.error('Error:', error);
    toast.error('Error analyzing photo: ' + error.message, { id: loadingToast });
  }
};


  return (
    <div>
      <Toaster />
      <h1>Skin Analyser</h1>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleAnalyze}>Analyze</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {tags.length > 0 && (
        <div>
          <h2>Analysis Results</h2>
          <ul>
            {tags.map((tag: any, index: number) => (
              <li key={index}>
                {tag.name} - Confidence: {(tag.value * 100).toFixed(2)}%
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SkinAnalyser;

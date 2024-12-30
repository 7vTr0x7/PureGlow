import React, { useState } from 'react';
import { FiUpload } from 'react-icons/fi';

type TagType = {
  tag: {
    en: string;
  };
  confidence: string;
}[];

const SkinAnalyser: React.FC = () => {
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const [tags, setTags] = useState<TagType>([]);
  const [error, setError] = useState<string | null>(null);

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

    try {
      const imageBase64 = (image as string).split(',')[1];
      if (!imageBase64) {
        setError('Invalid image data. Please try again.');
        return;
      }

      const API_KEY = import.meta.env.VITE_IMAGGA_API_KEY;
      const API_SECRET = import.meta.env.VITE_IMAGGA_SECRET_KEY;

      const formData = new URLSearchParams();
      formData.append('image_base64', imageBase64);

      const response = await fetch('https://api.imagga.com/v2/tags', {
        method: 'POST',
        headers: {
          Authorization: `Basic ${btoa(`${API_KEY}:${API_SECRET}`)}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
      });

      if (!response.ok) {
        const errorDetails = await response.json();
        console.error('Imagga API Error:', errorDetails);
        throw new Error(errorDetails.status.text || 'Unknown error');
      }

      const data = await response.json();
      if (data.status.type === 'success') {
        const relevantKeywords = 'skin';
        const filteredTags = data.result.tags.filter((tag: TagType[number]) =>
          tag.tag.en.toLowerCase().includes(relevantKeywords)
        );

        setTags(filteredTags);
      } else {
        setError('Failed to analyze the image.');
      }
    } catch (error: any) {
      console.error('Error:', error);
      setError('Error analyzing photo: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f3f4] font-playfair text-black flex flex-col items-center justify-center px-4 py-5">
      <header className="text-center text-black">
        <h1 className="text-5xl font-bold mb-4">Skin Analyser AI</h1>
        <p className="text-lg font-light max-w-2xl mx-auto">
          Harness the power of AI to uncover insights about your skin. Upload an image and explore the analysis.
        </p>
      </header>
      <div className="mt-10 w-full max-w-xl">
        <label className="flex flex-col items-center justify-center space-y-3 py-10 border-2 border-dashed border-black rounded-lg cursor-pointer bg-opacity-20 bg-[#cc8a68] text-black hover:bg-opacity-30 transition duration-300">
          <FiUpload className="text-6xl" />
          <span className="text-xl">Upload Your Image</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
    
        <button
          onClick={handleAnalyze}
          className="mt-6 w-full bg-[#cc8a68] text-white py-3 rounded-lg font-medium "
        >
          Analyze My Skin
        </button>
        {error && (
          <p className="mt-4 text-center text-red-200 font-semibold">
            {error}
          </p>
        )}
      
      </div>
    </div>
  );
};

export default SkinAnalyser;

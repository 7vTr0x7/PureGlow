import React, { useState } from 'react';
import cv from 'opencv.js';
import { FiUpload } from 'react-icons/fi';
import { toast, Toaster } from 'react-hot-toast';
import { updateUserSkinScore } from '../api/updateUserSkinScore';

const SkinAnalyser: React.FC = () => {
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const [skinMetrics, setSkinMetrics] = useState<string | null>(null);
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
    setSkinMetrics(null);

    if (!image) {
      setError('Please upload an image to analyze.');
      return;
    }

    toast.loading('Analyzing your skin...');
    try {
      const img = new Image();
      img.src = image as string;
      img.onload = async () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const src = cv.matFromImageData(imgData);

          // Convert to YCrCb for skin region segmentation
          const ycrcb = new cv.Mat();
          cv.cvtColor(src, ycrcb, cv.COLOR_RGBA2YCrCb);

          // Create skin mask
          const lower = new cv.Mat(ycrcb.rows, ycrcb.cols, cv.CV_8UC4, [0, 133, 77, 0]);
          const upper = new cv.Mat(ycrcb.rows, ycrcb.cols, cv.CV_8UC4, [255, 173, 127, 255]);
          const skinMask = new cv.Mat();
          cv.inRange(ycrcb, lower, upper, skinMask);

          // 1. Acne Scale (Edge Density)
          const edges = new cv.Mat();
          cv.Canny(skinMask, edges, 100, 200);
          const edgeDensity = cv.countNonZero(edges) / (edges.rows * edges.cols);

          // Normalize edge density between reasonable bounds (e.g., 0.02 to 0.2)
          const acneScaleNormalized = Math.min(Math.max((edgeDensity - 0.02) / (0.2 - 0.02), 0), 1);
          const acneScale = Math.min(Math.max(Math.round(acneScaleNormalized * 10), 1), 10);

          // 2. Dark Spot Scale (Improved Calculation)
          const gray = new cv.Mat();
          cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);

          // Apply GaussianBlur to reduce noise
          const blurred = new cv.Mat();
          cv.GaussianBlur(gray, blurred, new cv.Size(5, 5), 0);

          // Calculate dynamic threshold using Otsu's method
          const darkSpotsMask = new cv.Mat();
          cv.threshold(blurred, darkSpotsMask, 0, 255, cv.THRESH_BINARY_INV + cv.THRESH_OTSU);

          // Find contours for distinct dark regions
          const contours = new cv.MatVector();
          const hierarchy = new cv.Mat();
          cv.findContours(darkSpotsMask, contours, hierarchy, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);

          // Calculate dark spot area
          let darkSpotArea = 0;
          for (let i = 0; i < contours.size(); i++) {
            const contourArea = cv.contourArea(contours.get(i));
            darkSpotArea += contourArea;
          }

          // Normalize dark spot density (total dark spot area to image area)
          const darkSpotDensity = darkSpotArea / (gray.rows * gray.cols);

          // Map to 1-10 scale with realistic bounds (e.g., 0.005 to 0.1)
          const darkSpotScaleNormalized = Math.min(Math.max((darkSpotDensity - 0.005) / (0.1 - 0.005), 0), 1);
          const darkSpotScale = Math.min(Math.max(Math.round(darkSpotScaleNormalized * 10), 1), 10);

          // 3. Hydration Level
          const meanScalar = cv.mean(gray);
          const hydrationLevel = Math.min(Math.max(Math.round((meanScalar[0] / 255) * 100), 1), 100);

          

          await updateUserSkinScore(acneScale,darkSpotScale,hydrationLevel)

          // Clean up
          src.delete();
          ycrcb.delete();
          skinMask.delete();
          gray.delete();
          blurred.delete();
          darkSpotsMask.delete();
          edges.delete();
          contours.delete();
          hierarchy.delete();
          lower.delete();
          upper.delete();
        }
      };
    } catch (err) {
      setError('Error analyzing photo: ' + (err as Error).message);
    } finally {
      toast.dismiss();
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
          disabled={!image}
          onClick={handleAnalyze}
          className={`mt-6 w-full ${image ? 'bg-[#cc8a68]' : 'bg-pink-500'} text-white py-3 rounded-lg font-medium `}
        >
          Analyze My Skin
        </button>
        {error && <p className="mt-4 text-center text-red-500 font-semibold">{error}</p>}
        {skinMetrics && <p className="mt-4 text-center text-green-500 font-semibold whitespace-pre-line">{skinMetrics}</p>}
      </div>
      <Toaster />
    </div>
  );
};

export default SkinAnalyser;

import React, { useState } from "react";

import video from "./assets/video/video.mp4";

const App: React.FC = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);

  const handleVideoEnd = () => {
    setIsVideoPlaying(false);
  };

  return (
    <div className="h-screen w-full">
      {isVideoPlaying ? (
        <div className="relative h-screen w-full">
          <video
            className="absolute top-0 left-0 h-full w-full object-cover"
            src={video}
            autoPlay
            muted
            playsInline
            onEnded={handleVideoEnd}
          />
        </div>
      ) : (
        <div>
          <h1 className="text-center text-4xl font-bold mt-10">
            Welcome to My Website
          </h1>
          <p className="text-center mt-4">Here is the rest of the content...</p>
        </div>
      )}
    </div>
  );
};

export default App;

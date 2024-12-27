import React from "react";
import gif from "../../assets/videos/gif.gif";

const RightPanel: React.FC = () => {
  return (
    <div className="pt-3 h-full relative">
      <div className="flex items-center justify-between">
        <p className="text-lg font-medium">Elysian at a Glance</p>
        <p className="text-sm text-gray-500">Glowing into the Future</p>
      </div>

      <div className=" relative overflow-hidden rounded-3xl">
        <div className="mt-20 bg-[#ffd496] md:h-96 h-[450px] rounded-3xl">
          <img
            src={gif}
            alt="Elysian Preview"
            className="absolute top-[-15%] rounded-3xl z-[100] w-[100%] max-w-none "
          />
        </div>
      </div>
    </div>
  );
};

export default RightPanel;

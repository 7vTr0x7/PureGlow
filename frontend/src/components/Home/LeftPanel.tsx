import React from "react";

import logo from "../../assets/images/logo.png";

import gif3 from "../../assets/videos/giphy2.gif";

const LeftPanel: React.FC = () => {
  return (
    <div className=" h-full ">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 ">
          <img alt="logo" src={logo} className="h-12 w-12" />
          <p className="text-lg font-semibold">Elysian</p>
        </div>
        <p>Elysian at a Glance</p>
      </div>
      <div className="text-5xl my-8 font-semibold ">
        <p>Elysian </p>
        <div className="flex justify-between items-end pr-10">
          <p>Serif </p>
          <p className="text-sm">Timeless Elegance</p>
        </div>
      </div>
      <p>Glow Tones</p>

      <div className="bg-[#302a2b] h-64 sm:h-96 rounded-2xl mt-5 sm:mt-7 overflow-hidden">
        <img
          src={gif3}
          alt="gif3"
          className="w-full h-full object-cover rounded-2xl"
        />
      </div>
    </div>
  );
};

export default LeftPanel;

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

      <div className="relative bg-[#302a2b] h-96  rounded-[34px] mt-5 md:h-[500px] pb-32 sm:mt-7">
        <div className="absolute top-3 left-3 flex items-center gap-1">
          <img alt="logo" src={logo} className="h-8 w-8" />
          <p className="text-sm text-white">Elysian</p>
        </div>
        <img
          src={gif3}
          alt="gif3"
          className="w-full h-full object-cover rounded-t-[34px]"
        />
        <div className="px-7 py-5 text-white text-xl font-semibold">
          <p>Book Immediately</p>
          <p>for your</p>
          <div className="flex justify-between items-center">
            <div>
              <span> natural </span>
              <i className="text-yellow-300">beauty</i>
            </div>
            <p>
              <i className="text-yellow-300 text-xs">www.elysian.com</i>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftPanel;

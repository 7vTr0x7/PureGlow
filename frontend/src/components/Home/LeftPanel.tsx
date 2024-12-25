import React from "react";

import logo from "../../assets/images/logo.png";

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
    </div>
  );
};

export default LeftPanel;

import React from "react";
import LeftPanel from "../../components/Home/LeftPanel";
import RightPanel from "../../components/Home/RightPanel";
import CenterPanel from "../../components/Home/CenterPanel";

const Home: React.FC = () => {
  return (
    <div
      className="grid grid-cols-3 h-screen px-12 bg-[#f4f3f4] font-playfair
    py-10
    ">
      <div className="col-span-1">
        <LeftPanel />
      </div>
      <div className="col-span-1">
        <CenterPanel />
      </div>
      <div className="col-span-1">
        <RightPanel />
      </div>
    </div>
  );
};

export default Home;

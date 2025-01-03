import React from "react";
import gif from "../../assets/videos/gif.gif";
import logo from "../../assets/images/logo.png";
import { useNavigate,NavigateFunction } from "react-router-dom";
import toast from "react-hot-toast";

const RightPanel: React.FC = () => {

  const navigate:NavigateFunction = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    toast.success('Logged out successfully!');
    navigate('/auth/login');
  };

  return (
    <div className="pt-3 h-full relative">
      <div className="flex items-center justify-between">
        <p className="text-lg font-medium">Elysian at a Glance</p>
        <p className="text-sm text-gray-500 cursor-pointer" onClick={handleLogout}>Logout</p>
      </div>

     <div className="relative overflow-hidden rounded-3xl">
  <div className="mt-32 bg-[#ffd496] h-[300px] sm:h-[400px] md:h-[450px] lg:h-96 rounded-3xl">
    <img
      src={gif}
      alt="Elysian Preview"
      className="absolute top-[0%] rounded-3xl z-[100] w-full h-full object-cover"
    />
  </div>
</div>


      <div className=" mt-20 flex items-center gap-3">
        <img alt="logo" src={logo} className="h-24 w-24" />
        <p className="text-7xl font-semibold text-black">Elysian</p>
      </div>
    </div>
  );
};

export default RightPanel;

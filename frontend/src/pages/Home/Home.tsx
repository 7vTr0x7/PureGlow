import React, { useEffect } from "react";
import LeftPanel from "../../components/Home/LeftPanel";
import RightPanel from "../../components/Home/RightPanel";
import CenterPanel from "../../components/Home/CenterPanel";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SkinAnalyzer from "../../components/SkinAnalyser";

gsap.registerPlugin(ScrollTrigger);

const Home: React.FC = () => {
  useEffect(() => {
    const lenis = new Lenis({
      smooth: true,
      lerp: 0.1,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    gsap.fromTo(
      ".panel",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".panel",
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
    <div className="flex flex-col lg:grid lg:grid-cols-3 h-auto bg-[#f4f3f4] font-playfair">
      <div className="panel col-span-1 p-4 lg:p-12">
        <LeftPanel />
      </div>
      <div className="panel col-span-1 p-4 lg:p-12">
        <CenterPanel />
      </div>
      <div className="panel col-span-1 p-4 lg:p-12">
        <RightPanel />
      </div>
    </div>

    <SkinAnalyzer />
    </>
  );
};

export default Home;

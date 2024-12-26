import React, { useEffect, useRef } from "react";
import { FaStar } from "react-icons/fa";
import { gsap } from "gsap";
import logo from "../../assets/images/logo.png";
import product from "../../assets/images/product.png";

const CenterPanel: React.FC = () => {
  const descriptionRef = useRef<HTMLDivElement | null>(null);
  const numberRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const paragraph =
      "Welcome to Elysian, a place where we bring the best experiences in lifestyle, fashion, and wellness. Explore our curated collection of products that cater to your every need and desire. Let us help you find the perfect balance of luxury and comfort.";
    const words = paragraph.split(" ");

    const timeline = gsap.timeline({ repeat: -1, delay: 1 });

    descriptionRef.current!.innerHTML = "";

    const wordElements = words.map((word, index) => {
      const span = document.createElement("span");
      span.innerText = word + " ";
      span.style.opacity = "0";
      descriptionRef.current?.appendChild(span);
      return span;
    });

    timeline.to(wordElements, {
      opacity: 1,
      duration: 1,
      stagger: 0.1,
      ease: "power1.inOut",
    });

    timeline.to(descriptionRef.current, {
      opacity: 0,
      duration: 1,
      delay: words.length * 0.5 + 1,
    });

    const numberTimeline = gsap.timeline({ repeat: -1, repeatDelay: 1 });

    numberTimeline.fromTo(
      numberRefs.current,
      {
        y: -20,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.5,
        ease: "power1.inOut",
      }
    );

    numberTimeline.to(numberRefs.current, {
      y: 20,
      opacity: 0,
      duration: 1,
      stagger: 0.5,
      ease: "power1.inOut",
    });

    return () => {
      timeline.kill();
      numberTimeline.kill();
    };
  }, []);

  return (
    <div className="relative bottom-3 px-6 h-full">
      <div className="bg-[#302a2b] rounded-2xl p-2">
        <div className="relative bg-gradient-to-br from-pink-300 via-white to-pink-300 w-full h-72 rounded-2xl py-10">
          <div className="absolute top-3 left-3 flex items-center gap-1">
            <img alt="logo" src={logo} className="h-8 w-8" />
            <p className="text-sm">Elysian</p>
          </div>
          <div className="flex justify-center rotate-12">
            <img
              className="h-80 top-[-6rem] left-[30%] object-contain absolute"
              alt="product"
              src={product}
            />
          </div>
          <div className="absolute bottom-24 left-3 flex items-center gap-2">
            <div className="flex items-center">
              <FaStar className="text-black" />
              <p className="ml-1">4.5</p>
            </div>
            <p>10k Reviews</p>
          </div>
          <div
            className="absolute bottom-5 left-3 text-black text-xs "
            ref={descriptionRef}></div>
        </div>
        <div className="px-5 py-6 flex justify-between text-white">
          <div>
            <p
              className="text-2xl font-bold"
              ref={(el) => (numberRefs.current[0] = el)}>
              300<span className="text-xs">+</span>
            </p>
            <p className="text-xs">products</p>
          </div>
          <div>
            <p
              className="text-2xl font-bold"
              ref={(el) => (numberRefs.current[1] = el)}>
              50<span className="text-xs">+</span>
            </p>
            <p className="text-xs font-light">customers</p>
          </div>
          <button className="px-5 rounded-lg bg-[#cc8a68]">Shop Now</button>
        </div>
      </div>
    </div>
  );
};

export default CenterPanel;

/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import content from "../assets/content6.jpg";
import style from "../assets/style4.jpg";
import blend1 from "../assets/blend1.png";
import content1 from "../assets/content1.png";

const PhotoComparison = () => {
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleDrag = (e) => {
    const container = e.currentTarget.getBoundingClientRect();
    const newPosition = ((e.clientX - container.left) / container.width) * 100;

    if (newPosition >= 0 && newPosition <= 100) {
      setSliderPosition(newPosition);
    }
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto h-96 mt-10">
      {/* Base Image */}
      <img
        src={content1}
        alt="Base"
        className="absolute object-cover"
      />

      {/* Overlay Image */}
      <div
        className="absolute h-full overflow-hidden"
        style={{
          width: `${sliderPosition}%`,
        }}
      >
        <img
          src={blend1}
          alt="Overlay"
          className="object-cover"
        />
      </div>

      {/* Slider */}
      <div
        className="absolute top-0 left-0 w-full h-full cursor-ew-resize"
        onMouseMove={handleDrag}
        onTouchMove={(e) => handleDrag(e.touches[0])}
      ></div>

      {/* Slider Handle */}
      <div
        className="absolute top-0"
        style={{
          left: `${sliderPosition}%`,
          transform: "translateX(-50%)",
        }}
      >
        <div className="w-10 h-full bg-gray-500 bg-opacity-50 flex items-center justify-center">
          <div className="w-6 h-6 bg-white rounded-full shadow-md"></div>
        </div>
      </div>
    </div>
  );
};

export default PhotoComparison;

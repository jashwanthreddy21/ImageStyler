import React from "react";

const AboutUs = () => {
  return (
    <section id="about-us" className="bg-gray-900 py-20 px-6 md:px-12 w-full flex justify-center">
      <div className="max-w-4xl text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500 mb-8">
          About Neuro Artify
        </h2>
        <div className="bg-gray-800/50 backdrop-blur-md p-8 md:p-12 rounded-2xl shadow-2xl border border-gray-700/50">
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-light">
            <span className="text-3xl font-bold text-purple-400">"W</span>elcome to Neuro Artify, your ultimate AI-powered image enhancement suite. 
            We specialize in providing state-of-the-art machine learning solutions that elevate your visual content. 
            From seamless Neural Style Transfer and intelligent Background Removal to crisp Image Upscaling and dynamic Text Removal, 
            our tools are designed to empower creators, developers, and businesses. With a passion for cutting-edge AI and a commitment 
            to flawless user experience, Neuro Artify is redefining the boundaries of digital art and automated image processing.
            <span className="text-3xl font-bold text-blue-400">"</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;

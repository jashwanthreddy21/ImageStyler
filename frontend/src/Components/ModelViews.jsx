import React from "react";
import { Link } from "react-router-dom";
import { FaMagic, FaImage, FaExpand, FaEraser } from "react-icons/fa";

const ModelViews = () => {
  const cards = [
    {
      title: "Neural Style Transfer",
      description: "Redefine your artistic boundaries. Our neural engine infuses your photos with the texture, color palette, and emotional resonance of legendary paintings or custom styles.",
      route: "/models/styleTransfer",
      icon: <FaMagic className="text-purple-400" />,
      color: "from-purple-500/20 to-purple-600/5"
    },
    {
      title: "Background Remover",
      description: "Studio-quality subject isolation. Leverage edge-detection intelligence to flawlessly extract subjects from complex backgrounds—perfect for professional product shots and marketing assets.",
      route: "/models/backgroundRemover",
      icon: <FaImage className="text-blue-400" />,
      color: "from-blue-500/20 to-blue-600/5"
    },
    {
      title: "Image Upscaling",
      description: "Restore detail where it's lost. Use state-of-the-art super-resolution algorithms to upscale low-fidelity images into crisp, professional-grade visuals without compromising on quality.",
      route: "/models/imageQuality",
      icon: <FaExpand className="text-green-400" />,
      color: "from-green-500/20 to-green-600/5"
    },
    {
      title: "Object & Text Removal",
      description: "Clean, non-destructive editing. Our deep inpainting model intelligently fills gaps to remove unwanted text or distractors with natural-looking reconstruction.",
      route: "/models/removeText",
      icon: <FaEraser className="text-red-400" />,
      color: "from-red-500/20 to-red-600/5"
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white py-20 px-6 flex flex-col items-center">
      <div className="max-w-5xl w-full text-center mb-16 space-y-4">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          Explore Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">AI Models</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Select a specialized engine below to transform your digital assets with professional-grade intelligence.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`group relative bg-gray-800/40 backdrop-blur-md rounded-3xl p-8 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-500 overflow-hidden shadow-2xl`}
          >
            {/* Background Glow */}
            <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="text-4xl mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition duration-500 origin-left">
                {card.icon}
              </div>
              <h2 className="text-2xl font-bold mb-3 text-white group-hover:text-purple-300 transition duration-300">
                {card.title}
              </h2>
              <p className="text-gray-400 leading-relaxed mb-8 flex-grow">
                {card.description}
              </p>
              <Link
                to={card.route}
                className="inline-flex items-center justify-center px-6 py-3 bg-white/10 hover:bg-white text-white hover:text-black rounded-xl font-bold transition-all duration-300 transform group-hover:translate-x-2"
              >
                Launch Model
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModelViews;

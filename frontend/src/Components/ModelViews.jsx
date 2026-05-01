/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";

const ModelViews = () => {
  const cards = [
    {
      title: "Style Transfer",
      description: "Transform your image with artistic styles.",
      route: "/models/styleTransfer",
    },
    {
      title: "Background Remover",
      description: "Remove the background from your images easily.",
      route: "/models/backgroundRemover",
    },
    {
      title: "Image Quality",
      description: "Enhance and improve the quality of your images.",
      route: "/models/imageQuality",
    },
    {
      title: "Remove Text",
      description: "Convert your sketches into stunning images.",
      route: "/models/removeText",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold text-red-800 mb-8">Choose a Model</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-4xl px-4">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-slate-400 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col items-start"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4">{card.title}</h2>
            <p className="text-white font-bold mb-6">{card.description}</p>
            <Link
              to={card.route}
              className="mt-auto px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none"
            >
              Explore
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModelViews;

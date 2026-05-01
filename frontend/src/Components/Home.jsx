/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import content from "../assets/content6.jpg";
import PhotoComparison from "../Components/PhotoComparision";
import StyleTransfer from "./StyleTransfer";
import BackgroundRemover from "./BackgroundRemover";
import Navbar from "./Navbar";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import ImageEnhancer from "./ImageEnhancer";
import AboutUs from "./AboutUs";
import ContactUs from "./ContactUs";

const faqs = [
  {
    question: "What is Art Style Transfer?",
    answer:
      "Art Style Transfer is an AI-based technique that applies the style of one image (such as a painting) to another image while preserving its content.",
  },
  {
    question: "How does the Background Image Remover work?",
    answer:
      "The Background Remover uses deep learning models to segment and remove the background from an image, leaving a transparent or custom background.",
  },
  {
    question: "What is Image Upscaling?",
    answer:
      "Image Upscaling enhances the resolution of an image using AI, making it clearer and more detailed without losing quality.",
  },
  {
    question: "Can AI remove text from an image?",
    answer:
      "Yes, AI can intelligently detect and remove text from images while filling in the background naturally using advanced inpainting techniques.",
  },
];

const Home = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <div className="flex justify-around items-center w-auto h-20 bg-gradient-to-r from-black from-10% via-black-200 via-30% to-black-100 text-slate-800 min-h-screen flex-row">
        <div className="text-center text-white max-w-2xl px-4">
          <div className="text-3xl font-bold mb-8">NeuroPalette</div>
          <h1 className="text-5xl font-bold mb-6">
            AI-powered Image Enhancement Tools:
            <br />
            <span className="text-red-400 tracking-widest p-8">
              <Typewriter
                words={[
                  "Style Transfer",
                  "Background Remover",
                  "Enhance your Image Quality",
                  "Text Removal",
                ]}
                loop={true}
                cursor
                cursorStyle="|"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </span>
          </h1>
          <p className="text-lg text-gray-300 mb-8">
            Access high-quality AI tools and APIs with clear documentation and
            budget-friendly pricing. Perfect for personal and commercial use.
          </p>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gradient-to-r from-black from-10% via-black-200 via-30% to-black-100 text-white py-16 px-6 md:px-12">
        <h2 className="text-4xl font-bold text-center mb-10">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="mb-4 border border-red-300 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center bg-gray-800 p-4 text-lg text-red-500 font-semibold focus:outline-none"
              >
                {faq.question}
                {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              {openIndex === index && (
                <div className="p-4 bg-gray-700 text-red-300">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div>
      <AboutUs/>
      </div>
      <div>

      <ContactUs/>
      </div>
    </>
  );
};

export default Home;

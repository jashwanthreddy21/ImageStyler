import React, { useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import content from "../assets/content6.jpg";
import PhotoComparison from "../Components/PhotoComparision";
import { FaChevronDown, FaChevronUp, FaMagic, FaImage, FaExpand, FaEraser } from "react-icons/fa";
import AboutUs from "./AboutUs";
import ContactUs from "./ContactUs";
import { Link } from "react-router-dom";

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
  {
    question: "Is my data secure with NeuroPalette?",
    answer:
      "Yes, your privacy is our priority. We process images temporarily for enhancement and do not store your personal photos on our servers after the session ends.",
  },
  {
    question: "Can I use NeuroPalette for commercial projects?",
    answer:
      "Absolutely! The images processed through NeuroPalette can be used for both personal and commercial purposes, including marketing, social media, and digital art.",
  },
  {
    question: "What image formats are supported?",
    answer:
      "NeuroPalette currently supports most common image formats, including JPG, PNG, and WEBP. For best results, we recommend high-quality input files.",
  },
  {
    question: "How long does the AI processing take?",
    answer:
      "Most enhancements are completed within 5-10 seconds, depending on the complexity of the task and the resolution of the uploaded image.",
  },
];

const Home = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20 z-0"></div>
        <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 text-left space-y-6">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
              Master Your Visuals with <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
                NeuroPalette
              </span>
            </h1>
            <h2 className="text-2xl md:text-3xl font-medium text-gray-400">
              AI-powered tools for: <br />
              <span className="text-blue-400 font-mono">
                <Typewriter
                  words={[
                    "Neural Style Transfer",
                    "Background Removal",
                    "Image Enhancement",
                    "Object & Text Removal",
                  ]}
                  loop={true}
                  cursor
                  cursorStyle="|"
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={1000}
                />
              </span>
            </h2>
            <p className="text-lg text-gray-400 max-w-lg leading-relaxed">
              Transform your images with professional-grade AI algorithms. Seamlessly enhance, stylize, and edit your photos with our suite of intelligent tools.
            </p>
            <div className="flex space-x-4 pt-4">
              <Link to="/models" className="px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full font-bold text-lg hover:scale-105 transition transform duration-300 shadow-xl shadow-purple-500/20">
                Explore Models
              </Link>
              <a href="#about-us" className="px-8 py-4 border border-gray-700 rounded-full font-bold text-lg hover:bg-gray-800 transition duration-300">
                Learn More
              </a>
            </div>
          </div>
          <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <img src={content} alt="AI Transformation" className="relative rounded-2xl shadow-2xl w-full max-w-md transform hover:rotate-2 transition duration-500" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section className="py-24 bg-gray-800/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold">Powerful AI Capabilities</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Our specialized models handle complex image processing tasks with pinpoint accuracy.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: <FaMagic className="text-purple-400" />, title: "Neural Style Transfer", desc: "Transform your photos into masterpieces by blending content with iconic artistic styles using deep neural networks." },
              { icon: <FaImage className="text-blue-400" />, title: "Background Removal", desc: "Identify and extract subjects with pixel-perfect precision. Ideal for product photography and profile portraits." },
              { icon: <FaExpand className="text-green-400" />, title: "Image Upscaling", desc: "Harness AI to breathe life into low-resolution images. Increase clarity and detail without introducing noise." },
              { icon: <FaEraser className="text-red-400" />, title: "Text Removal", desc: "Sophisticated inpainting algorithms to intelligently remove unwanted text while naturally reconstructing the scene." }
            ].map((feature, i) => (
              <div key={i} className="p-8 bg-gray-900/50 border border-gray-800 rounded-2xl hover:border-gray-700 transition duration-300 group">
                <div className="text-3xl mb-4 group-hover:scale-110 transition duration-300">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <AboutUs />

      {/* FAQ Section */}
      <section className="py-24 bg-gray-900">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-12">General Inquiries</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-800 rounded-2xl overflow-hidden bg-gray-800/20 transition-all duration-300">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center p-6 text-left hover:bg-gray-800/50 transition duration-300"
                >
                  <span className="text-lg font-semibold">{faq.question}</span>
                  {openIndex === index ? <FaChevronUp className="text-purple-500" /> : <FaChevronDown className="text-gray-600" />}
                </button>
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-40 p-6 pt-0' : 'max-h-0'}`}>
                  <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <ContactUs />

      {/* Footer */}
      <footer className="py-12 border-t border-gray-800 text-center text-gray-500">
        <div className="container mx-auto px-6">
          <p className="text-sm">© 2024 NeuroPalette AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;

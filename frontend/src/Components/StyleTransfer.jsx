/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";

const StyleTransferApp = () => {
  const [contentImage, setContentImage] = useState(null);
  const [styleImage, setStyleImage] = useState(null);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!contentImage || !styleImage) {
      alert("Please upload both images.");
      return;
    }

    try {
      // Convert images to URLs using FileReader
      const contentImageUrl = await fileToDataUrl(contentImage);
      const styleImageUrl = await fileToDataUrl(styleImage);

      // Send token and URLs to the backend
      const tokenResponse = await axios.get("https://imagestyler.onrender.com/generate-token");
      const token = tokenResponse.data.token;
      console.log("JWT Token:", token);

    if (!token) {
      throw new Error("Failed to generate JWT token.");
    }
      const response = await axios.post("https://imagestyler.onrender.com/style-transfer", {
        token,
        contentImageUrl,
        styleImageUrl,
      });

      // Handle API response
      setResult(response.data.result);
    } catch (error) {
      console.error("Error during style transfer:", error.response?.data || error.message);
      alert("Failed to process style transfer.");
    }
  };

  // Helper function: Convert file to Data URL
  const fileToDataUrl = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">Style Transfer</h1>
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Content Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setContentImage(e.target.files[0])}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Style Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setStyleImage(e.target.files[0])}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>

      {result && (
        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-4">Style Transfer Result:</h2>
          <img src={result} alt="Styled Result" className="rounded-lg shadow-md" />
        </div>
      )}
    </div>
  );
};

export default StyleTransferApp;

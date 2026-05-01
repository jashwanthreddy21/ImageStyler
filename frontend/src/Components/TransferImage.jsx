/* eslint-disable no-unused-vars */

import React, { useState } from "react";
import axios from "axios";

const TransferImage = () => {
  const [contentImage, setContentImage] = useState(null);
  const [styleImage, setStyleImage] = useState(null);
  const [stylizedImage, setStylizedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!contentImage || !styleImage) {
      alert("Please upload both content and style images.");
      return;
    }

    const formData = new FormData();
    formData.append("content_image", contentImage);
    formData.append("style_image", styleImage);

    try {
      setLoading(true);
      const response = await axios.post(
        "http://127.0.0.1:5000/style-transfer",
        formData,
        {
          responseType: "blob",
        }
      );
      const imageUrl = URL.createObjectURL(response.data);
      setStylizedImage(imageUrl);
    } catch (err) {
      console.error("Error during style transfer:", err);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white flex flex-col items-center p-6">
      <h1 className="text-4xl font-extrabold mb-8 text-cmin-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white flex flex-col items-center p-6enter">
        Neural Style Transfer
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-7xl">
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-4">Content Image</h2>
          <div className="flex items-center justify-center bg-gray-700 rounded-lg border-2 border-gray-600">
            {contentImage ? (
              <img
                src={URL.createObjectURL(contentImage)}
                alt="Content"
                className="w-full h-auto rounded-lg"
              />
            ) : (
              <div className="text-sm text-gray-300 p-4">Upload an image</div>
            )}
          </div>
          {/* <input
            type="file"
            accept="image/*"
            onChange={(e) => setContentImage(e.target.files[0])}
            className="mt-4 text-sm text-gray-300"
          /> */}
          <div className="mt-4">
  <label className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-purple-500 rounded-lg shadow-md cursor-pointer hover:bg-purple-600">
    Upload Content Image
    <input
      type="file"
      accept="image/*"
      onChange={(e) => setContentImage(e.target.files[0])}
      className="hidden"
    />
  </label>
</div>
          
          
        </div>

        <div className="flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-4">Style Image</h2>
          <div className="flex items-center justify-center bg-gray-700 rounded-lg border-2 border-gray-600">
            {styleImage ? (
              <img
                src={URL.createObjectURL(styleImage)}
                alt="Style"
                className="w-full h-auto rounded-lg"
              />
            ) : (
              <div className="text-sm text-gray-300 p-4">Upload an image</div>
            )}
          </div>
          {/* <input
            type="file"
            accept="image/*"
            onChange={(e) => setStyleImage(e.target.files[0])}
            className="mt-4 text-sm text-gray-300 p-3"
          /> */}
          <div className="mt-4">
  <label className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg shadow-md cursor-pointer hover:bg-red-600">
    Upload Image
    <input
      type="file"
      accept="image/*"
      onChange={(e) => setStyleImage(e.target.files[0])}
      className="hidden"
    />
  </label>
</div>
        </div>

        <div className="flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-4">Stylized Image</h2>
          <div className="flex items-center justify-center bg-gray-700 rounded-lg border-2 border-gray-600">
            {stylizedImage ? (
              <img
                src={stylizedImage}
                alt="Stylized"
                className="w-full h-auto rounded-lg"
              />
            ) : (
              <div className="text-sm text-gray-300 p-4">
                Result will appear here
              </div>
            )}
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={handleUpload}
        className="mt-8 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg transition disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Styling..." : "Start Styling"}
      </button>

      {stylizedImage && (
        <a
          href={stylizedImage}
          download="stylized_image.png"
          className="mt-4 text-blue-400 underline"
        >
          Download Stylized Image
        </a>
      )}
    </div>
  );
};

export default TransferImage;

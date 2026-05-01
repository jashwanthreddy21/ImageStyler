import { useState } from "react";

export default function ImageEnhancer() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [enhancedImage, setEnhancedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });
      const blob = await response.blob();
      setEnhancedImage(URL.createObjectURL(blob));
    } catch (error) {
      console.error("Error uploading image:", error);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Image Enhancer</h1>
      <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center w-full max-w-md">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mb-4 p-2 border rounded w-full"
        />
        {previewImage && (
          <img
            src={previewImage}
            alt="Selected"
            className="w-full h-60 object-cover rounded mb-4"
          />
        )}
        <button
          onClick={handleUpload}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
          disabled={!selectedFile || loading}
        >
          {loading ? "Enhancing..." : "Enhance Image"}
        </button>
        {enhancedImage && (
          <div className="mt-4">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Enhanced Image:</h2>
            <img
              src={enhancedImage}
              alt="Enhanced"
              className="w-full h-60 object-cover rounded"
            />
          </div>
        )}
      </div>
    </div>
  );
}

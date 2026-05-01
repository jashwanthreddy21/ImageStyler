/* eslint-disable react/prop-types */
import { useState } from "react";


import { Upload,Download} from "lucide-react";

export const Card = ({ children, className }) => (
  <div className={`bg-gray-300 p-4 border shadow-md rounded-xl ${className}`}>{children}</div>
);

export const CardContent = ({ children }) => (
  <div className="p-2 text-black font-bold">{children}</div>
);

const RemoveText = () => {
  const [image, setImage] = useState(null);
  const [outputImage, setOutputImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      uploadImage(file);
    }
  };

  const uploadImage = async (photo) => {
    setLoading(true);
    const form = new FormData();
    form.append("image_file", photo);

    try {
      const response = await fetch("https://clipdrop-api.co/remove-text/v1", {
        method: "POST",
        headers: {
          "x-api-key": "2e9521c7b33fc793eec5d06575304189b9634f76c01a0441163ef1d7010731080e4197770d148400536424b2ecbc90d7",
        },
        body: form,
      });

      if (!response.ok) {
        throw new Error("Failed to process image");
      }

      const buffer = await response.arrayBuffer();
      const blob = new Blob([buffer], { type: "image/png" });
      const imageUrl = URL.createObjectURL(blob);
      setOutputImage(imageUrl);
    } catch (error) {
      console.error("Error removing background:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white flex flex-col items-center p-6">

    <div className="flex flex-col items-center justify-center p-4 space-y-4">
        <h1 className="font-bold text-2xl">Text Remover</h1>
      <Card className="w-full max-w-md p-4 border shadow-md rounded-xl text-center">
        <CardContent>
          <label className="cursor-pointer flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 text-gray-500 hover:border-red-500 hover:text-red-500">
            <Upload className="w-12 h-12 mb-2" />
            <span className="text-sm">Upload an Image</span>
            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
          </label>
        </CardContent>
      </Card>

      {image && (
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
          <Card className="p-4 border shadow-md rounded-xl">
            <CardContent>
              <p className="text-center text-sm mb-2">Original Image</p>
              <img src={image} alt="Original" className="max-w-xs rounded-lg shadow-md" />
            </CardContent>
          </Card>

          <Card className="p-4 border shadow-md rounded-xl">
            <CardContent>
              <p className="text-center text-sm mb-2">Processed Image</p>
              {loading ? (
                <p className="text-red-500">Processing...</p>
              ) : (
                outputImage && (
                  <>
                    <img src={outputImage} alt="Processed" className="max-w-xs rounded-lg shadow-md" />
                    <a href={outputImage} download="processed-image.png">
                      <button className="mt-4 flex items-center bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">
                        <Download className="w-4 h-4 mr-2" /> Download
                      </button>
                    </a>
                  </>
                )
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
    </div>
  );
};

export default RemoveText;

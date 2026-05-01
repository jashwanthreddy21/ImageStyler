// import { useState } from "react";
// import { Upload, ArrowUp, Download } from "lucide-react";

// export default function ImageQuality() {
//   const [photo, setPhoto] = useState(null);
//   const [photoPreview, setPhotoPreview] = useState(null);
//   const [upscaledImage, setUpscaledImage] = useState(null);
//   const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
//   const [loading, setLoading] = useState(false);

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setPhoto(file);
//       const imgURL = URL.createObjectURL(file);
//       setPhotoPreview(imgURL);

//       const img = new Image();
//       img.src = imgURL;
//       img.onload = () => {
//         setImageDimensions({ width: img.width, height: img.height });
//       };
//     }
//   };

//   const upscaleImage = async () => {
//     if (!photo) return alert("Please upload an image first.");
//     setLoading(true);

//     const form = new FormData();
//     form.append("image_file", photo);
//     form.append("target_width", imageDimensions.width);
//     form.append("target_height", imageDimensions.height);

//     try {
//       const response = await fetch("https://clipdrop-api.co/image-upscaling/v1/upscale", {
//         method: "POST",
//         headers: { "x-api-key": "2e9521c7b33fc793eec5d06575304189b9634f76c01a0441163ef1d7010731080e4197770d148400536424b2ecbc90d7" },
//         body: form,
//       });

//       const buffer = await response.arrayBuffer();
//       const blob = new Blob([buffer], { type: "image/png" });
//       const imageUrl = URL.createObjectURL(blob);
//       setUpscaledImage(imageUrl);
//     } catch (error) {
//       console.error("Error upscaling image:", error);
//       alert("Failed to upscale the image.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center bg-gray-900 text-white p-6">
//       <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-8xl text-center">
//         <h1 className="text-2xl font-bold mb-6">AI Image Upscaler</h1>
        
//         <label className="flex flex-col items-center justify-center w-full py-6 border-2 border-dashed border-gray-500 rounded-xl cursor-pointer hover:border-blue-400 transition">
//           <Upload className="w-10 h-10 text-gray-300 mb-2" />
//           <span className="text-gray-400">Click to Upload</span>
//           <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
//         </label>

//         {photo && (
//           <p className="mt-2 text-sm text-gray-400">
//             Selected: {photo.name} ({imageDimensions.width} x {imageDimensions.height})
//           </p>
//         )}

//         <button
//           onClick={upscaleImage}
//           className="mt-6 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-2.5 rounded-lg font-medium shadow-md disabled:opacity-50"
//           disabled={loading || !photo}
//         >
//           {loading ? "Upscaling..." : <>Upscale Image <ArrowUp className="w-5 h-5" /></>}
//         </button>

//         {(photoPreview || upscaledImage) && (
//           <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
//             {photoPreview && (
//               <div className="text-center">
//                 <p className="text-sm text-gray-400 mb-2">Original Image</p>
//                 <img
//                   src={photoPreview}
//                   alt="Original"
//                   className="rounded-lg shadow-lg w-full"
//                   style={{ width: `${imageDimensions.width}px`, height: `${imageDimensions.height}px` }}
//                 />
//               </div>
//             )}

//             {upscaledImage && (
//               <div className="text-center">
//                 <p className="text-sm text-gray-400 mb-2">Upscaled Image</p>
//                 <img
//                   src={upscaledImage}
//                   alt="Upscaled"
//                   className="rounded-lg shadow-lg w-full"
//                   style={{ width: `${imageDimensions.width}px`, height: `${imageDimensions.height}px` }}
//                 />
//                 <a
//                   href={upscaledImage}
//                   download="upscaled_image.png"
//                   className="mt-4 inline-flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white px-5 py-2.5 rounded-lg font-medium shadow-md"
//                 >
//                   <Download className="w-5 h-5" /> Download
//                 </a>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


// import { useState } from "react";
// import { Upload, ArrowUp, Download } from "lucide-react";

// export const Card = ({ children, className }) => (
//   <div className={`bg-gray-300 p-4 border shadow-md rounded-xl ${className}`}>{children}</div>
// );

// export const CardContent = ({ children }) => (
//   <div className="p-2 text-black font-bold">{children}</div>
// );

// export default function ImageQuality() {
//   const [photo, setPhoto] = useState(null);
//   const [photoPreview, setPhotoPreview] = useState(null);
//   const [upscaledImage, setUpscaledImage] = useState(null);
//   const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
//   const [loading, setLoading] = useState(false);

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setPhoto(file);
//       const imgURL = URL.createObjectURL(file);
//       setPhotoPreview(imgURL);

//       const img = new Image();
//       img.src = imgURL;
//       img.onload = () => {
//         setImageDimensions({ width: img.width, height: img.height });
//       };
//     }
//   };

//   const upscaleImage = async () => {
//     if (!photo) return alert("Please upload an image first.");
//     setLoading(true);

//     const form = new FormData();
//     form.append("image_file", photo);
//     form.append("target_width", imageDimensions.width);
//     form.append("target_height", imageDimensions.height);

//     try {
//         //API = https://clipdrop-api.co/image-upscaling/v1/upscale
//       const response = await fetch("https://clipdrop-api.co/image-upscaling/v1/upscale", {
//         method: "POST",
//         headers: { "x-api-key": "2e9521c7b33fc793eec5d06575304189b9634f76c01a0441163ef1d7010731080e4197770d148400536424b2ecbc90d7" },
//         body: form,
//       });

//       if (!response.ok) {
//         throw new Error("Failed to upscale image");
//       }

//       const buffer = await response.arrayBuffer();
//       const blob = new Blob([buffer], { type: "image/png" });
//       const imageUrl = URL.createObjectURL(blob);
//       setUpscaledImage(imageUrl);
//     } catch (error) {
//       console.error("Error upscaling image:", error);
//       alert("Failed to upscale the image.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white flex flex-col items-center p-6">
//       <div className="flex flex-col items-center justify-center p-4 space-y-4">
//         <h1 className="font-bold text-2xl">AI Image Upscaler</h1>
//         <Card className="w-full max-w-md p-4 border shadow-md rounded-xl text-center">
//           <CardContent>
//             <label className="cursor-pointer flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 text-gray-500 hover:border-blue-500 hover:text-blue-500">
//               <Upload className="w-12 h-12 mb-2" />
//               <span className="text-sm">Upload an Image</span>
//               <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
//             </label>
//           </CardContent>
//         </Card>
//         <button className="bg-red" onClick={upscaleImage}>UpScale</button>
//         {photoPreview && (
//           <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
//             <Card className="p-4 border shadow-md rounded-xl">
//               <CardContent>
//                 <p className="text-center text-sm mb-2">Original Image</p>
//                 <img src={photoPreview} alt="Original" className="max-w-xs rounded-lg shadow-md" />
//               </CardContent>
//             </Card>

//             <Card className="p-4 border shadow-md rounded-xl">
//               <CardContent>
//                 <p className="text-center text-sm mb-2">Upscaled Image</p>
//                 {loading ? (
//                   <p className="text-blue-500">Processing...</p>
//                 ) : (
//                   upscaledImage && (
//                     <>
//                       <img src={upscaledImage} alt="Upscaled" className="max-w-xs rounded-lg shadow-md" />
//                       <a href={upscaledImage} download="upscaled-image.png">
//                         <button className="mt-4 flex items-center bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">
//                           <Download className="w-4 h-4 mr-2" /> Download
//                         </button>
//                       </a>
//                     </>
//                   )
//                 )}
//               </CardContent>
//             </Card>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// import { useState } from "react";
// import { Loader } from "lucide-react";

// const ImageEnhancer = () => {
//   const [file, setFile] = useState(null);
//   const [enhancedImage, setEnhancedImage] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const API_KEY = "06aa21e0-f67e-11ef-96a9-d365eb026b36";

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     if (selectedFile) {
//       setFile(selectedFile);
//     }
//   };

//   const uploadImage = async () => {
//     if (!file) return null;
//     const formData = new FormData();
//     formData.append("image", file);
//     try {
//       const uploadResponse = await fetch("https://api.imgbb.com/1/upload?key=YOUR_IMGBB_API_KEY", {
//         method: "POST",
//         body: formData,
//       });
//       const uploadData = await uploadResponse.json();
//       return uploadData.data.url;
//     } catch (error) {
//       console.error("Error uploading image:", error);
//       return null;
//     }
//   };

//   const handleEnhance = async () => {
//     setLoading(true);
//     const imageUrl = await uploadImage();
//     if (!imageUrl) {
//       setLoading(false);
//       return;
//     }
//     try {
//       const response = await fetch("https://deep-image.ai/rest_api/process_result", {
//         method: "POST",
//         headers: {
//           "x-api-key": "06aa21e0-f67e-11ef-96a9-d365eb026b36",
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           enhancements: ["denoise", "deblur", "light"],
//           url: imageUrl,
//           width: 2000,
//         }),
//       });
//       const data = await response.json();
//       setEnhancedImage(data.result?.url || null);
//     } catch (error) {
//       console.error("Error enhancing image:", error);
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
//       <div className="w-full max-w-md p-4 bg-white shadow-lg rounded-2xl">
//         <div className="flex flex-col space-y-4">
//           <h2 className="text-xl font-bold text-center">Image Enhancer</h2>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleFileChange}
//             className="p-2 border rounded-lg w-full"
//           />
//           <button
//             onClick={handleEnhance}
//             className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
//             disabled={loading || !file}
//           >
//             {loading ? <Loader className="animate-spin" /> : "Enhance Image"}
//           </button>
//           {enhancedImage && (
//             <div className="mt-4">
//               <h3 className="text-lg font-semibold">Enhanced Image:</h3>
//               <img
//                 src={enhancedImage}
//                 alt="Enhanced"
//                 className="mt-2 w-full h-auto rounded-lg shadow"
//               />
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ImageEnhancer;

import { useState } from "react";

export default function ImageQuality() {
  const [photo, setPhoto] = useState(null);
  const [upscaledImage, setUpscaledImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const API_KEY = "2e9521c7b33fc793eec5d06575304189b9634f76c01a0441163ef1d7010731080e4197770d148400536424b2ecbc90d7"; // Replace with your actual API key

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPhoto(file);
    }
  };
  const downloadImage = () => {
    if (upscaledImage) {
      const link = document.createElement("a");
      link.href = upscaledImage;
      link.download = "upscaled-image.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const upscaleImage = async () => {
    if (!photo) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("image_file", photo);
    formData.append("target_width", "2048");
    formData.append("target_height", "2048");

    try {
      const response = await fetch(
        "https://clipdrop-api.co/image-upscaling/v1/upscale",
        {
          method: "POST",
          headers: {
            "x-api-key": API_KEY,
          },
          body: formData,
        }
      );
      const buffer = await response.arrayBuffer();
      const blob = new Blob([buffer]);
      const imageUrl = URL.createObjectURL(blob);
      setUpscaledImage(imageUrl);
    } catch (error) {
      console.error("Error upscaling image:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col bg-gradient-to-b from-gray-900 to-gray-800 items-center text-white justify-center min-h-screen p-6">
      <div className="p-6 bg-gradient-to-b from-gray-800 to-gray-700 rounded-lg text-white shadow-lg w-full max-w-md text-center">
        <h2 className="text-2xl font-semibold text-white mb-4">Image Upscaler</h2>
        <input
          type="file"
          accept="image/png, image/jpeg, image/webp"
          onChange={handleFileChange}
          className="mb-4 border p-2 rounded w-full"
        />
        <button
          onClick={upscaleImage}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-400 w-full"
          disabled={!photo || loading}
        >
          {loading ? "Upscaling..." : "Upscale Image"}
        </button>
        {upscaledImage && (
          <div className="mt-4">
            <h3 className="text-lg font-medium text-white-700">Upscaled Image</h3>
            <img
              src={upscaledImage}
              alt="Upscaled Preview"
              className="mt-2 w-full h-auto rounded-lg shadow-md"
            />
            <button
              onClick={downloadImage}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 w-full"
            >
              Download Image
            </button>
          </div>
        )}
      </div>
    </div>
  );
}






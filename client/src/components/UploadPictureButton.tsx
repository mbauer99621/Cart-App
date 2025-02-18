import { useState } from "react";

interface UploadPictureButtonProps {
    setImage: (newImage: string | null) => void;
  }
  
  export default function UploadPictureButton({ setImage }: UploadPictureButtonProps) {
    const [showRefreshMessage, setShowRefreshMessage] = useState(false);

    // Handle image upload and save to LocalStorage
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const imageData = reader.result as string;
          setImage(imageData);
          localStorage.setItem("profilePicture", imageData);
          setShowRefreshMessage(true);
        };
        reader.readAsDataURL(file);
      }
    };
  
    // Remove profile picture from LocalStorage
    const handleRemoveImage = () => {
      setImage(null);
      localStorage.removeItem("profilePicture");
      setShowRefreshMessage(true);
    };
  
    return (
    <div className="flex flex-col items-center space-y-2">

        // Buttons
      <div className="flex space-x-3">
        <label className="bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-600 transition">
          Upload Picture
          <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
        </label>
        <button
          onClick={handleRemoveImage}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Remove
        </button>
      </div>

        {showRefreshMessage && (
            <p className="text-green-300 text-sm font-semibold mt-2">Page refresh required.</p>
        )}
    </div>
    );
  }
  
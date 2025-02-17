interface UploadPictureButtonProps {
    setImage: (newImage: string | null) => void;
  }
  
  export default function UploadPictureButton({ setImage }: UploadPictureButtonProps) {
    // Handle image upload and save to LocalStorage
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const imageData = reader.result as string;
          setImage(imageData);
          localStorage.setItem("profilePicture", imageData);
        };
        reader.readAsDataURL(file);
      }
    };
  
    // Remove profile picture from LocalStorage
    const handleRemoveImage = () => {
      setImage(null);
      localStorage.removeItem("profilePicture");
    };
  
    return (
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
    );
  }
  
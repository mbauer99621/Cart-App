import { useEffect, useState } from "react";

export default function ProfilePicture() {
  const [image, setImage] = useState<string | null>(null);

  // Load saved profile picture from LocalStorage when the component mounts
  useEffect(() => {
    const savedImage = localStorage.getItem("profilePicture");
    if (savedImage) {
      setImage(savedImage);
    }
  }, []);

  return (
    <div className="relative w-32 h-32 rounded-full border border-gray-400 overflow-hidden shadow-lg">
      {image ? (
        <img src={image} alt="Profile" className="w-full h-full object-cover" />
      ) : (
        <div className="flex items-center justify-center w-full h-full text-gray-500">
          ProfilePicture
        </div>
      )}
    </div>
  );
}

import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth"; // Assuming you have an AuthContext
import FoodEmojis from '../components/UI/FoodEmojis';
import ProfilePicture from "../components/DisplayProfilePic";
import UploadPictureButton from "../components/UploadPictureButton";
//import { useCartFridge } from "../context/CartFridgeContext"; // If storing subscriptions in context


export default function MyAccount() {
    const { user } = useAuth(); // Fetch logged-in user info
    const [showPassword, setShowPassword] = useState(false);
    const [allergy, setAllergy] = useState("");
    const [allergies, setAllergies] = useState<string[]>([]);
    const [emailSubscribed, setEmailSubscribed] = useState(false);
    const [premiumMember, setPremiumMember] = useState(false);

    // Username / Email state
    const[isEditingUsername, setIsEditingUserName] = useState(false);
    const [isEditingEmail, setIsEditingEmail] = useState(false);

    //const[username, setUserName] = useState(user?.username || "Guest");
    const[username, setUserName] = useState(user?.username);
    //const [email, setEmail] = useState(user?.email || "example@email.com");
    const [email, setEmail] = useState(user?.email);

    useEffect(() => {
      if (user?.username) {
          setUserName(user.username);
      }
      if (user?.email) {
          setEmail(user.email);
      }
  }, [user]);

    // Toggle password visibility
    const togglePassword = () => setShowPassword(!showPassword);

    // Add an allergy to the list
    const addAllergy = () => {
        if (allergy.trim() && !allergies.includes(allergy.trim())) {
            setAllergies([...allergies, allergy.trim()]);
            setAllergy("");
        }
    };    

    // Remove an allergy
    const removeAllergy = async (index: number) => {
        setAllergies(allergies.filter((_, i) => i !== index));
      };
      

    // Username edit
    const handleUsernameChange = () => {
        if (isEditingUsername) {
            console.log("New username:", username);
            // implement API request to update username
        }
        setIsEditingUserName(!isEditingUsername);
    }

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-gray-100 p-6 relative overflow-hidden">

        <FoodEmojis />

      <div className="w-full max-w-3xl bg-gradient-to-r from-white to-gray-100 shadow-xl border border-gray-300 rounded-lg p-10 relative z-10">

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">My Account</h1>

         {/* Profile Picture Container */}
        <div className="flex flex-col items-center mb-6">
            <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center text-gray-500 text-x3xl overflow-hidden border-4 border-gray-400 shadow-lg">
                <ProfilePicture />
            </div>
        </div>
        <div className="flex flex-col items-center mb-6">
            <UploadPictureButton setImage={() => {}} />
        </div>

        {/* Username */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Username</label>
          <div className="flex items-center space-x-2">
          <input
            className={`w-full px-4 py-2 mt-1 border rounded-lg ${
                isEditingUsername ? "bg-white border-gray-400 text-black" : "bg-gray-200 border-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            type="text"
            value={username}
            disabled={!isEditingUsername}
            onChange={(e) => setUserName(e.target.value)}
          />
          <button
          onClick={handleUsernameChange}
          className={`px-4 py-2 rounded-md transition ${
            isEditingUsername ? "bg=green-500 hover:bg-green-600 text-white" : "bg-black hover:bg-gray-700 text-white"
          }`}
          >
            {isEditingUsername ? "Save" : "Change"}
          </button>
          </div>
        </div>

        {/* Email Field - Same Formatting as Username */}
        <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Email</label>
            <div className="flex items-center space-x-2">
            <input
                className={`w-full px-4 py-2 border rounded-lg ${
                    isEditingEmail ? "bg-white border-gray-400 text-black" : "bg-gray-200 border-gray-300 text-gray-500 cursor-not-allowed"
                }`}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!isEditingEmail}
            />
            <button
                onClick={() => setIsEditingEmail(!isEditingEmail)}
                className={`px-4 py-2 rounded-md transition ${
                    isEditingEmail ? "bg-green-500 hover:bg-green-600 text-white" : "bg-black hover:bg-gray-700 text-white"
                }`}
            >
                {isEditingEmail ? "Save" : "Change"}
            </button>
            </div>
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Password</label>
          <div className="flex items-center space-x-2">
            <input
              className="w-full px-4 py-2 border border-gray-400 text-black rounded-lg"
              type={showPassword ? "text" : "password"}
              value="********"
              disabled
            />
            <button
              onClick={togglePassword}
              className="px4 py-1 bg-black text-white rounded-md hover:bg-gray-700 transition-all"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        {/* Allergy Input */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Allergies</label>
          <div className="flex items-center space-x-2">
            <input
              className="w-full px-4 py-2 border border-gray-400 text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm transition-all"
              type="text"
              placeholder="Add allergy"
              value={allergy}
              onChange={(e) => setAllergy(e.target.value)}
            />
            <button
              className="px4 py-1 bg-black text-white rounded-md hover:bg-gray-700 transition-all"
              onClick={addAllergy}
            >
              Add
            </button>
          </div>
        </div>
          {/* Display list of allergies */}
          <ul className="mt-2">
            {allergies.map((allergy, index) => (
              <li key={index} className="flex justify-between items-center text-black bg-gray-200 px-3 py-1 rounded-lg mt-2">
                {allergy}
                <button
                  className="text-red-500 hover:text-red-700 ml-2"
                  onClick={() => removeAllergy(index)}
                >
                  ✖
                </button>
              </li>
            ))}
          </ul>

        {/* Email Subscription */}
        <div className="mb-4 flex items-center">
          <input
            id="emailSubscription"
            type="checkbox"
            checked={emailSubscribed}
            onChange={() => setEmailSubscribed(!emailSubscribed)}
            className="h-5 w-5 accent-black text-blue-500 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 cursor-pointer"
          />
          <label htmlFor="emailSubscription" className="ml-2 text-gray-700">
            Subscribe to email notifications
          </label>
        </div>

        {/* Premium Subscription */}
        <div className="mb-6 flex items-center">
          <input
            id="premiumMembership"
            type="checkbox"
            checked={premiumMember}
            onChange={() => setPremiumMember(!premiumMember)}
            className="h-5 w-5 accent-black text-blue-500 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 cursor-pointer"
          />
          <label htmlFor="premiumMembership" className="ml-2 text-gray-700">
            Premium membership
          </label>
        </div>

        {/* Save Button (Optional: Implement Backend Update Later) */}
        <button className="w-full bg-black hover:bg-green-800 text-white font-bold py-2 px-4 rounded-lg transition duration-300 shadow-md">
          Save Changes
        </button>
      </div>
    </div>
  );
}
import { useState, type FormEvent, type ChangeEvent } from "react";
import { signup } from "../api/signupAPI";
// import { makeCart } from "../api/cartAPI.js";
// import { makeFridge } from "../api/fridgeAPI.js";
import { useNavigate, Link } from "react-router-dom";
import FoodEmojis from '../components/UI/FoodEmojis';

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await signup(formData);
      if (!response.success) {
        throw new Error(response.message);
      }
      // make cart and fridge for user:
      /*
      await makeCart(userId);
      await makeFridge(userId);
      */
      navigate("/LoginPage"); // Redirect to login page after successful signup
    } catch (err) {
      setError("Signup failed. Please try again.");
      console.error("Signup error:", err);
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-100 relative overflow-hidden">

    <FoodEmojis />

    {/* Signup Form */}
      <div className="w-full max-w-md bg-white shadow-2xl border-2 border-black rounded-lg p-8 relative z-10">
        <h1 className="text-2xl font-bold text-center text-gray-800">Sign Up</h1>

        {error && <p className="text-red-500 text-center mt-2">{error}</p>}

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>

        {/* Username Field */}
          <div>
            <label className="block text-gray-700">Username</label>
            <input
              className="w-full px-4 py-2 mt-2 border border-black text-black rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              type="text"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

        {/* Email Field */}
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              className="w-full px-4 py-2 mt-2 border border-black text-black rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

        {/* Password Field */}
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              className="w-full px-4 py-2 mt-2 border border-black text-black rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

        {/* Sign Up Button */}
          <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg">
            Sign Up
          </button>

        {/* Login Link */}
          <p className="text-center text-gray-600 text-sm mt-4">
            Already have an account?{" "}
            <Link to="/LoginPage" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
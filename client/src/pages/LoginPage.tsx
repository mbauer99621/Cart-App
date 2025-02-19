import { useState, type FormEvent, type ChangeEvent } from 'react';
//import Auth from '../utils/auth';
//import { login } from '../api/authAPI';
//import type { UserLogin } from '../interfaces/UserLogin';
import { login } from "../api/loginAPI";
import FoodEmojis from '../components/UI/FoodEmojis';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: "",
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

    const response = await login(formData);

    if (!response.success || !response.token) {
      console.error("❌ Login failed:", response.message);
      setError(response.message || "Invalid credentials. Please try again.");
      return;
    }

    // ✅ Store the JWT token in sessionStorage
    sessionStorage.setItem("token", response.token);
    sessionStorage.setItem("username", formData.username);
    console.log("✅ Token stored in sessionStorage:", response.token);

    // ✅ Redirect to the main app or dashboard
    navigate("/");
  };

    return (
      <div className="w-screen h-screen flex items-center justify-center bg-gray-100 relative overflow-hidden">

        {/* Background Animated Food Emojis */}
        <FoodEmojis />

        {/* Login Form */}
        <div className="w-full max-w-md bg-white shadow-2x1 border border-black rounded-lg p-8 relative z-10 drop-shadow-x1">
          <h1 className="text-2xl font-bold text-center text-gray-800">Login</h1>
    
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
                value={formData.username || ''}
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
                value={formData.password || ''}
                onChange={handleChange}
                required
              />
            </div>
    
            {/* Login Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
              >
                Login
              </button>
            </div>
    
            {/* Signup Link */}
            <p className="text-center text-gray-600 text-sm mt-4">
              Don't have an account?{' '}
              <Link to="/signup" className="text-blue-500 hover:underline">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    );
};

export default LoginPage;
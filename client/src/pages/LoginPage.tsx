import { useState, type FormEvent, type ChangeEvent } from 'react';
import Auth from '../utils/auth';
import { login } from '../api/authAPI';
import type { UserLogin } from '../interfaces/UserLogin';
import FoodEmojis from '../components/UI/FoodEmojis';

const Login = () => {
  const [loginData, setLoginData] = useState<UserLogin>({
    username: '',
    password: '',
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
        const data = await login(loginData);
        if (!data.token) {
          throw new Error('Invalid credentials, please try again');
        }
        Auth.login(data.token);
      } catch (err) {
        setError('Login failed. Please check your credentials.');
        console.error('Failed to login', err);
      }
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
                value={loginData.username || ''}
                onChange={handleChange}
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
                value={loginData.password || ''}
                onChange={handleChange}
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
              <a href="/signup" className="text-blue-500 hover:underline">
                Sign up
              </a>
            </p>
          </form>
        </div>
      </div>
    );
};

export default Login;
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white text-center py-4 mt-4">
      <p>© {new Date().getFullYear()} MJK. All rights reserved.</p>

      <div className="flex justify-center space-x-4 mt-2">
        <Link to="/">
          Home
        </Link>
        <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500">
          Instagram
        </a>
        <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
          Facebook
        </a>
        <a href="https://x.com/?lang=en" target="_blank" rel="noopener noreferrer" className="hover:text-black">
          Twitter
        </a>
      </div>
    </footer>
  );
}
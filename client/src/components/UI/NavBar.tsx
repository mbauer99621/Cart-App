import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo.png';

interface NavBarProps {
  links: { path: string; label: string }[];
}

// Creates the nav bar
export default function NavBar({ links }: NavBarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="text-black py-4 w-full shadow-md">
      <div className="w-full mx-1 flex flex-row justify-between items-center">
        {/* Left Section: Logo & Title */}
        <div className="flex items-center space-x-3 pl-3">
          <img id="logoImg" src={logo} alt="Logo" className="h-10 w-auto" />
          <h1 id="h1-Title" className="text-xl font-bold text-black font-[CustomFont]">
            <NavLink to="/">QuikCart</NavLink>
          </h1>
        </div>

        {/* Desktop Navigation Links */}
        <div id="rightNav" className="hidden md:flex items-center space-x-6">
          {links.map((link, index) => (
            <NavLink
              key={index}
              to={link.path}
              className={({ isActive }) =>
                `px-4 py-2 rounded transition ${
                  isActive ? 'text-blue-400 font-bold' : 'hover:text-gray-400'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex flex-col space-y-1.5 p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="w-6 h-0.5 bg-black"></div>
          <div className="w-6 h-0.5 bg-black"></div>
          <div className="w-6 h-0.5 bg-black"></div>
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`md:hidden flex flex-col bg-white shadow-md absolute w-full left-0 px-6 py-4 transition-all ${
          isOpen ? 'block' : 'hidden'
        }`}
      >
        {links.map((link, index) => (
          <NavLink
            key={index}
            to={link.path}
            className="block py-2 text-lg border-b hover:text-blue-400"
            onClick={() => setIsOpen(false)}
          >
            {link.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

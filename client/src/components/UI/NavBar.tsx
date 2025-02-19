import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo.png';

interface NavBarProps {
  links: { path: string; label: string }[];
}

// Creates the nav bar
export default function NavBar({ links }: NavBarProps) {
  return (
    <header className="bg-gray-900 text-white py-4 shadow-md">
      <div className="container mx-auto flex items-center px-6">
        
        {/* Left Section: Logo & Title */}
        <div className="flex items-center space-x-3">
          <img id="logoImg" src={logo} alt="Logo" className="h-10 w-auto" />
          <h1 id="h1-Title" className="text-xl font-bold">
            <NavLink to="/" className="hover:text-gray-400 transition">
              TITLE
            </NavLink>
          </h1>
        </div>

        {/* Right Section: Navigation Links */}
        <nav className="ml-auto">
          <ul className="flex items-center space-x-6">
            {links.map((link, index) => (
              <li key={index}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded transition ${
                      isActive ? "text-blue-400 font-bold" : "hover:text-gray-400"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

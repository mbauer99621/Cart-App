import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo.png';

interface NavBarProps {
  links: { path: string; label: string }[];
}

// Creates the nav bar
export default function NavBar({ links }: NavBarProps) {
  return (
    <nav className="text-white py-4">
      {/* <div className="container mx-auto flex justify-between items-center px-6"> */}
      <div>
        {/* Logo / Branding */}
        <img 
          id = "logoImg"
          src = {logo}
          alt="Logo"
        />
        <h1 id = "h1-Title">
          <NavLink to="/" className="hover:text-gray-400">
            QuikCart
          </NavLink>
        </h1>

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

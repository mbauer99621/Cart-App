import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo.png';

interface NavBarProps {
  links: { path: string; label: string }[];
}

// Creates the nav bar
export default function NavBar({ links }: NavBarProps) {
  return (
    <nav className="text-black py-4 w-full">
      <div className="w-full mx-1 flex flex-row justify-between items-center">
        {/* Left Section: Logo & Title */}
        <div className="flex items-center space-x-3 pl-1 mr-6">

          <img id="logoImg" src={logo} alt="Logo" className="h-10 w-auto" /> 
          <h1 id="h1-Title" className="text-xl font-bold text-black font-[CustomFont]">
            <NavLink to="/">QuikCart</NavLink>
          </h1>
        </div>

        {/* Right Section: Navigation Links */}
        <div id="rightNav" className="ml-6">
          <ul className="flex items-center space-x-6">
            {links.map((link, index) => (
              <li key={index}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded transition ${
                      isActive ? 'text-blue-400 font-bold' : 'hover:text-gray-400'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

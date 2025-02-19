import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo.png';


interface NavBarProps {
  links: { path: string; label: string }[];
}

//Creates the nav bar
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

        {/* Navigation Links */}
        <ul className="flex flex-col items-center w-full md:w-auto md:flex-row md:space-x-6 space-y-2 md:space-y-0">
          {links.map((link, index) => (
            <li key={index}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  isActive ? "text-blue-400 font-bold" : "hover:text-gray-400"
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

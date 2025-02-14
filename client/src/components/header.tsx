//import { Link } from 'react-router-dom';
import Navbar from './UI/NavBar';

export default function Nav() {
  return (
<header className="text-white py-4 shadow-md">
<div className="container mx-auto px-4">

<Navbar
  links={[
    { path: "/", label: "Home" },
    { path: "/LoginPage", label: "Login" },
    { path: "/MyCart", label: "My Cart" },
    { path: "/My Fridge", label: "My Fridge" },
    { path: "/SavedRecipes", label: "My Recipes" },
    ]}
    />
    </div>
    </header>
  );
}

// function Header() {
//   return (
//     <header className="header">
//       <div className="header-content">
//         <img src="./src/assets/logoPlaceholder.png" alt="Logo" className="logo" />
//         <h1></h1>
//       </div>
//       <nav>
//         <ul className="nav-links">
//           <li>
//             <Link to="/gallery" className="nav-link">Gallery</Link>
//           </li>
//           <li>
//             <Link to="/about" className="nav-link">About</Link>
//           </li>
//           <li>
//             <Link to="/contact" className="nav-link">Contact</Link>
//           </li>
//         </ul>
//       </nav>
//     </header>
//   );
// }
// export default Header;
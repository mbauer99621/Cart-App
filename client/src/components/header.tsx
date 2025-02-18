//import { Link } from 'react-router-dom';
import Navbar from './UI/NavBar';

export default function Nav() {
  return (
<header className="text-white py-4 shadow-md">
<div className="container mx-auto px-4">

<Navbar
  links={[
    { path: "/", label: "Home" },
    { path: "/Home", label: "Home" },
    { path: "/LoginPage", label: "Login" },
    { path: "/MyCart", label: "My Cart" },
    { path: "/MyFridge", label: "My Fridge" },
    { path: "/SavedRecipes", label: "My Recipes" },
    { path: "/MyAccount", label: "My Account" },
    ]}
    />
    </div>
    </header>
  );
}

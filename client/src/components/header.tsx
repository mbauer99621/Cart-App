import Navbar from './UI/NavBar';

export default function Nav() {
  // Original links array
  const links = [
    { path: "/", label: "Home" },
    { path: "/saved-recipes", label: "My Recipes" },
    { path: "/MyFridge", label: "My Fridge" },
    { path: "/MyCart", label: "My Cart" },
    { path: "/MyAccount", label: "My Account" },
    { path: "/login", label: "Login" },
  ];

  const reorderedLinks = [
    links[0],  // Home
    links[1],  // My Recipes
    links[2],  // My Fridge
    links[3],  // My Cart
    links[4],  // My Account
    links[5],  // Login
  ];

  return (
    <header className="text-white py-4 shadow-md">
      <div className="container mx-auto px-4">
        <Navbar links={reorderedLinks} />
      </div>
    </header>
  );
}

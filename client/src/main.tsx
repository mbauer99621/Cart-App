import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import App from './App.tsx';

import ErrorPage from './pages/ErrorPage.tsx';
import Home from './pages/LandingPage.tsx';
import Login from './pages/LoginPage.tsx';
import MyCart from './pages/MyCart.tsx';
import MyFridge from './pages/MyFridge.tsx';
import SavedRecipes from './pages/SavedRecipes.tsx';
import SignUpPage from './pages/SignUpPage.tsx';
import MyAccount from './pages/MyAccount.tsx';
import CategoryRecipes from './components/CategoryRecipes.tsx';
import RecipePage from "./pages/RecipePage";


import { AuthProvider } from './context/AuthProvider.tsx';
import { CartFridgeProvider } from './context/CartFridgeProvider.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
    <AuthProvider>
      <CartFridgeProvider>
        <App />
      </CartFridgeProvider>
    </AuthProvider>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/LoginPage',
        element: <Login />,
      },
      {
        path: '/MyCart',
        element: <MyCart />,
      },
      {
        path: '/MyFridge',
        element: <MyFridge />,
      },
      {
        path: '/SavedRecipes',
        element: <SavedRecipes />,
      },
      {
        path: '/signup',
        element: <SignUpPage />,
      },
      {
        path: "/MyAccount", 
        element: <MyAccount /> 
      },
      {
        path: '/category/:categoryName',
        element: <CategoryRecipes />,
      },
      {
        path: '/recipe/:idMeal',  // Add the route for the individual recipe page
        element: <RecipePage />,
      },
    ],
  },
]);

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}

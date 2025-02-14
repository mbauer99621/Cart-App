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

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
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
    ],
  },
]);

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}

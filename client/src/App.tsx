import { Outlet, useLocation } from 'react-router-dom';
import Nav from './components/header';
import Footer from './components/footer';

function App() {
  const location = useLocation();

  const hideNavPaths = ["/LoginPage", "/signup"];

  return (
    <div>
      {!hideNavPaths.includes(location.pathname) && <Nav />}
      
      <main className='container pt-5'>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default App;

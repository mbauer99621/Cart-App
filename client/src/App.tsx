import { Outlet } from 'react-router-dom';
import Nav from './components/header';
import Footer from './components/footer';

function App() {
  return (
    <div>
      <Nav />
      
      <main className='container pt-5'>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default App;

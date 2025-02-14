import { Outlet } from 'react-router-dom';

import Navbar from './components/NavBar';

function App() {
  return (
    <div>
      <Navbar />
      <main className='container pt-5'>
        <Outlet />
      </main>
    </div>
  );
}

export default App;

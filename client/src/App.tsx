import { Outlet } from 'react-router-dom';

import Nav from './components/header';

function App() {
  return (
    <div>
      <Nav />
      
      <main className='container pt-5'>
        <Outlet />
      </main>
    </div>
  );
}

export default App;

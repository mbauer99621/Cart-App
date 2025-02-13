import { Link } from 'react-router-dom';
//Creates the nav bar
const Nav = () => {
  return (
    <nav className="nav">
      <ul>
        <li className="nav-item">
          <Link to="/" className="nav-link">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/savedcandidates" className="nav-link">Potential Candidates</Link>
        </li>
      </ul>
    </nav>
  );
};
export default Nav;
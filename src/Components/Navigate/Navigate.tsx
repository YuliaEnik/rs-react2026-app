import { Link } from "@tanstack/react-router";
import './Navigate.scss';

function Navigation() {

  return (
    <nav className="nav">
      <Link 
        to="/" className="nav-link" 
        activeProps={{ className: 'nav-link_active' }}
        >
          Home
      </Link>
      <Link 
        to="/about" className="nav-link" 
        activeProps={{ className: 'nav-link_active' }}
        >
          About us
      </Link>
    </nav>
  )
};

export { Navigation };

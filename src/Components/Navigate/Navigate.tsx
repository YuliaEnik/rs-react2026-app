import { Link } from "@tanstack/react-router";
import { TEXT } from "../../constants/text";
import "./Navigate.scss";

function Navigation() {
  return (
    <nav className="nav">
      <Link
        to="/"
        className="nav-link"
        activeProps={{ className: "nav-link_active" }}
      >
        {TEXT.navigation.home}
      </Link>
      <Link
        to="/about"
        className="nav-link"
        activeProps={{ className: "nav-link_active" }}
      >
        {TEXT.navigation.about}
      </Link>
    </nav>
  );
}

export default Navigation;

import { Link } from "@tanstack/react-router";
import { TEXT } from "../../constants/text";
import "./Navigate.scss";

function Navigation() {
  const { navigation } = TEXT;

  return (
    <nav className="nav">
      <Link
        to="/catalog"
        className="nav-link"
        activeProps={{ className: "nav-link_active" }}
      >
        {navigation.home}
      </Link>
      <Link
        to="/about"
        className="nav-link"
        activeProps={{ className: "nav-link_active" }}
      >
        {navigation.about}
      </Link>
    </nav>
  );
}

export default Navigation;

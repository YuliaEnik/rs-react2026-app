import { Link } from "@tanstack/react-router";
import { TEXT } from "../../constants/text";
import "./Navigate.scss";
import { useAppTheme } from "../../context/ThemeContext";

function Navigation() {
  const { theme, toggleTheme } = useAppTheme();
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
      <button onClick={toggleTheme} className="theme-toggle-btn" type="button">
        {theme === "light" ? TEXT.theme.dark : TEXT.theme.light}
      </button>
    </nav>
  );
}

export default Navigation;

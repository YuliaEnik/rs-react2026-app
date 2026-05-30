import { Link } from "@tanstack/react-router";
import { TEXT } from "../../constants/text";
import "./Navigate.scss";
import { useAppTheme } from "../../themeContext/ThemeContext";

function Navigation() {
  const { theme, toggleTheme } = useAppTheme();
  const { navigation } = TEXT;

  return (
    <nav className="nav">
      <div className="nav-pages">
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
      </div>
      <button onClick={toggleTheme} className="theme-toggle-btn" type="button">
        {theme === "light" ? TEXT.theme.dark : TEXT.theme.light}
      </button>
    </nav>
  );
}

export default Navigation;

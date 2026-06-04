import { Link } from "@tanstack/react-router";
import { TEXT } from "../../constants/text";
import { useAppTheme } from "../../themeContext/ThemeContext";
import { queryClient } from "../../queryClient";
import { useIsFetching } from "@tanstack/react-query";
import "./Navigate.scss";

function Navigation() {
  const { theme, toggleTheme } = useAppTheme();
  const { navigation } = TEXT;

  const isFetchingAll = useIsFetching();
  const isFetching = isFetchingAll > 0;

  const handleRefresh = async () => {
    await queryClient.invalidateQueries();
  };
  return (
    <nav className="nav">
      <div className="nav-section">
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
      <div className="nav-section">
        <button onClick={toggleTheme} className="nav-link btn" type="button">
          {theme === "light" ? TEXT.theme.dark : TEXT.theme.light}
        </button>
        <button
          className="nav-link btn"
          onClick={handleRefresh}
          disabled={isFetching}
          type="button"
        >
          {isFetching ? TEXT.refresh.updating : TEXT.refresh.refresh}
        </button>
      </div>
    </nav>
  );
}

export default Navigation;

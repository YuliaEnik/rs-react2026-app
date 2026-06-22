"use client"; 
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAppTheme } from "../../themeContext/ThemeContext";
import { TEXT } from "../../constants/text";
import "./Navigate.scss";

function Navigation() {

  const { toggleTheme } = useAppTheme();
  const { navigation } = TEXT;
  
  const pathname = usePathname();
  const router = useRouter();

  const handleRefresh = () => {
    router.refresh();
  };

  const getLinkClass = (path: string) => {
    if (!pathname) return "nav-link";
    if (path === "/") {
      return pathname === "/" || pathname.startsWith("/") 
        ? "nav-link nav-link_active" 
        : "nav-link";
    }
    return pathname.startsWith(path) ? "nav-link nav-link_active" : "nav-link";
  };

  return (
    <nav className="nav">
      <div className="nav-section">
        <Link
          href="/"
          className={getLinkClass("/")}
        >
          {navigation.home}
        </Link>
        <Link
          href="/about"
          className={getLinkClass("/about")}
        >
          {navigation.about}
        </Link>
      </div>
      <div className="nav-section">
 
        <button 
          onClick={toggleTheme} 
          className="nav-link btn theme-toggle-btn" 
          type="button"
        >
          <span className="text-dark">{TEXT.theme.dark}</span>
          <span className="text-light">{TEXT.theme.light}</span>
        </button>
        
        <button
          className="nav-link btn"
          onClick={handleRefresh}
          type="button"
        >
          {TEXT.refresh.refresh}
        </button>
      </div>
    </nav>
  );
}

export default Navigation;

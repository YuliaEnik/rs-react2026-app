"use client"; 

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAppTheme } from "../../themeContext/ThemeContext";
import { TEXT } from "../../constants/text";
import "./Navigate.scss";

function Navigation() {
  const { theme, toggleTheme } = useAppTheme();
  const { navigation } = TEXT;
  
  const pathname = usePathname();
  const router = useRouter();

  const handleRefresh = () => {
    router.refresh();
  };

  const getLinkClass = (path: string) => {
    if (!pathname) return "nav-link";
    if (path === "/catalog") {
      return pathname === "/" || pathname.startsWith("/catalog") 
        ? "nav-link nav-link_active" 
        : "nav-link";
    }
    return pathname.startsWith(path) ? "nav-link nav-link_active" : "nav-link";
  };

  return (
    <nav className="nav">
      <div className="nav-section">
        <Link
          href="/catalog"
          className={getLinkClass("/catalog")}
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
          className="nav-link btn" 
          type="button"
          suppressHydrationWarning={true}
        >
          {theme === "light" ? TEXT.theme.dark : TEXT.theme.light}
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

"use client";
import { useLocale, useTranslations } from "next-intl";
import { Link, useRouter, usePathname } from "../../i18n/navigation";
import { useSearchParams } from "next/navigation";
import { useAppTheme } from "../../themeContext/ThemeContext";
import "./Navigate.scss";

function Navigation() {
  const { toggleTheme } = useAppTheme();

  const t = useTranslations();
  const currentLocale = useLocale();

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleLocaleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = event.target.value;
    const currentParams = searchParams ? searchParams.toString() : "";

    const pathWithoutLocale = pathname.replace(/^\/(en|ru)/, "");

    let targetPath = pathWithoutLocale || "/";
    if (currentParams) {
      targetPath = `${targetPath}?${currentParams}`;
    }

    router.replace(targetPath, { locale: nextLocale });
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

  const handleRefresh = () => {
    router.refresh();
  };

  return (
    <nav className="nav">
      <div className="nav-section">
        <Link href="/" className={getLinkClass("/")}>
          {t("navigation.home")}
        </Link>
        <Link href="/about" className={getLinkClass("/about")}>
          {t("navigation.about")}
        </Link>
      </div>
      <div className="nav-section">
        <button
          onClick={toggleTheme}
          className="nav-link btn theme-toggle-btn"
          type="button"
        >
          <span className="text-dark">{t("theme.dark")}</span>
          <span className="text-light">{t("theme.light")}</span>
        </button>

        <button className="nav-link btn" onClick={handleRefresh} type="button">
          {t("refresh.refresh")}
        </button>

        <select
          value={currentLocale}
          onChange={handleLocaleChange}
          className="locale-switcher"
          style={{
            background: "none",
            border: "1px solid var(--color-border)",
            color: "inherit",
            padding: "0.3rem",
            borderRadius: "4px",
            cursor: "pointer",
            marginRight: "1rem",
          }}
        >
          <option value="en">EN</option>
          <option value="ru">RU</option>
        </select>
      </div>
    </nav>
  );
}

export default Navigation;

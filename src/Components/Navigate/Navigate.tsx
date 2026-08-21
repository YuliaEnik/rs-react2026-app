"use client";
import React from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, useRouter, usePathname } from "../../i18n/navigation";
import { useSearchParams } from "next/navigation";
import { useAppTheme } from "../../themeContext/ThemeContext";
import { useIsFetching } from "@tanstack/react-query";
import { queryClient } from "../../queryClient";
import "./Navigate.scss";

function Navigation() {
  const { toggleTheme } = useAppTheme();

  const t = useTranslations();
  const currentLocale = useLocale();

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const isFetchingAll = useIsFetching();
  const isFetching = isFetchingAll > 0;

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
      return pathname === "/" || pathname === "/catalog"
        ? "nav-link nav-link_active"
        : "nav-link";
    }
    return pathname.startsWith(path) ? "nav-link nav-link_active" : "nav-link";
  };

  const handleRefresh = async () => {
    await queryClient.invalidateQueries();
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

        <button 
          className="nav-link btn" 
          onClick={handleRefresh} 
          disabled={isFetching}
          type="button"
        >
          {isFetching ? t("refresh.updating") : t("refresh.refresh")}
        </button>

        <select
        value={currentLocale}
        onChange={handleLocaleChange}
        className="nav-link btn locale-switcher"
      >
        <option value="en">EN</option>
        <option value="ru">RU</option>
      </select>
      </div>
    </nav>
  );
}

export default Navigation;

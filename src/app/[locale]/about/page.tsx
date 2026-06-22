import type { JSX } from "react";
import { setRequestLocale, getTranslations } from "next-intl/server";
import "../../../appPages/About/About.scss";

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

export default async function About({
  params,
}: AboutPageProps): Promise<JSX.Element> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pages.about" });

  return (
    <section className="about-page">
      <div className="about-card">
        <h1 className="about-title">{t("title")}</h1>

        <section className="about-section">
          <h2>{t("museumHeading")}</h2>
          <p>{t("museumText")}</p>
        </section>

        <section className="about-section">
          <h2>{t("appHeading")}</h2>
          <p>
            {t("appTextPreLink")}{" "}
            <a
              href="https://rs.school/courses/reactjs"
              target="_blank"
              rel="noreferrer"
              className="link"
            >
              <strong>{t("courseLinkText")}</strong>
            </a>
            {t("appTextPostLink")}
          </p>
        </section>

        <p>{t("footerMessage")}</p>
      </div>
    </section>
  );
}

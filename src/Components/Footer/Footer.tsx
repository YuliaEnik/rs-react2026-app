import type { JSX } from "react";
import { LINKS } from "../../constants/links";
import { getTranslations } from "next-intl/server";
import "./Footer.scss";

interface FooterProps {
  locale: string;
}

const Footer = async ({ locale }: FooterProps): Promise<JSX.Element> => {
  const t = await getTranslations({ locale, namespace: "footer" });

  return (
    <section className="footer">
      <div className="footer-content">
        <a
          href={LINKS.creatorGitHub}
          target="_blank"
          rel="noreferrer"
          className="footer-link github-logo"
          aria-label={t("gitHubLabel")}
        />
        {t("year")}

        <a
          href={LINKS.rsSchool}
          target="_blank"
          rel="noreferrer"
          className="footer-link"
        >
          {t("schoolName")}
        </a>
      </div>
    </section>
  );
};

export default Footer;

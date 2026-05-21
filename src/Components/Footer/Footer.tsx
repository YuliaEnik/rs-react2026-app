import type { JSX } from "react";
import { LINKS } from "../../constants/api";
import { TEXT } from "../../constants/text";
import "./Footer.scss";

const Footer = (): JSX.Element => {
  return (
    <section className="footer">
      <div className="footer-content">
        <a
          href={LINKS.creatorGitHub}
          target="_blank"
          rel="noreferrer"
          className="footer-link github-logo"
          aria-label={TEXT.footer.gitHubLabel}
        />
        {TEXT.footer.year}
        <a
          href={LINKS.rsSchool}
          target="_blank"
          rel="noreferrer"
          className="footer-link"
        >
          {TEXT.footer.schoolName}
        </a>
      </div>
    </section>
  );
};

export default Footer;

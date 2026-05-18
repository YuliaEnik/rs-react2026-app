import type { JSX } from "react";
import "./Footer.scss";

const Footer = (): JSX.Element => {
  return (
    <section className="footer">
      <div className="footer-content">
        <a
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
          className="footer-link github-logo"
          aria-label="GitHub Profile"
        />
        2026
        <a
          href="https://rs.school/"
          target="_blank"
          rel="noreferrer"
          className="footer-link"
        >
          RS School
        </a>
      </div>
    </section>
  );
};

export default Footer;

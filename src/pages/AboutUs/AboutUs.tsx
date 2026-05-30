import type { JSX } from "react";
import { TEXT } from "../../constants/text";
import "./AboutUs.scss";

const AboutUs = (): JSX.Element => {
  const { about } = TEXT.pages;

  return (
    <section className="about-page">
      <div className="about-card">
        <h1 className="about-title">{about.title}</h1>

        <section className="about-section">
          <h2>{about.museumHeading}</h2>
          <p>{about.museumText}</p>
        </section>

        <section className="about-section">
          <h2>{about.appHeading}</h2>
          <p>
            {about.appTextPreLink}{" "}
            <a
              href="https://rs.school/courses/reactjs"
              target="_blank"
              rel="noreferrer"
              className="link"
            >
              <strong>{about.courseLinkText}</strong>
            </a>
            {about.appTextPostLink}
          </p>
        </section>

        <p>{about.footerMessage}</p>
      </div>
    </section>
  );
};

export { AboutUs };

import type { JSX } from "react";
import "./AboutUs.scss";

const AboutUs = (): JSX.Element => {
  return (
    <section className="about-page">
      <div className="about-card">
        <h1 className="about-title">About the Project</h1>

        <section className="about-section">
          <h2>The Museum</h2>
          <p>
            <strong>The Cleveland Museum of Art</strong> is one of the
            world&apos;s leading cultural institutions. Its permanent collection
            holds over 65,000 artworks spanning 6,000 years of history — from
            ancient Egyptian treasures to masterpieces by{" "}
            <em>Monet, Van Gogh, and Picasso</em>.
          </p>
        </section>

        <section className="about-section">
          <h2>The Application</h2>
          <p>
            This application was developed by a student as part of the
            educational program
            <a
              href="https://rs.school/courses/reactjs"
              target="_blank"
              rel="noreferrer"
              className="link"
            >
              <strong> RS School React Course </strong>
            </a>
            . Using The project successfully integrates recent and essential
            React development best practices. More information about the student
            can be found via the GitHub link below.
          </p>
        </section>

        <p>
          I hope you enjoy exploring these incredible art pieces and this
          application!
        </p>
      </div>
    </section>
  );
};

export { AboutUs };

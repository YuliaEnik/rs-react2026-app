import type { JSX } from "react";
import './Footer.scss'

const Footer = ():JSX.Element => {
  return (
    <section className="footer">
      <div className="footer-content">
        2026
      <a 
        href="https://rs.school/courses/reactjs" 
        target="_blank" 
        rel="noreferrer" 
        className="footer-link"
        >
          RS School React Course
        </a>
      </div>
    </section>
  )

}

export { Footer };

import type { JSX } from "react";
import './AboutUs.scss';

const AboutUs = ():JSX.Element => {
  return (
     <section className="about-page">
      <div className="about-card">
        <h1 className="about-title">About the Project</h1>
        
        <section className="about-section">
          <h2>The Museum</h2>
          <p>
            <strong>The Cleveland Museum of Art</strong> is one of the world&apos;s leading cultural institutions. 
            Its permanent collection holds over 65,000 artworks spanning 6,000 years of history — from 
            ancient Egyptian treasures to masterpieces by <em>Monet, Van Gogh, and Picasso</em>.
          </p>
        </section>
 
        <section className="about-section">
          <h2>The Application</h2>
          <p>
            This app is created as an <strong>RS School React</strong> project. Using the museum&apos;s Open Access API, 
            it provides a fast and modern way to search, filter, and explore world-class art collections 
            built with React, TypeScript.
          </p>
        </section>

        <p>
          I hope you enjoy exploring these incredible art pieces and this application!
        </p>
      </div>
    </section>
  )
}

export { AboutUs };

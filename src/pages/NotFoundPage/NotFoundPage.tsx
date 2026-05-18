import { Link } from "@tanstack/react-router";
import "./NotFoundPage.scss";


const NotFoundPage = () => {

  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
        <Link to="/" className="home-link">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;

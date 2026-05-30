import { Link } from "@tanstack/react-router";
import "./NotFoundPage.scss";
import { TEXT } from "../../constants/text";

const NotFoundPage = () => {
  const { notFound } = TEXT.pages;
  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <h1>{notFound.heading}</h1>
        <h2>{notFound.subheading}</h2>
        <p>{notFound.message}</p>
        <Link to="/$" className="home-link">
          {notFound.backLink}
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;

import { useNavigate } from "@tanstack/react-router";
import Card from "../../Components/Card/Card";
import "./DetailsPage.scss";
import { Route } from "../../routes/catalog/$id";

const DetailsPage = () => {
  const navigate = useNavigate();

  const card = Route.useLoaderData();

  const closeDetails = () => {
    navigate({ to: "/catalog" });
  };

  const className = "modal-page active";

  return (
    <div className={className} onClick={closeDetails}>
      {card && (
        <div>
          <div
            className="modal-content"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="modal-header">
              <div className="btn-modal" onClick={closeDetails}>
                <p className="btn-modal__img">X</p>
              </div>
            </div>
            <Card {...card} isSelected={true} />
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailsPage;

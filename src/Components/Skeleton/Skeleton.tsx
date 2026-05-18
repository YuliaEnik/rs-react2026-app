import "./Skeleton.scss";

const SkeletonCard = () => (
  <li className="card-wrapper skeleton-card">
    <div className="skeleton-image"></div>
    <div className="skeleton-line author"></div>
    <div className="skeleton-line title"></div>
    <div className="skeleton-line year"></div>
  </li>
);

export default SkeletonCard;

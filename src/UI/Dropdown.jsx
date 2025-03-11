import "./Dropdown.css";

export const Dropdown = ({ sortSelect }) => {
  return (
    <div className="dropdown">
      <div className="dropdown-title" onClick={() => sortSelect("recent")}>
        최신순
      </div>
      <div className="dropdown-title" onClick={() => sortSelect("favorite")}>
        인기순
      </div>
    </div>
  );
};

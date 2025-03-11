import "./Pagination.css";
import LeftArrow from "/btn_left.png"; 
import RightArrow from "/btn_right.png"; 

export const Pagination = ({ totalPage, activePage, onPage }) => {
  const maxPages = 5;
  let startPage;

  if (totalPage <= maxPages) {
    startPage = 1;
  } else {
    startPage = Math.max(activePage - Math.floor(maxPages / 2), 1);
    startPage = Math.min(totalPage - maxPages + 1, startPage);
  }

  const pages = [];
  const pageNum = Math.min(maxPages, totalPage - startPage + 1);

  for (let i = 0; i < pageNum; i++) {
    pages.push(startPage + i);
  }

  return (
    <div className="pagination">
      <button
        className="pagination-btn"
        onClick={() => onPage(activePage - 1)}
        disabled={activePage === 1}
      >
        <img src={RightArrow} alt="Left Arrow" /> {/* 이미지로 사용 */}
      </button>

      {pages.map((page) => (
        <button
          key={page}
          className={`pagination-btn ${page === activePage ? "active" : ""}`}
          onClick={() => onPage(page)}
        >
          {page}
        </button>
      ))}
      <button
        className="pagination-btn"
        onClick={() => onPage(activePage + 1)}
        disabled={activePage === totalPage}
      >
        <img src={LeftArrow} alt="Right Arrow" /> {/* 이미지로 사용 */}
      </button>
    </div>
  );
};

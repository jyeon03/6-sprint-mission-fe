import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { productFetch } from "../../api/productFetch";
import SortMobile from "/ic_sort.png";
import SortArrow from "/ic_arrow_down.png";
import Search from "/ic_search.png";
import { Dropdown } from "../../UI/Dropdown";
import { Pagination } from "../../UI/Pagination";

const getPageSize = () => {
  const width = window.innerWidth;

  if (width < 768) return 4;
  else if (width < 1280) return 6;
  else return 10;
};

export const ProductList = () => {
  const [orderBy, setOrderBy] = useState("recent");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(getPageSize());
  const [keyword, setKeyword] = useState("");
  const [items, setItems] = useState([]);
  const [isDropdown, setIsDropdown] = useState(false);
  const [totalPage, setTotalPage] = useState();

  const fetchProducts = async ({ orderBy, page, pageSize, keyword }) => {
    const products = await productFetch({ orderBy, page, pageSize, keyword });
    setItems(products.items);
    setTotalPage(Math.ceil(products.totalcount / pageSize));
  };

  const handleSort = (sortOption) => {
    setOrderBy(sortOption);
    setIsDropdown(false);
  };

  const handleInputChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleSearch = () => {
    setPage(1);
    fetchProducts({ orderBy, page: 1, pageSize, keyword });
  };

  const handleKey = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const toKorean = (orderBy) => {
    switch (orderBy) {
      case "recent":
        return "최신순";
      case "popular":
        return "인기순";
      default:
        return "최신순";
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setPageSize(getPageSize());
    };

    window.addEventListener("resize", handleResize);
    fetchProducts({ orderBy, page, pageSize, keyword });

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [orderBy, page, pageSize, keyword]);

  const toggleDropdown = () => {
    setIsDropdown(!isDropdown);
  };

  const onPage = (pageNum) => {
    setPage(pageNum);
    fetchProducts({ orderBy, page: pageNum, pageSize, keyword });
  };

return (
  <div className="AllProducts">
    <div className="product-header">
      <h1 className="product-title">판매 중인 상품</h1>
      <div className="search-bar">
        <img className="search-icon" src="/ic_search.png" alt="search" />
        <input
          className="search-input"
          type="text"
          placeholder="검색할 상품을 입력해 주세요."
          value={keyword}
          onChange={handleInputChange}
          onKeyPress={handleKey}
        />
      </div>
      <div to="/addProduct" className="add-btn">
        상품 등록하기
      </div>
      <div className="sort">
        <button className="sort-dropdown" onClick={toggleDropdown}>
          <div className="sort-btn">
            <span>{toKorean(orderBy)}</span>
            <img src={SortArrow} alt="sort" />
          </div>
          <img className="mobile-sort" src={SortMobile} alt="sort" />
        </button>
        {isDropdown && <Dropdown handleSort={handleSort} />}
      </div>
    </div>

    <div className="product-list">
      {items?.map((item) => (
        <ProductCard key={item.id} item={item} />
      ))}
    </div>

    <div className="pagination">
      <Pagination totalPage={totalPage} activePage={page} onPage={onPage} />
    </div>
  </div>
);
};
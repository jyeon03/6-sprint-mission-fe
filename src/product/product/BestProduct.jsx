import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { productFetch } from "../../api/productFetch";

const getPageSize = () => {
  const width = window.innerWidth;
  if (width < 744) return 1;
  else if (width < 1280) return 2;
  else return 4;
};

export const BestProduct = () => {
  const [items, setItems] = useState([]);
  const [pageSize, setPageSize] = useState(getPageSize());

  const fetchProducts = async ({ orderBy, pageSize }) => {
    const products = await productFetch({ orderBy, pageSize });
    setItems(products);
  };

  useEffect(() => {
    const handleResize = () => {
      setPageSize(getPageSize());
    };

    window.addEventListener("resize", handleResize); // 창 크기 변경 이벤트, 브라우저 창 크기를 조절할 때마다 handleResize 함수가 실행
    fetchProducts({ orderBy: "favorite", pageSize });

    return () => {
      window.removeEventListener("resize", handleResize);
      // 컴포넌트가 언마운트될 때, 이벤트 리스너를 제거
      // 이벤트 리스너를 제거하지 않으면, 컴포넌트가 다시 마운트될 때마다 이벤트 리스너가 중복으로 등록됨
      // 이벤트 리스너가 중복으로 등록되면, 이벤트가 여러 번 발생하게 되어 성능에 영향을 줄 수 있음
    };
  }, [pageSize]);

  return (
    <div className="best-products">
      <h1 className="best-title">베스트 상품</h1>
      <div className="product-list">
        {items?.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

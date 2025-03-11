import { BestProduct } from "./product/BestProduct";
import { ProductList } from "./product/ProductList";
import "./Market.css";

export function Market() {
  return (
    <div>
      <BestProduct />
      <ProductList />
    </div>
  );
}   

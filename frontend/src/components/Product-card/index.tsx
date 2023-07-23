import { IProduct } from "../../models/product";
import "./product-card.scss";
const ProductCard = ({ product }: any) => {
  return <div>{product.name}</div>;
};

export default ProductCard;

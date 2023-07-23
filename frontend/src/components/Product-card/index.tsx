import { IProduct } from "../../models/product";
import "./product-card.scss";
const ProductCard: React.FC<{ product: IProduct; handleProduct: () => void }> = ({ product, handleProduct }) => {
  return (
    <div className="product-container" onClick={handleProduct}>
      <div className="sale-tag">Sale</div>
      <div className="product-image-container">
        <img src={product.image} className="product-image w-50 h-60" />
      </div>
      <div className="pl-4">
        <div className="brand line-clamp-1">{product.brand}</div>
        <div className="title text-md font-medium">{product.name}</div>
        <div className="price text-xl font-bold my-3 text-left">₹{product.price}</div>
      </div>
    </div>
  );
};

export default ProductCard;

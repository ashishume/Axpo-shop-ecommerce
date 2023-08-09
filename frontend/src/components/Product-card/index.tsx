import { useNavigate } from "react-router-dom";
import { IProduct } from "../../models/product";
import "./product-card.scss";
import { newTitle } from "../../Utils/convertTextToLink";
const ProductCard: React.FC<{ product: IProduct }> = ({ product }) => {
  const navigate = useNavigate();

  function handleProduct() {
    navigate(`/product/${newTitle(product.name)}/${product._id}`);
  }

  return (
    <div className="product-container" onClick={handleProduct}>
      <div className="sale-tag">Sale</div>
      <div className="product-image-container">
        <img src={product.image} className="product-image w-50 h-60" draggable="false" />
      </div>
      <div className="pl-4">
        <div className="brand line-clamp-1 truncate">{product.brand}</div>
        <div className="title text-md font-medium truncate pr-3">{product.name}</div>
        <div className="price text-xl font-bold my-3 text-left">₹{product.price}</div>
      </div>
    </div>
  );
};

export default ProductCard;

import React, { ChangeEvent } from "react";
import styles from "./cart-product.module.scss";
import { IProduct } from "../../models/product";
import { ICart } from "../../models/cart";
const CartProduct = ({
  product,
  removeFromCart,
  onQuantitySelect,
  productDetails,
}: {
  product: IProduct;
  productDetails: {
    quantity: number;
    price: number;
  };
  removeFromCart: () => void;
  onQuantitySelect: (qty: number) => void;
}) => {
  return (
    <div className={styles.cartContainer}>
      <div className={styles.leftContent}>
        <img src={product.image} className={styles.productImage} />
      </div>
      <div className={styles.rightContent}>
        <div className={styles.brandName}>{product.brand}</div>
        <div className={styles.title}>{product.name}</div>
        <div className={styles.quantity}>
          Quantity:
          <select
            className={styles.quantitySelect}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onQuantitySelect(parseInt(e.target.value))}
            value={productDetails.price}
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
          </select>
        </div>
        <div className={styles.price}>₹ {productDetails.price}</div>
        <div className={styles.returnPolicyText}>14 days return policy</div>
        <div className={styles.removeFromCart} onClick={removeFromCart}>
          <button>Remove</button>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;

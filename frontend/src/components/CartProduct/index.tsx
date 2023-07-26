import React from "react";
import styles from "./cart-product.module.scss";
import { IProduct } from "../../models/product";
const CartProduct = ({ product }: { product: IProduct }) => {
  return (
    <div className={styles.cartContainer}>
      <div className={styles.leftContent}>
        <img src={product.image} className={styles.productImage} />
      </div>
      <div className={styles.rightContent}>
        <div className={styles.brandName}>{product.brand}</div>
        <div className={styles.title}>{product.name}</div>
        <div className={styles.quantity}>Quantity: {product.quantity}</div>
        <div className={styles.price}>₹ {product.price}</div>
        <div className={styles.returnPolicyText}>14 days return policy</div>
        <div className={styles.removeFromCart}>
          <button>Remove</button>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;

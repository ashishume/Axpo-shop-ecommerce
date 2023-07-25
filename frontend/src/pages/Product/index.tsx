import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchProduct } from "../../store/slices/productSlice";
import { useParams } from "react-router-dom";
import styles from "./product.module.scss";
import Layout from "../../components/layout";
import SpinningLoader from "../../components/SpinningLoader";
const Product = () => {
  const dispatch = useAppDispatch();
  const product = useAppSelector((state) => state.productsSlice.product);
  const loading = useAppSelector((state) => state.productsSlice.isLoading);
  const { productId } = useParams();
  useEffect(() => {
    dispatch(fetchProduct(productId as string));
  }, []);
  function addToCart() {
    console.log(product);
  }
  return (
    <Layout>
      <div className={styles.category}>{product.category.name}</div>
      {loading ? (
        <SpinningLoader />
      ) : (
        <div className={styles.productContainer}>
          <div className={styles.leftContainer}>
            <div className={styles.productImageContainer}>
              <img src={product.image} draggable="false" className={styles.productImage} />
            </div>
          </div>
          <div className={styles.rightContainer}>
            <div className={styles.brand}>{product.brand}</div>
            <div className={styles.title}>{product.name}</div>
            <div className={styles.price}>₹ {product.price}</div>
            <div className={styles.taxDescription}>(Inclusive of all taxes)</div>
            <div className={styles.description}>{product.description}</div>
            <div className={styles.buttonActions}>
              <div className={styles.addToCart} onClick={addToCart}>
                Add to cart
              </div>
              <div className={styles.wishlist}>Wishlist</div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Product;

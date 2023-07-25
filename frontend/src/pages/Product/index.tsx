import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { checkIfAddedToCart, fetchProduct } from "../../store/slices/productSlice";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./product.module.scss";
import Layout from "../../components/layout";
import SpinningLoader from "../../components/SpinningLoader";
import { updateCart } from "../../store/slices/cartSlice";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
const Product = () => {
  const dispatch = useAppDispatch();
  const { product, isLoading, productAddedToCart } = useAppSelector((state) => state.productsSlice);
  const { productId } = useParams();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  useEffect(() => {
    dispatch(fetchProduct(productId as string));
    checkProductAdded();
  }, []);

  function checkProductAdded() {
    if (userId && productId) {
      dispatch(checkIfAddedToCart({ productId, userId }));
    }
  }

  async function addToCart() {
    const payload = {
      items: [
        {
          product: productId,
          quantity: 1,
        },
      ],
      user: userId,
    };
    if (userId) {
      await dispatch(updateCart({ userId, payload }));
      await checkProductAdded();
    }
  }

  function goToCart() {
    navigate("/cart");
  }

  return (
    <Layout>
      {console.log(productAddedToCart)}

      <div className={styles.category}>{product.category.name}</div>
      {isLoading ? (
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
              {productAddedToCart ? (
                <div className={styles.addToCart} onClick={goToCart}>
                  Go to cart
                  <ChevronRightIcon />
                </div>
              ) : (
                <div className={styles.addToCart} onClick={addToCart}>
                  Add to cart
                </div>
              )}
              <div className={styles.wishlist}>Wishlist</div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Product;

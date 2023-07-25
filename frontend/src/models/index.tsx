import { ICart } from "./cart";
import { IProduct } from "./product";

export interface RootState {
  products: IProduct[];
  product: IProduct;
  isLoading: boolean;
  cart: ICart;
}
export interface ProductState {
  products: IProduct[];
  product: IProduct;
  isLoading: boolean;
}

export interface CartState {
  cart: ICart;
  isLoading: boolean;
}

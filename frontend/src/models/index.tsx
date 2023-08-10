import { ICart, ICartResponse } from './cart';
import { IOrders } from './order';
import { IProduct } from './product';

export interface RootState {
  products: IProduct[];
  product: IProduct;
  isLoading: boolean;
  cart: ICart;
}
export interface ProductState {
  products: IProduct[];
  categoryProducts: IProduct[];
  categoryFilterProducts: IProduct[];
  searchProducts: IProduct[];
  product: IProduct;
  isLoading: boolean;
  productAddedToCart: {
    productId: string;
    isAdded: boolean;
  };
}

export interface CartState {
  cart: ICartResponse[];
  isLoading: boolean;
  totalPrice: number;
}
export interface CategoryState {
  categories: ICategory[];
  isLoading: boolean;
}

export interface ICategory {
  name: string;
  _id?: string;
  image: string;
}

export interface OrdersState {
  orders: IOrders[];
  isLoading: boolean;
  isOrderPlaced: boolean;
}

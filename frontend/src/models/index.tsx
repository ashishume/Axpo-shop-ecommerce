import { IProduct } from "./product";

export interface RootState {
  products: IProduct[];
  isLoading: boolean;
}

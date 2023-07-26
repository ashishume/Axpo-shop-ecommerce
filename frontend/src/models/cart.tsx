import { IProduct } from "./product";
import { IUser } from "./user";

export interface ICart {
  product: string;
  quantity: number;
  user: string;
}
export interface ICartResponse {
  product: IProduct;
  quantity: number;
  user: IUser;
}

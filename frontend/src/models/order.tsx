import { IProduct } from "./product";

export interface IOrders {
  products: { product: IProduct; quantity: number; _id: string }[];
  user: string;
  _id: string;
  totalAmount: number;
  orderDate: string;
  address: string;
}

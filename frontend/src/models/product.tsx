export interface IProduct {
  _id: string;
  name: string;
  category: {
    name: string;
  };
  brand: string;
  quantity: number;
  price: number;
  image: string;
  description: string;
}

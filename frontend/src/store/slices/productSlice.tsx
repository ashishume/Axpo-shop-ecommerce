import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ProductState } from "../../models";
import { Axios } from "../../services/http-service";

const productInitial = {
  _id: "",
  name: "",
  category: {
    name: "",
    _id: "",
  },
  brand: "",
  quantity: 0,
  price: 0,
  image: "",
  description: "",
};

const initialState: ProductState = {
  products: [],
  categoryProducts: [],
  categoryFilterProducts: [],
  searchProducts: [],
  product: productInitial,
  isLoading: false,
  productAddedToCart: {
    productId: "",
    isAdded: false,
  },
};

export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  const response = await Axios.get("/products", { withCredentials: true });
  return response.data;
});
export const fetchCategoryProducts = createAsyncThunk("products/fetchCategoryProducts", async (categoryId: string) => {
  const response = await Axios.get("/products/" + categoryId, { withCredentials: true });
  return response.data;
});
export const fetchProduct = createAsyncThunk("product/fetchProduct", async (productId: string) => {
  const response = await Axios.get("/product/" + productId, { withCredentials: true });
  return response.data;
});
export const searchProducts = createAsyncThunk("product/searchProducts", async (searchValue: string) => {
  const response = await Axios.get("/search?searchValue=" + searchValue, { withCredentials: true });
  return response.data;
});
export const checkIfAddedToCart = createAsyncThunk(
  "cart/checkIfAddedToCart",
  async ({ productId, userId }: { productId: string; userId: string }) => {
    const response = await Axios.get("/product/added-to-cart/" + userId + "/" + productId, { withCredentials: true });
    return response.data;
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearState: (state) => initialState,
    removeFilterProductsByCategory: (state, action) => {
      state.categoryFilterProducts = state.categoryFilterProducts.filter((product) => product.category._id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    //fetchProducts
    builder.addCase(fetchProducts.pending, (state: ProductState, action: PayloadAction<any>) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state: ProductState, action: PayloadAction<any>) => {
      state.products = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchProducts.rejected, (state: ProductState, action: PayloadAction<any>) => {
      state.products = [];
      state.isLoading = false;
    });

    //fetchCategoryProducts
    builder.addCase(fetchCategoryProducts.pending, (state: ProductState, action: PayloadAction<any>) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCategoryProducts.fulfilled, (state: ProductState, action: PayloadAction<any>) => {
      state.categoryProducts = action.payload;
      state.categoryFilterProducts = [...state.categoryFilterProducts, ...action.payload];
      state.isLoading = false;
    });
    builder.addCase(fetchCategoryProducts.rejected, (state: ProductState, action: PayloadAction<any>) => {
      state.categoryProducts = [];
      state.isLoading = false;
    });

    //fetchProduct
    builder.addCase(fetchProduct.pending, (state: ProductState, action: PayloadAction<any>) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProduct.fulfilled, (state: ProductState, action: PayloadAction<any>) => {
      state.product = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchProduct.rejected, (state: ProductState, action: PayloadAction<any>) => {
      state.product = productInitial;
      state.isLoading = false;
    });

    //fetchSearchProducts
    builder.addCase(searchProducts.pending, (state: ProductState, action: PayloadAction<any>) => {
      state.isLoading = true;
    });
    builder.addCase(searchProducts.fulfilled, (state: ProductState, action: PayloadAction<any>) => {
      state.searchProducts = action.payload;
      state.isLoading = false;
    });
    builder.addCase(searchProducts.rejected, (state: ProductState, action: PayloadAction<any>) => {
      state.searchProducts = [];
      state.isLoading = false;
    });

    //checkIfAddedToCart
    builder.addCase(checkIfAddedToCart.fulfilled, (state: ProductState, action: PayloadAction<any>) => {
      state.productAddedToCart = action.payload;
    });
    builder.addCase(checkIfAddedToCart.rejected, (state: ProductState, action: PayloadAction<any>) => {
      state.productAddedToCart = {
        productId: "",
        isAdded: false,
      };
    });
  },
});

export const { clearState, removeFilterProductsByCategory } = productsSlice.actions;
export const selectProducts = (state: ProductState) => state.products;
export default productsSlice.reducer;

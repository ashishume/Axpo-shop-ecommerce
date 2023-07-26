import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productsSlice from "./slices/productSlice";
import cartSlice from "./slices/cartSlice";
const store = configureStore({
  reducer: combineReducers({ productsSlice, cartSlice }),
});
export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

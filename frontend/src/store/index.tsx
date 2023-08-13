import { combineReducers, configureStore } from '@reduxjs/toolkit';
import productsSlice from './slices/productSlice';
import cartSlice from './slices/cartSlice';
import categorySlice from './slices/categorySlices';
import ordersSlice from './slices/ordersSlice';
import flightsSlices from '../pages/Bookings/store/flightsSlices';
import seatsSlices from '../pages/Bookings/store/seatsSlices';
const store = configureStore({
  reducer: combineReducers({
    productsSlice,
    cartSlice,
    categorySlice,
    ordersSlice,
    flightsSlices,
    seatsSlices
  }),
});
export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

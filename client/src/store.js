import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authReducer from './features/auth/authSlice';
import productReducer from './features/products/productSlice';
import cartReducer from './features/cart/cartSlice';
import orderReducer from './features/order/orderSlice';
import reviewReducer from './features/review/reviewSlice';
import wishlistReducer from './features/wishlist/wishlistSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  products: productReducer,
  cart: cartReducer,
  order: orderReducer,
  review: reviewReducer,
  wishlist: wishlistReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart'], 
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }),
});

export const persistor = persistStore(store);

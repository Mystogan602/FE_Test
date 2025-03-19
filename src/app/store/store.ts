import { configureStore } from '@reduxjs/toolkit';
import wishlistReducer from './features/wishlist/wishlistSlice';
import productsReducer from './features/products/productsSlice';

export const store = configureStore({
    reducer: {
        wishlist: wishlistReducer,
        products: productsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

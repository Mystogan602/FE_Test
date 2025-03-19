import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Product {
    id: string;
    title: string;
    price: number;
    originalPrice?: number;
    image: string;
    badges: {
        discount?: number;
        freeShipping?: boolean;
        gift?: boolean;
        flashSale?: boolean;
    };
    totalSold?: number;
}

interface ProductsState {
    items: Product[];
    loading: boolean;
    error: string | null;
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
}

const initialState: ProductsState = {
    items: [],
    loading: false,
    error: null,
    currentPage: 1,
    totalPages: 1,
    itemsPerPage: 12
};

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts: (state, action: PayloadAction<Product[]>) => {
            state.items = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
        setTotalPages: (state, action: PayloadAction<number>) => {
            state.totalPages = action.payload;
        },
        loadMoreProducts: (state, action: PayloadAction<Product[]>) => {
            state.items = [...state.items, ...action.payload];
            state.currentPage += 1;
        }
    }
});

export const {
    setProducts,
    setLoading,
    setError,
    setCurrentPage,
    setTotalPages,
    loadMoreProducts
} = productsSlice.actions;

export default productsSlice.reducer;

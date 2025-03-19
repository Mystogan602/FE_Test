import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WishlistState {
    items: string[]; // array of product IDs
}

const initialState: WishlistState = {
    items: [],
};

export const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        toggleWishlist: (state, action: PayloadAction<string>) => {
            const index = state.items.indexOf(action.payload);
            if (index === -1) {
                state.items.push(action.payload);
            } else {
                state.items.splice(index, 1);
            }
        },
    },
});

export const { toggleWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;

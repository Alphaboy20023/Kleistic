import { createSlice } from "@reduxjs/toolkit";

let cartFromStorage;
try {
    const stored = localStorage.getItem("cart");
    cartFromStorage = stored && stored !== "undefined" ? JSON.parse(stored) : [];
} catch (err) {
    cartFromStorage = [];
}

const initialState = {
    items: cartFromStorage,
};


const cartSlice = createSlice({
    name: 'cart',
    initialState,

    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const existing = state.items.find(i => i.id === item.id);
            // console.log("Redux addToCart payload:", action.payload);
            if (existing) {
                existing.quantity += 1;
            } else {
                state.items.push({ ...item, quantity: 1 })
            };

            localStorage.setItem("cart", JSON.stringify(state.items));
        },

        updateQuantity: (state, action) => {
            const { productId, quantity } = action.payload;
            const existingItem = state.items.find(item => item.id === productId);
            if (existingItem) {
                if (quantity <=0) {
                    state.items = state.items.filter(i => i.id !== productId)
                } else {
                    existingItem.quantity = quantity;
                }
            }

            localStorage.setItem('cart', JSON.stringify(state.items))
        },

        removeFromCart: (state, action) => {
            const itemIndex= state.items.findIndex(i => i.id === action.payload);

            if (itemIndex !== -1) {
                if (state.items[itemIndex].quantity > 1) {
                    state.items[itemIndex].quantity -= 1;
                } else {
                    state.items.splice(itemIndex, 1)
                }
            }

            localStorage.setItem('cart', JSON.stringify(state.items))
        },

        decreaseQuantity: (state, action) => {
            const item = state.items.find(i => i.id === action.payload);

            if (item) {
                if (item.quantity > 1) {
                    item.quantity -=1;
                } else {
                    state.items= state.items.filter(i => i.id !==action.payload)
                }
            } 

            localStorage.setItem("cart", JSON.stringify(state.items));
        },

        clearCart: (state, action) => {
            state.items = [];

            localStorage.removeItem("cart");
        }
    }
})

export const { addToCart, removeFromCart, decreaseQuantity, clearCart, updateQuantity } = cartSlice.actions
export default cartSlice.reducer;
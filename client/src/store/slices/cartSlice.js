import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // Lista produselor din coș
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.items = action.payload;
    },
    addToCart: (state, action) => {
      const existingProduct = state.items.find(item => item.productId === action.payload.productId);
      if (existingProduct) {
        existingProduct.quantity += action.payload.quantity;
      } else {
        state.items.push({
          productId: action.payload.productId,
          quantity: action.payload.quantity,
          price: action.payload.price, 
          title: action.payload.title
      });
      }
    },
    updateCart: (state, action) => {
      const { productId, quantity } = action.payload;
      const product = state.items.find(item => item.productId === productId);
      if (product) {
        product.quantity = quantity;
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.productId !== action.payload);
    },
    clearCart: (state) => {
      state.items = []; // Golește lista de produse din coș
    },
  },
});

export const { setCart, addToCart, updateCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

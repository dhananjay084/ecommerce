import { createSlice } from "@reduxjs/toolkit";

// Load initial state from localStorage
const loadCartFromStorage = () => {
  const savedCart = localStorage.getItem("cart");
  return savedCart ? JSON.parse(savedCart) : { items: [], totalQuantity: 0, totalPrice: 0 };
};

const cartSlice = createSlice({
  name: "cart",
  initialState: loadCartFromStorage(),
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.totalQuantity += 1;
      state.totalPrice += action.payload.price;

      // Save updated cart to localStorage
      localStorage.setItem("cart", JSON.stringify(state));
    },
    removeFromCart: (state, action) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          state.items = state.items.filter((item) => item.id !== action.payload.id);
        }
        state.totalQuantity -= 1;
        state.totalPrice -= action.payload.price;
      }

      // Save updated cart to localStorage
      localStorage.setItem("cart", JSON.stringify(state));
    },
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;

      // Clear cart from localStorage
      localStorage.removeItem("cart");
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [],
};

const cartSlice = createSlice({
  name: 'cart',

  initialState,

  reducers: {

    addToCart: (state, action) => {
  const item = action.payload;

  const existItem = state.cartItems.find(
    (x) => x.productId === item.productId
  );

  const updatedItem = {
    ...item,
    qty: Number(item.qty) || 1,
    price: Number(item.price),
  };

  if (existItem) {
    state.cartItems = state.cartItems.map((x) =>
      x.productId === item.productId
        ? updatedItem
        : x
    );
  } else {
    state.cartItems.push(updatedItem);
  }

  localStorage.setItem(
    'cartItems',
    JSON.stringify(state.cartItems)
  );
},

    removeFromCart: (state, action) => {

      const productId = action.payload;

      state.cartItems = state.cartItems.filter(
        (x) => x.productId !== productId
      );

      localStorage.setItem(
        'cartItems',
        JSON.stringify(state.cartItems)
      );
    },

    clearCart: (state) => {

      state.cartItems = [];

      localStorage.removeItem('cartItems');
    },

  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
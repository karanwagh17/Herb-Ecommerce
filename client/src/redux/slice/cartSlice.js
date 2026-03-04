import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  cartProduct: null,
  quentity: null,
  error: null,
};
export const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart: (state, action) => {
      state.cartProduct = action.payload;
    },
    
  },
});
export const { addCart } = CartSlice.actions;
export default CartSlice.reducer

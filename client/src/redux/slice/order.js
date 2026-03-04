import { createSlice } from "@reduxjs/toolkit";

export const orderSlice = createSlice({
  name: "order",
  initialState: {
    loading: false,
    order: null,
    orders: [],   // 👈 add this
    error: null,
  },
  reducers: {
    placeOrderStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    placeOrderSuccess: (state, action) => {
      state.loading = false;
      state.order = action.payload;
      state.error = null;
    },
    placeOrderError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // ✅ ADMIN
    getallordersForadminStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getallordersForadminSuccess: (state, action) => {
      state.loading = false;
      state.orders = action.payload;   // 👈 IMPORTANT
      state.error = null;
    },
    getallordersForadminError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const {
  placeOrderStart,
  placeOrderSuccess,
  placeOrderError,
  getallordersForadminStart,
  getallordersForadminSuccess,
  getallordersForadminError
} = orderSlice.actions;

export default orderSlice.reducer;
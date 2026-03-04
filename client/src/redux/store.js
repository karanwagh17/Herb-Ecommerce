import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./slice/authSlice" 
import cartReducer from "./slice/cartSlice"
// import { orderSlicereducer } from './slice/order';
import orderSlicereducer from "./slice/order";

const persistConfig = {
  key: "root",
  storage,
};
const rootReducer = combineReducers({ auth: authReducer,cart:cartReducer, order: orderSlicereducer});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer
})
export const persistor= persistStore(store);
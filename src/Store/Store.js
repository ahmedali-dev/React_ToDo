import { configureStore } from "@reduxjs/toolkit";
import List from './slices/ListSlice';
const Store = configureStore({
  reducer: {
    List
  },
});

export default Store;

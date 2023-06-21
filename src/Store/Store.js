import { configureStore } from "@reduxjs/toolkit";
import List from './slices/ListSlice';
import Notes from "./slices/NotesSlice";
const Store = configureStore({
  reducer: {
    List,
    Notes
  },
});

export default Store;

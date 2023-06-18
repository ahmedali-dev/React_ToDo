import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../hooks/axios";
import { toast } from "react-hot-toast";

const initialState = {
  lists: [],
  data: [],
  error: {},
  loading: false,
  beforeHandle: [],
};

const createApiAction = ({ url, method, success, failure }) =>
  createAsyncThunk(`api/${url}`, async (data, { rejectedWithValue }) => {
    const response = await axios[method](url, data);
    return response.data;
  });

const fetch = createApiAction({
  url: "/lists",
  method: "post",
});
const ListsSlice = createSlice({
  name: "lists",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetch.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetch.fulfilled, (state, action) => {
        state.loading = false;
        const { data, status } = action.payload;
        if (status !== 200) {
          return;
        }

        state.data = data;
      })
      .addCase(fetch.rejected, (state, action) => {
        state.loading = false;
        state.error.token = true;
        toast.error("request Error");
      });
  },
});

export const {} = ListsSlice.actions;
export { fetch };
export default ListsSlice.reducer;

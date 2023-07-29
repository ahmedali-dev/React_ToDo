import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BuilderHandleV3 } from "../../hooks/thunk";
import { toast } from "react-hot-toast";
import instance from "../../hooks/axios";

let initialState = {
  verifyToken: null,
  error: null,
  status: "idle", // idle, failed, succeeded, loading
};

const CreateNewUser = createAsyncThunk(
  "user/newUser",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await instance.post("register", payload.body);
      return res.data;
    } catch (error) {
      console.log(
        "🚀 ~ file: registerSlice.js:17 ~ CreateNewUser ~ error:",
        error
      );
      return rejectWithValue({
        ...error.response,
        inputError: payload.setInputError,
      });
    }
  }
);

const registerSlice = createSlice({
  name: "register",
  initialState,
  extraReducers: (builder) =>
    BuilderHandleV3(builder, CreateNewUser, (err, state, action) => {
      if (err) {
        const errors = action.payload;
        if (errors?.data?.validation) {
          const inputError = errors.inputError;
          const validation = errors.data.validation;
          console.log(
            "🚀 ~ file: registerSlice.js:41 ~ BuilderHandleV3 ~ validation:",
            validation
          );

          Object.entries(validation).map(([name, obj]) => {
            if (name === "password") {
              inputError(name, obj.msg);
            }
          });
          return;
        } else if (errors?.data?.error) {
          return toast.error(errors.error);
        }
        toast.error(errors?.data?.message);
        return;
      }

      const data = action.payload;
      state.verifyToken = data.verifyToken;
      return toast.success(data.message);
    }),
});

const RegisterSelect = (state) => state.register;
export { CreateNewUser, RegisterSelect };
export default registerSlice.reducer;

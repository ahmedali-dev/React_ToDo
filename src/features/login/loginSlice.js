import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BuilderHandleV3, FetchData } from "../../hooks/thunk";
import instance from "../../hooks/axios";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";

let initialState = {
  verifyToken: null,
  error: null,
  status: "idle",
  token: null,
};

const AuthUser = createAsyncThunk(
  "user/fetch",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await instance.post("/auth", payload.body);
      return { ...res.data, Auth: payload.login };
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState,
  extraReducers: (builder) =>
    BuilderHandleV3(builder, AuthUser, (err, state, action) => {
      //   if (err) {
      //     console.log(action);
      //     return toast.error(action.payload.data.msg);
      //   }
      //   toast.success("loading");

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
        state.verifyToken = errors?.data?.verifyToken;
        state.status = "idle";
        toast.error(errors?.data?.msg);
        return;
      }

      const data = action.payload;
      state.token = data?.token;
      data?.Auth(data?.token);

      return toast.success(data.msg);
    }),
});

const selectLogin = (state) => state.login;
export { AuthUser, selectLogin };
export default loginSlice.reducer;

// API.js
import instance from "./../hooks/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { isExpired, decodeToken } from "react-jwt";

export const FetchData = async (
  url,
  requestData = {},
  headers = {},
  auth = null
) => {
  try {
    if (auth)
      headers = {
        authorization: `Bearer ${auth.token}`,
        "Content-Type": "application/json",
        ...headers,
      };
    const response = await instance.post(url, requestData, { headers });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const FetchDataThunk = async (
  url,
  requestData = {},
  headers = {},
  auth
) => {
  // try {
  headers = {
    authorization: `Bearer ${auth.token}`,
    "Content-Type": "application/json",
    ...headers,
  };
  const response = await instance.post(url, requestData, { headers });
  return response.data;
  // } catch (error) {
  //     // console.log(error)
  //     // throw new Error(error);
  //     return
  // }
};

export const Thunk = ({ url, type, payload = {}, headers = {}, auth = {} }) =>
  createAsyncThunk(type, async (payload) => {
    return FetchDataThunk(url, payload, headers, auth);
  });

export const checkTokenValidity = (token) => {
  try {
    const decode = decodeToken(token);
    console.log("valid", checkTokenValidity(token));

    if (!decode) {
      return false; // Token is not valid
    }

    const currentTime = Date.now() / 1000; // Get current time in seconds

    if (isExpired(token) && isExpired(token) < currentTime) {
      return false; // Token is expired
    }
    console.log(decode);
    return true; // Token is valid and not expired
  } catch (error) {
    console.log("Error decoding token:", error);
    return false; // Error occurred while decoding the token
  }
};

export const BuilderHanlde = (builder, func, callback = null, err = null) =>
  builder
    .addCase(func.pending, (state) => {
      state.loading = true;
    })
    .addCase(func.fulfilled, (state, action) => {
      state.loading = false;
      if (!callback) return;
      callback(state, action);
    })
    .addCase(func.rejected, (state, action) => {
      state.loading = false;
      const { auth } = action.meta.arg;
      console.log(action);
      auth.logout();
    });

export const BuilderHanldeV2 = (builder, func, callback = null, err = null) =>
  builder
    .addCase(func.pending, (state) => {
      state.loading = true;
    })
    .addCase(func.fulfilled, (state, action) => {
      state.loading = false;
      if (!callback) return;
      callback(state, action);
    })
    .addCase(func.rejected, (state, action) => {
      state.loading = false;
      const { auth } = action.meta.arg;
      console.log(action);
      // if (
      //   action.payload.response.data?.tokenMessage &&
      //   action.payload.response.data?.tokenMessage == "Invalid token"
      // )
      //   auth.logout();
      if (err) err(state, action, auth, action.payload.response);
    });

export const BuilderHandleV3 = (builder, func, callback = null) =>
  builder
    .addCase(func.pending, (state) => {
      state.status = "loading";
    })
    .addCase(func.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.error = null;
      if (!callback) return;
      console.log(action);
      callback(null, state, action);
    })
    .addCase(func.rejected, (state, action) => {
      state.status = "failed";
      if (!callback) return;
      console.log(action);
      callback(true, state, action);
    });
// const { auth } = action.meta.arg;
// console.log(action);
// // if (
// //   action.payload.response.data?.tokenMessage &&
// //   action.payload.response.data?.tokenMessage == "Invalid token"
// // )
// //   auth.logout();
// if (err) err(state, action, auth, action.payload.response);

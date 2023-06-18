// API.js
import axios from "./../hooks/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";



export const FetchData = async (url, requestData = {}, headers = {}, auth) => {
    try {
        headers = {
            authorization: `Bearer ${auth.token}`,
            "Content-Type": "application/json",
            ...headers
        };
        const response = await axios.post(url, requestData, { headers });
        return response.data;
    } catch (error) {
        throw new Error("Error: Operation could not be completed" + error);
    }
};



export const Thunk = ({ url, type, payload = {}, headers = {}, auth = {} }) => createAsyncThunk(
    type,
    async (payload) => {
        return FetchData(url, payload, headers, auth);
    }
);


export const BuilderHanlde = (builder, func, callback) => builder
    .addCase(func.pending, (state) => {
        state.loading = true;
    })
    .addCase(func.fulfilled, (state, action) => {
        callback(state, action);
    })
    .addCase(func.rejected, (state) => {
        state.loading = false;
    });
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../config/axiosConfig";

export const getAllUsers= createAsyncThunk("user/getAllUsers",async()=>{
    const response = await axiosInstance.get("/auth/all-users")
    return response.data.data
})


export const userSlicer = createSlice({
    name: "user",
    initialState : {
        list:[]
    },
    reducers: {},
    extraReducers :(builder)=>{
        builder.addCase(getAllUsers.fulfilled,(state,action)=>{
            state.list = action.payload
        })
    }
})


//export const {hello}= userSlicer.actions
export default userSlicer.reducer
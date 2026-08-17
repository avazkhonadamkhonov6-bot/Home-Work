import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const url ='https://to-dos-api.softclub.tj/api/to-dos'
const urlI ='https://to-dos-api.softclub.tj/api/to-dos/images'

export const getData=createAsyncThunk('users/getData',async ()=>{
  try {
    let {data}=await axios.get(url)
    return data.data
  } catch (error) {
    console.error(error);
  }
})


export const deletUser=createAsyncThunk('users/deletUser',async(id,{dispatch})=>{
  try {
    await axios.delete(`${url}?id=${id}`)
    dispatch(getData())
  } catch (error) {
    console.error(error);
  }
})

export const postUser =createAsyncThunk('users/postUser',async(newUser,{dispatch})=>{
  try {
    await axios.post(url,newUser)
    dispatch(getData())
  } catch (error) {
    console.error(error);
  }
})

export const editUser =createAsyncThunk('users/editUser',async(upUser,{dispatch})=>{
  try {
    await axios.put(url,upUser)
    dispatch(getData())
  } catch (error) {
    console.error(error);
  }
})

export const addImg=createAsyncThunk(`users/addImg`,async({id,formData},{dispatch})=>{
  try {
    await axios.post(`${url}/${id}/images`,formData)
    dispatch(getData())
  } catch (error) {
    console.error(error);
  }
})

export const deletImg=createAsyncThunk(`users,/deletImg`,async (id,{dispatch})=>{
  try {
    await axios.delete(`${urlI}/${id}`)
    dispatch(getData())
  } catch (error) {
    console.error(error);
  }
})

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    data: [],
    isLoadind :false
  },
  reducers: {
  },
  extraReducers:(builder)=>{
    builder.addCase(getData.pending,(state,action)=>{
      state.isLoadind=true
    })
    .addCase(getData.fulfilled,(state,action)=>{
      state.isLoadind =false
      state.data =action.payload
    })
    .addCase(getData.rejected,(state,action)=>{
      state.isLoadind = false
    })
}


});


export const {} = usersSlice.actions;
export default usersSlice.reducer;
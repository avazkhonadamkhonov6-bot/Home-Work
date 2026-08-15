import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    data: [
      { id: 1, name: "Ibrohim", age: 12,status:false},
      { id: 2, name: "muhammad", age: 13,status:true},
      { id: 3, name: "soleh", age: 14,status:false},
      { id: 4, name: "maga", age: 15,status:true},
      { id: 5, name: "sadi", age: 16,status:false},
      { id: 6, name: "ahmad", age: 25,status:true},
      { id: 7, name: "hasan", age: 17,status:false},
      { id: 8, name: "abubakr", age: 22,status:true},
      { id: 9, name: "abdullo", age: 32,status:false},
      { id: 10, name: "sunnatullo", age: 18,status:true},
      { id: 11, name: "Murod", age: 20,status:false},
      { id: 12, name: "Alli", age: 10,status:true},
    ],
  },
  reducers: {
    deleteUser: (state, {payload}) => {
      state.data = state.data.filter((e) => e.id !== payload);
    },
    addUser: (state, {payload}) => {
      state.data.push(payload);
    },
    editUser: (state, {payload}) => {
      state.data = state.data.map((user) =>
        user.id === payload.id ? {...user,  ...payload } : user
      );
    },
  },
});


// deleetUser:(state,{payload})=>{
//   state.data=state.data.filter((e)=>e.id!==payload);
// }

export const {deleteUser,editUser,addUser} = usersSlice.actions;
export default usersSlice.reducer;
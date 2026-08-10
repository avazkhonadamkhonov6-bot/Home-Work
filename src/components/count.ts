import axios from "axios";
import { create} from "zustand";
export const url='https://69b7ccdbffbcd0286096375e.mockapi.io/users'
export const CountState = create((set,get) => ({
  Users:[],
  getUsers: async () => {
    try {
      let {data}=await axios.get(url)
      set(()=>({Users:data}))
    } catch (error) {
      console.error(error);
    }
  },
  deleteUser: async (id:number) => {
    try {
      await axios.delete(`${url}/${id}`);
      get().getUsers();
    } catch (error) {
      console.error(error);
    }
  },
  editUser: async (id, updatedData) => {
    try {
      await axios.put(`${url}/${id}`, updatedData);
      get().getUsers();
    } catch (error) {
      console.error(error);
    }
  },
  addUser:async (newUser)=>{
    try {
      await axios.post(url,newUser);
      get().getUsers();
    } catch (error) {
      console.error(error);
    }
  }
}));
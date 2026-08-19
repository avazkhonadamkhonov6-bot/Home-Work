import { editUser } from '@/store/UsersSlice';
import { create } from 'zustand';

export const useStore = create ((set,get)=>({
  data:[
    {id:1,name:"hasan"},
    {id:2,name:"ahmad"},
    {id:3,name:"muhammad"},
    {id:4,name:"bilol"},
    {id:5,name:"ibrohim"},
    {id:6,name:"murod"}
  ],
  deleteUser:(id:number)=>set((state)=>({data:state.data.filter((e)=>e.id!== id)})),

  editUser:(upUser:object)=>set((state)=>({
    data:state.data.map((e)=>e.id===upUser.id?{...e,...upUser}:e)
  })),

  addUser:(newUser:object)=>((state)=>({
    data:[...state.data,newUser]
  }))

}))
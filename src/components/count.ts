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
  deleteUser:(id:number)=>set((state)=>({data:state.data.filter((e)=>e.id!== id)}))
}))
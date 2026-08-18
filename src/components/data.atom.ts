import {  atom} from "jotai";

export const dataAtom=atom([
    {id:1,name:'ahmad',status:false,age:23},
    {id:2,name:'muhammad',status:true,age:17},
    {id:3,name:'bilol',status:true,age:19},
    {id:4,name:'nekruz',status:false,age:21},
    {id:5,name:'ali',status:true,age:14},
    {id:6,name:'ibrohim',status:false,age:16},
    {id:7,name:'solex',status:false,age:21},
    {id:8,name:'maga',status:true,age:13},
    {id:9,name:'adburahmon',status:false,age:15},
    {id:10,name:'zafar',status:true,age:24},
])

export const deleteAtom= atom(null,(get,set,id)=>{
    set(dataAtom,get(dataAtom).filter((e)=>e.id!==id))
})


export const editAtom= atom(null,(get,set,upUser)=>{
    set(dataAtom,get(dataAtom).map((e)=>e.id===upUser.id?{...e,...upUser}:e))
})

export const addUAtom=atom(null,(get,set,newUser)=>{
    set(dataAtom,[...get(dataAtom),newUser])
})
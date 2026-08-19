import axios from "axios";
import {atom} from "jotai";
import { atomWithRefresh, loadable } from "jotai/utils";

const url='https://to-dos-api.softclub.tj/api/to-dos'

export const dataAtom=atomWithRefresh(async()=>{
    try {
        let {data}= await axios.get(url)
        return data.data
    } catch (error) {
        console.error(error);
    }
})

export const loadableDataAtom=loadable(dataAtom)

export const deleteAtom=atom(null,async(get,set,id)=>{
    try {
        await axios.delete(`${url}?id=${id}`)
        set(dataAtom)
    } catch (error) {
        console.error(error);
    }
})

export const addUserAtom=atom(null,async(get,set,newUser)=>{
    try {
        await axios.post(url,newUser)
        set(dataAtom)
    } catch (error) {
        console.error(error);
    }
})

export const editUserAtom=atom(null,async(get,set,upUser)=>{
    try {
        await axios.put(url,upUser)
        set(dataAtom)
    } catch (error) {
        console.error(error);
    }
})

export const deleteImgAtom=atom(null,async(get,set,id)=>{
    try {
        await axios.delete(`${url}/images/${id}`)
        set(dataAtom)
    } catch (error) {
        console.error(error);
    }
})

export const addImg=atom(null,async(get,set,{id,formData})=>{
    try {
        await axios.post(`${url}/${id}/images`,formData)
        set(dataAtom)
    } catch (error) {
        console.error(error);
    }
})
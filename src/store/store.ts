import { configureStore } from '@reduxjs/toolkit'
import  UsersSlice  from './UsersSlice'
export default configureStore({
  reducer: {
   users:UsersSlice 
  }
})
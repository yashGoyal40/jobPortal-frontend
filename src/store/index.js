import {configureStore} from  "@reduxjs/toolkit"
import jobSlice from "./jobSlice";
import userSlice from "./userSlice";

const myStore = configureStore({
  reducer:{
    user:userSlice,
    jobs:jobSlice
  }
})

export default myStore;


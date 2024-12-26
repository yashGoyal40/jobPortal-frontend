import {configureStore} from  "@reduxjs/toolkit"
import jobSlice from "./jobSlice";
import userSlice from "./userSlice";
import applicationSlice from "./applicationSlice";

const myStore = configureStore({
  reducer:{
    user:userSlice,
    jobs:jobSlice,
    applications:applicationSlice
  }
})

export default myStore;


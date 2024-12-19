import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  jobs: [],
  loading: false,
  error: null,
  message: null,
  singleJob: {},
  myJobs: [],
};

const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    requestForAllJobs(state, action) {
      state.loading = true;
      state.error = false;
    },
    successForAllJobs(state, action) {
      state.loading = false;
      state.jobs = action.payload;
      state.error = null;
    },
    failedForAllJobs(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    clearAllErrors(state, action) {
      state.error = null;
      state.jobs = state.jobs;
    },
    resetJobSlice(state, action) {
      state.error = null;
      state.jobs = state.jobs;
      state.loading = false;
      state.message = null
      state.myJobs = state.myJobs
      state.singleJob ={}
    },
    clearMessage(state,message){
      state.message = null,
      state.jobs = state.jobs;
    }
  },
});


export const fetchJobs = (place,niche,workType,searchKeyword="") => async(dispatch)=>{
  try{
    dispatch(jobSlice.actions.requestForAllJobs())
    let link = `${import.meta.env.VITE_API_URL}/api/v1/job/getall?`
    let queryParams = []
    if(searchKeyword){
      queryParams.push(`searchKeyword=${searchKeyword}`)
    }
    if(place){
      queryParams.push(`location=${place}`)
    }
    if(niche){
      queryParams.push(`niche=${niche}`)
    }
    if(workType){
      queryParams.push(`workType=${workType}`)
    }

    link += queryParams.join("&")
    
    const response = await axios.get(link,{withCredentials:true})
    dispatch(jobSlice.actions.successForAllJobs(response.data.jobs))
    dispatch(jobSlice.actions.clearAllErrors())

  }
  catch(error){
    dispatch(jobSlice.actions.failedForAllJobs(error.response.data.message))
  }

}

export const clearAllJObErrors = () =>(dispatch)=>{
  dispatch(jobSlice.actions.clearAllErrors())
}

export const clearAllJobMessage = () =>(dispatch) =>{
  dispatch(jobSlice.actions.clearMessage())
}

export const resetJobSlice = () =>(dispatch)=>{
  dispatch(jobSlice.actions.resetJobSlice())
}

export default jobSlice.reducer
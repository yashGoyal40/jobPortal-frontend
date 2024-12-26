import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  MyApplications: [],
  error: null,
  message: null,
  singleApplication: {},
};

const applicationSlice = createSlice({
  name: "applications",
  initialState,
  reducers: {
    ApplyForJob(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
      state.singleApplication = {};
    },
    ApplyForJobSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload.message;
      state.singleApplication = action.payload.application;
    },
    ApplyForJobFail(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
      state.singleApplication = {};
    },
    EmployeGetAllRequest(state, action) {
      state.loading = true;
      state.message = null;
      state.error = null;
      state.MyApplications = [];
    },
    EmployeGetAllSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
      state.error = null;
      state.MyApplications = action.payload.applications;
    },
    EmployeGetAllFail(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.MyApplications = [];
    },
    deleteJobRequest(state, action) {
      state.loading = true;
      state.message = null;
      state.error = null;
    },
    deleteJobSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
      state.error = null;
    },
    deleteJobFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    deleteAllApplicationErrorsAndMessages(state) {
      state.error = null;
      state.message = null;
    },
    employeeGetApplication(state){
      state.loading =true
      state.message =null
      state.error = null
      state.singleApplication = {}
    },
    employeeGetApplicationSuccess(state,action){
      state.loading =false
      state.message = action.payload.message
      state.singleApplication = action.payload.application
      state.error =null
    },
    employeeGetApplicationFail(state,action){
      state.loading =false
      state.error = action.payload
      state.singleApplication = {}
    },
    employerGetAll(state,action){
      state.loading = true
      state.error = null
      state.message = null
      state.MyApplications = []
    },
    employerGetAllSuccess(state,action){
      state.loading = false
      state.error = false
      state.message = action.payload.message
      state.MyApplications = action.payload.applications
    },
    employerGetAllFail(state,action){
      state.loading = false
      state.error = action.payload
      state.MyApplications = []
    },
    approveApplication(state,action){
      state.loading = true
      state.error = null
      state.message = null
    },
    approveApplicationSuccess(state,action){
      state.loading = false
      state.error =null
      state.message = action.payload.message
    },
    approveApplicationFail(state,action){
      state.loading = false
      state.error = action.payload
    }
  },
});

export const ApplyAJob = (data, jobId) => async (dispatch) => {
  dispatch(applicationSlice.actions.ApplyForJob());
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/v1/application/apply/${jobId}`,
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    dispatch(applicationSlice.actions.ApplyForJobSuccess(response.data));
  } catch (error) {
    dispatch(
      applicationSlice.actions.ApplyForJobFail(error.response.data.message)
    );
  }
};

export const FetchEmployeeApplications = () => async (dispatch) => {
  dispatch(applicationSlice.actions.EmployeGetAllRequest());
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/v1/application/jobseeker/getall`,
      {
        withCredentials: true,
      }
    );
    dispatch(applicationSlice.actions.EmployeGetAllSuccess(response.data));
  } catch (error) {
    dispatch(
      applicationSlice.actions.EmployeGetAllFail(error.response.data.message)
    );
  }
};

export const fetchEmployeeSingleApplication = (data) => async (dispatch) => {
  dispatch(applicationSlice.actions.employeeGetApplication())
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/v1/application/jobseeker/get/application/${data}`,
      {
        withCredentials: true,
      }
    );
    dispatch(applicationSlice.actions.employeeGetApplicationSuccess(response.data));
  } catch (error) {
    dispatch(
      applicationSlice.actions.employeeGetApplicationFail(error.response.data.message)
    );
  }
}

export const fetchEmployerApplication = (data) => async (dispatch) => {
  dispatch(applicationSlice.actions.employerGetAll())
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/v1/application/employer/getall/${data}`,
      {
        withCredentials: true,
      }
    );
    dispatch(applicationSlice.actions.employerGetAllSuccess(response.data));
  } catch (error) {
    dispatch(
      applicationSlice.actions.employerGetAllFail(error.response.data.message)
    );
  }
}

export const deleteAnApplication = (data) => async (dispatch) => {
  dispatch(applicationSlice.actions.deleteJobRequest());
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/v1/application/delete/${data}`,
      {
        withCredentials: true,
      }
    );
    dispatch(applicationSlice.actions.deleteJobSuccess(response.data));
  } catch (error) {
    dispatch(
      applicationSlice.actions.deleteJobFailure(error.response.data.message)
    );
  }
};

export const acceptApplication = (data) => async (dispatch) =>{
  dispatch(applicationSlice.actions.approveApplication())
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/v1/application/approve/${data}`,{},
      {
        withCredentials: true,
        
      }
    );
    dispatch(applicationSlice.actions.approveApplicationSuccess(response.data));
  } catch (error) {
    dispatch(
      applicationSlice.actions.approveApplicationFail(error.response.data.message)
    );
  }
} 

export const resetApplicationSlice = () => async (dispatch) => {
  dispatch(applicationSlice.actions.deleteAllApplicationErrorsAndMessages());
};

export default applicationSlice.reducer;

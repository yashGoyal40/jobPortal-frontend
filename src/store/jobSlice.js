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
      state.jobs = [];
      state.loading = false;
      state.message = null;
      state.myJobs = [];
      state.singleJob = {};
    },
    clearMessage(state, message) {
      (state.message = null), (state.jobs = state.jobs);
    },
    getAjob(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
      state.singleJob = {};
    },
    getAjobSuccess(state, action) {
      state.loading = false;
      state.singleJob = action.payload.job;
      state.message = action.payload.message;
      state.error = null;
    },
    getAjobFail(state, action) {
      state.loading = false;
      state.singleJob = {};
      state.error = action.payload;
    },
    getMyJobs(state, action) {
      state.loading = false;
      state.error = null;
      state.message = null;
      state.myJobs = [];
    },
    getMyJobsSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload.message;
      state.myJobs = action.payload.myJobs;
    },
    getMyJobsFail(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.myJobs = [];
    },
    deleteJob(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    deleteJobSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload.message;
    },
    deleteJobFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    postAJob(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    postAJobSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
    },
    postAJobFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const fetchJobs =
  (place, niche, workType, searchKeyword = "") =>
  async (dispatch) => {
    try {
      dispatch(jobSlice.actions.requestForAllJobs());
      let link = `${import.meta.env.VITE_API_URL}/api/v1/job/getall?`;
      let queryParams = [];
      if (searchKeyword) {
        queryParams.push(`searchKeyword=${searchKeyword}`);
      }
      if (place) {
        queryParams.push(`location=${place}`);
      }
      if (niche) {
        queryParams.push(`niche=${niche}`);
      }
      if (workType) {
        queryParams.push(`workType=${workType}`);
      }

      link += queryParams.join("&");

      const response = await axios.get(link, { withCredentials: true });
      dispatch(jobSlice.actions.successForAllJobs(response.data.jobs));
      dispatch(jobSlice.actions.clearAllErrors());
    } catch (error) {
      dispatch(jobSlice.actions.failedForAllJobs(error.response.data.message));
    }
  };

export const singleJob = (data) => async (dispatch) => {
  dispatch(jobSlice.actions.getAjob());
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/v1/job/get/${data}`,
      { withCredentials: true }
    );
    dispatch(jobSlice.actions.getAjobSuccess(response.data));
  } catch (error) {
    dispatch(jobSlice.actions.getAjobFail(error.response.data.message));
  }
};

export const fetchMyJobs = () => async (dispatch) => {
  dispatch(jobSlice.actions.getMyJobs());
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/v1/job/getmyjobs`,
      { withCredentials: true }
    );
    dispatch(jobSlice.actions.getMyJobsSuccess(response.data));
  } catch (error) {
    dispatch(jobSlice.actions.getMyJobsFail(error.response.data.message));
  }
};

export const deleteJob = (data) => async (dispatch) => {
  dispatch(jobSlice.actions.deleteJob());
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/v1/job/delete/${data}`,
      { withCredentials: true }
    );
    dispatch(jobSlice.actions.deleteJobSuccess(response.data));
  } catch (error) {
    dispatch(jobSlice.actions.deleteJobFail(error.response.data.message));
  }
};

export const PostJob = (data) => async (dispatch) => {
  dispatch(jobSlice.actions.postAJob());
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/v1/job/post`,
      data,
      { withCredentials: true, headers: { "Content-Type": "application/json" } }
    );
    dispatch(jobSlice.actions.postAJobSuccess(response.data));
  } catch (error) {
    dispatch(jobSlice.actions.postAJobFail(error.response.data.message));
  }
};

export const clearAllJObErrors = () => (dispatch) => {
  dispatch(jobSlice.actions.clearAllErrors());
};

export const clearAllJobMessage = () => (dispatch) => {
  dispatch(jobSlice.actions.clearMessage());
};

export const resetJobSlice = () => (dispatch) => {
  dispatch(jobSlice.actions.resetJobSlice());
};

export default jobSlice.reducer;

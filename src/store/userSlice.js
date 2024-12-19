import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { data } from "react-router";

const initialState = {
  loading: false,
  isAuthenticated: false,
  isVerified: false,
  user: {},
  error: null,
  message: null,
  otpSent: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    registerRequest(state, action) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
      state.message = null;
    },
    registerSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.error = null;
      state.message = action.payload.message;
    },
    registerFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = action.payload;
      state.message = null;
    },
    verificationRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    verificationSuccess(state, action) {
      state.isVerified = true;
      state.user = action.payload.user;
      state.message = action.payload.message;
      state.error = null;
      state.loading = false
    },
    VerificationFailed(state, action) {
      state.isVerified = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = action.payload;
    },
    clearAllErrors(state, action) {
      state.error = null;
      state.user = state.user;
    },
    logoutUser(state, action) {
      state.loading = true;
      state.user = state.user;
      state.message = null;
      state.error = null;
    },
    logoutSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.message = action.payload;
      state.isVerified = false;
    },
    logoutFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = state.isAuthenticated;
      state.user = state.user;
      state.error = action.payload;
    },
    fetchUser(state, action) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
      state.message = null;
    },
    fetchUserSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.isVerified = action.payload.User.isVerified;
      state.user = action.payload.User;
      state.error = null;
    },
    fetchUserFail(state, action) {
      state.loading = false;
      state.isAuthenticated = state.isAuthenticated;
      state.user = {};
      state.error = action.payload;
    },
    loginUser(state, action) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
      state.message = null;
      state.error = null;
    },
    loginUserSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.isVerified = action.payload.user.isVerified;
      state.user = action.payload.user;
      state.error = null;
      state.message = action.payload.message;
    },
    loginUserFail(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.user = {};
      state.isAuthenticated = false;
    },
    forgotPasswordRequest(state, action) {
      state.loading = true;
      state.message = null;
      state.otpSent = false;
      state.error = null;
    },
    forgotPasswordSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
      state.otpSent = true;
      state.error = null;
    },
    forgotPasswordfail(state, action) {
      state.loading = false;
      state.otpSent = false;
      state.error = action.payload;
    },
    passReset(state, action) {
      state.loading = true;
      state.message = null;
      state.otpSent = false;
      state.error = null;
    },
    passResetSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.isVerified = action.payload.user.isVerified;
      state.error = null;
    },
    passResetFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    updateUser(state, action) {
      state.message = null;
      state.error = null;
      state.loading = true;
    },
    updateUserSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload.message;
      state.user = action.payload.user;
    },
    updateUserFalied(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.user = state.user;
    },
    updatePassword(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    updatePasswordSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload.message;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.isVerified = action.payload.user.isVerified;
    },
    updatePasswordFail(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
      state.user = state.user;
      state.isAuthenticated = state.isAuthenticated;
      state.isVerified = state.isVerified;
    },
    deleteUser(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    deleUserSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
      state.isAuthenticated = false;
      state.isVerified = false;
      state.user = {};
    },
    deleteUserFail(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = state.isAuthenticated;
      state.isVerified = state.isVerified;
      state.user = state.user;
    },
  },
});

export const register = (data) => async (dispatch) => {
  dispatch(userSlice.actions.registerRequest());
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/v1/user/register`,
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    dispatch(userSlice.actions.registerSuccess(response.data));
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(userSlice.actions.registerFailed(error.response.data.message));
  }
};

export const verify = (data) => async (dispatch) => {
  dispatch(userSlice.actions.verificationRequest());
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/v1/user/verify`,
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch(userSlice.actions.verificationSuccess(response.data));
  } catch (error) {
    dispatch(userSlice.actions.VerificationFailed(error.response.data.message));
  }
};

export const logout = () => async (dispatch) => {
  dispatch(userSlice.actions.logoutUser());
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/v1/user/logout`,
      { withCredentials: true }
    );
    dispatch(userSlice.actions.logoutSuccess(response.data.message));
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(userSlice.actions.logoutFailed(error.response.data.message));
  }
};

export const fetchUser = () => async (dispatch) => {
  dispatch(userSlice.actions.fetchUser());
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/v1/user/getUser`,
      { withCredentials: true }
    );
    dispatch(userSlice.actions.fetchUserSuccess(response.data));
  } catch (error) {
    dispatch(userSlice.actions.fetchUserFail(error.response.data.message));
  }
};

export const login = (data) => async (dispatch) => {
  dispatch(userSlice.actions.loginUser());
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/v1/user/login`,
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch(userSlice.actions.loginUserSuccess(response.data));
  } catch (error) {
    dispatch(userSlice.actions.loginUserFail(error.response.data.message));
  }
};

export const forgotpassReq = (data) => async (dispatch) => {
  dispatch(userSlice.actions.forgotPasswordRequest());
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/v1/user/forgotpass/requst`,
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch(userSlice.actions.forgotPasswordSuccess(response.data));
  } catch (error) {
    dispatch(userSlice.actions.forgotPasswordfail(error.response.data.message));
  }
};

export const forgotpassReset = (data) => async (dispatch) => {
  dispatch(userSlice.actions.passReset());
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/v1/user/forgotpass/changepass`,
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch(userSlice.actions.passResetSuccess(response.data));
  } catch (error) {
    dispatch(userSlice.actions.passResetFail(error.response.data.message));
  }
};

export const updatePassword = (data) => async (dispatch) => {
  dispatch(userSlice.actions.updatePassword());
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/v1/user/update/password`,
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch(userSlice.actions.updatePasswordSuccess(response.data));
  } catch (error) {
    dispatch(userSlice.actions.updatePasswordFail(error.response.data.message));
  }
};

export const updateUser = (data) => async (dispatch) => {
  dispatch(userSlice.actions.updateUser());
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/v1/user/update/profile`,
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    dispatch(userSlice.actions.updateUserSuccess(response.data));
  } catch (error) {
    dispatch(userSlice.actions.updateUserFalied(error.response.data.message));
  }
};

export const deleteUser = () => async (dispatch) => {
  dispatch(userSlice.actions.deleteUser());
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/v1/user/delete`,
      {
        withCredentials: true,
      }
    );
    dispatch(userSlice.actions.deleUserSuccess(response.data));
  } catch (error) {
    dispatch(userSlice.actions.deleteUserFail(error.response.data.message));
  }
};

export const clearAllUserErrors = () => (dispatch) => {
  dispatch(userSlice.actions.clearAllErrors());
};

export default userSlice.reducer;

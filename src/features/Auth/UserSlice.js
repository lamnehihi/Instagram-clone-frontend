import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";
import { LOADING_UI, SET_ERRORS, LOADING_DONE } from "./UiSlice";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const initialState = {
  authenticated: false,
  credentials: {},
  likes: [],
  notifications: [],
  screams: [],
};

export const setAuthorizationHeader = (token) => {
  const FBToken = `Bearer ${token}`;
  localStorage.setItem("FBIdToken", FBToken);
  Axios.defaults.headers.common["Authorization"] = FBToken;
};

export const SET_AUTHENTICATED_LOGIN = createAsyncThunk(
  "users/authenticated_login",
  async (action, thunkApi) => {
    const userData = action.user;
    const dispatch = thunkApi.dispatch;
    dispatch(LOADING_UI());

    try {
      const res = await Axios.post("auth/login", userData);
      setAuthorizationHeader(res.data.token);
    } catch (error) {
      console.log("error", error.response.data);
      dispatch(SET_ERRORS(error.response.data));
    }
    dispatch(SET_LOGIN());
    action.history.push('/');
  }
);

export const SET_AUTHENTICATED_SIGNUP = createAsyncThunk(
  "users/authenticated_signup",
  async (action, thunkApi) => {
    const userData = action.user;
    const dispatch = thunkApi.dispatch;
    dispatch(LOADING_UI());

    try {
      const res = await Axios.post("auth/signup", userData);
      setAuthorizationHeader(res.data.token);
    } catch (error) {
      console.log("error", error.response.data);
      dispatch(SET_ERRORS(error.response.data));
    }
    dispatch(SET_LOGIN());
    action.history.push('/');
  }
);

export const SET_LOGOUT = createAsyncThunk(
  "users/set_logout",
  async (action, thunkApi) => {
    const dispatch = thunkApi.dispatch;
    console.log("set logout")
    dispatch(SET_UNAUTHENTICATED());
    localStorage.removeItem("FBIdToken");
    delete Axios.defaults.headers.common["Authorization"];
  }
);

export const SET_LOGIN = createAsyncThunk(
  "users/set_login",
  async (action, thunkApi) => {
    console.log("set login")
    const dispatch = thunkApi.dispatch;
    const res = await Axios.get("/user");
    dispatch(SET_USER(res.data));
    dispatch(LOADING_DONE());
  }
);

const user = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    SET_UNAUTHENTICATED: (state, action) => {
      return initialState;
    },
    SET_USER: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
  extraReducers: {
    [SET_LOGIN.fulfilled]: (state, action) => {
      state.authenticated = true;
    },
  },
});

const { reducer, actions } = user;
export const { SET_USER, SET_UNAUTHENTICATED } = actions;
export default reducer;

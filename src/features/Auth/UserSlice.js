import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";
import { LOADING_UI, SET_ERRORS } from "./UiSlice";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const initialState = {
  authenticated: false,
  credentials: {},
  likes: [],
  notifications: [],
};

export const SET_AUTHENTICATED = createAsyncThunk('users/fetchByIdStatus',
async (action, thunkApi) => {
  console.log("action", action);
  const userData = action.user;
  const dispatch = thunkApi.dispatch;
  dispatch(LOADING_UI());

  console.log("userData", userData);
  try {
    const res = await Axios.post("auth/login", userData);
    const FBToken = `Bearer ${res.data.token}`;
    localStorage.setItem("FBIdToken", FBToken);
    Axios.defaults.headers.common["Authorization"] = FBToken;
  } catch (error) {
    console.log("error", error.response.data);
    dispatch(SET_ERRORS(error.response.data));
  }
  const res = await Axios.get("/user");
  dispatch(SET_USER(res.data));
  const history = action.history;
  history.push('/');
})

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
        ...action.payload
      }
    }
  },
  extraReducers: {
    [SET_AUTHENTICATED.fulfilled]: (state, action) => {
      state.authenticated = true;
    }
  }
});

const { reducer, actions } = user;
export const {  SET_USER, SET_UNAUTHENTICATED } = actions;
export default reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";
import { LOADING_UI, SET_ERRORS } from "./UiSlice";

const initialState = {
  
};

export const SET_AUTHENTICATED_LOGIN = createAsyncThunk(
  "users/authenticated_login",
  async (action, thunkApi) => {
    const userData = action.user;
    const dispatch = thunkApi.dispatch;
    dispatch(LOADING_UI());

    try {
      const res = await Axios.post("auth/login", userData);
      //setAuthorizationHeader(res.data.token);
    } catch (error) {
      console.log("error", error.response.data);
      dispatch(SET_ERRORS(error.response.data));
    }
    //dispatch(SET_LOGIN());
    action.history.push('/');
  }
);

const screams = createSlice({
  name: "screams",
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
    [SET_AUTHENTICATED_LOGIN.fulfilled]: (state, action) => {
      state.authenticated = true;
    },
  },
});

const { reducer, actions } = screams;
export const { SET_USER, SET_UNAUTHENTICATED } = actions;
export default reducer;

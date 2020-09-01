import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";
import { LOADING_UI, SET_ERRORS, LOADING_DONE } from "./UiSlice";

const initialState = {
  authenticated: false,
  credentials: {},
  likes: [],
  notifications: [],
  screams: [],
  showNoti: true,
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
      return
    }
    dispatch(SET_LOGIN());
    action.history.push("/");
  }
);

export const SET_AUTHENTICATED_SIGNUP = createAsyncThunk(
  "users/authenticated_signup",
  async (action, thunkApi) => {
    const userData = action.user;
    console.log("user sign up", userData);
    const dispatch = thunkApi.dispatch;
    dispatch(LOADING_UI());

    try {
      const res = await Axios.post("auth/signup", userData);
      setAuthorizationHeader(res.data.token);
    } catch (error) {
      console.log("error", error.response.data);
      dispatch(SET_ERRORS(error.response.data));
      return
    }
    dispatch(SET_LOGIN());
    action.history.push("/");
  }
);

export const SET_LOGOUT = createAsyncThunk(
  "users/set_logout",
  async (action, thunkApi) => {
    const dispatch = thunkApi.dispatch;
    console.log("set logout");
    dispatch(SET_UNAUTHENTICATED());
    localStorage.removeItem("FBIdToken");
    delete Axios.defaults.headers.common["Authorization"];
  }
);

//set user info
export const SET_LOGIN = createAsyncThunk(
  "users/set_login",
  async (action, thunkApi) => {
    console.log("set login");
    const dispatch = thunkApi.dispatch;
    const res = await Axios.get("/user");
    dispatch(LOADING_DONE());
    setTimeout(() => {
      dispatch(TURN_OFF_NOTI());
    }, 9000);
    return(res.data);
  }
);

//set user info
export const MARK_NOTI_READ = createAsyncThunk(
  "users/set_noti_read",
  async (action, thunkApi) => {
    const res = await Axios.post("/user/notifications", action);
    return action;
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
    SET_LIKE_USER: (state, action) => {
      state.likes.push(action.payload);
    },
    SET_UNLIKE_USER: (state, action) => {
      const screamId = action.payload;
      return {
        ...state,
        likes: state.likes.filter((like) => like.screamId !== screamId),
      };
    },
    TURN_OFF_NOTI: (state, action) => {
      return {
        ...state,
        showNoti: false,
      }
    }
  },
  extraReducers: {
    [SET_LOGIN.fulfilled]: (state, action) => {
      return {
        ...state,
        ...action.payload,
        authenticated : true,
      };
    },
    [MARK_NOTI_READ.fulfilled]: (state, action) => {
      state.notifications.forEach(noti => noti.read = true);
    }
  },
});

const { reducer, actions } = user;
export const {
  SET_USER,
  SET_UNAUTHENTICATED,
  SET_LIKE_USER,
  SET_UNLIKE_USER,
  TURN_OFF_NOTI,
} = actions;
export default reducer;

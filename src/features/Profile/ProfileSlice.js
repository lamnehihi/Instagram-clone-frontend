import Axios from "axios";
import { SET_LOGIN } from "features/Auth/UserSlice";
import { SET_ERRORS } from "features/Auth/UiSlice";

const { createAsyncThunk, createSlice } = require("@reduxjs/toolkit");

const initialState = {
  website: "",
  email: "",
  imageUrl: "",
  handle: "",
  bio: "",
  location: "",
  userId: "",
  createdAt: "",
  screams: [],
};

export const EDIT_AVATAR = createAsyncThunk(
  "profile/avatar",
  async (action, thunkAPI) => {
    try {
      const FBToken = localStorage.getItem("FBIdToken");
      Axios.defaults.headers.common["Authorization"] = FBToken;
      const formData = action;
      console.log(formData);

      Axios.defaults.baseURL =
        "https://asia-east2-socialape-fb7db.cloudfunctions.net/api";
      //await Axios.post("user/uploadImg", formData);
      console.log("form data", formData);
      const { dispatch } = thunkAPI;
      //dispatch(SET_LOGIN());
    } catch (error) {
      console.log(error);
    }
  }
);

export const EDIT_PROFILE = createAsyncThunk(
  "profile/",
  async (action, thunkAPI) => {
    try {
      const FBToken = localStorage.getItem("FBIdToken");
      Axios.defaults.headers.common["Authorization"] = FBToken;
      const userData = action;
      console.log(userData);

      Axios.defaults.baseURL =
        "https://asia-east2-socialape-fb7db.cloudfunctions.net/api";
      const res = await Axios.post("user/", userData);
      const { dispatch } = thunkAPI;
      dispatch(SET_LOGIN());
    } catch (error) {
      console.log("error", error.response.data);
      thunkAPI.dispatch(SET_ERRORS(error.response.data));
    }
  }
);

export const GET_VISIT_USER = createAsyncThunk(
  "profile/visitUser",
  async (action, thunkAPI) => {
    try {
      const userHandle = action;
      console.log("userHandle", userHandle);


      Axios.defaults.baseURL =
        "https://asia-east2-socialape-fb7db.cloudfunctions.net/api";
      const res = await Axios.get(`user/${userHandle}`);
      console.log("visit user", res.data);
      thunkAPI.dispatch(SET_VISIT_USER(res.data));
    } catch (error) {
      console.log("error", error.response.data);
      thunkAPI.dispatch(SET_ERRORS(error.response.data));
    }
  }
);

const profile = createSlice({
  name: 'profile',
  initialState: initialState,
  reducers: {
    SET_VISIT_USER: (state, action) => {
      return {
        ...state,
        ...action.payload
      }
    }
  },
})

const { reducer, actions } = profile;
export const { SET_VISIT_USER } = actions;
export default reducer;

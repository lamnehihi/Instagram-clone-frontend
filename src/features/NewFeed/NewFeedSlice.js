import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";
import { SET_ERRORS } from "features/Auth/UiSlice";
import { ADD_USER_SCREAM } from "features/Auth/UserSlice";


const initialScreams = [];

export const SET_LIKE_SCREAM = createAsyncThunk(
  "scream/like",
  async (action, thunkAPI) => {
    try {
      const newLike = action;
      console.log("newLike", newLike);

      Axios.defaults.baseURL =
        "https://asia-east2-socialape-fb7db.cloudfunctions.net/api";
      const res = await Axios.post(`scream/${newLike.screamId}/like`, newLike);
      return newLike;
    } catch (error) {
      console.log("error", error.response.data);
      thunkAPI.dispatch(SET_ERRORS(error.response.data));
    }
  }
)

export const SET_UNLIKE_SCREAM = createAsyncThunk(
  "scream/unlike",
  async (action, thunkAPI) => {
    try {
      const screamId = action;

      Axios.defaults.baseURL =
        "https://asia-east2-socialape-fb7db.cloudfunctions.net/api";
      const res = await Axios.post(`scream/${screamId}/unlike`);
      return screamId;
    } catch (error) {
      console.log("error", error.response.data);
      thunkAPI.dispatch(SET_ERRORS(error.response.data));
    }
  }
)

export const FLETCH_SCREAMS = createAsyncThunk(
  "screams",
  async (action, thunkAPI) => {
    try {
      Axios.defaults.baseURL =
        "https://asia-east2-socialape-fb7db.cloudfunctions.net/api";
      const res = await Axios.get('/scream');
      return res.data;
    } catch (error) {
      console.log("error", error.response.data);
      thunkAPI.dispatch(SET_ERRORS(error.response.data));
    }
  }
)

export const DELETE_SCREAMS = createAsyncThunk(
  "screams/delete",
  async (action, thunkAPI) => {
    try {
      const FBToken = localStorage.getItem("FBIdToken");
      Axios.defaults.headers.common["Authorization"] = FBToken;

      Axios.defaults.baseURL =
      "https://asia-east2-socialape-fb7db.cloudfunctions.net/api";
      const screamId = action;
      const res = await Axios.delete(`scream/${screamId}`);
      return screamId;
    } catch (error) {
      console.log("error", error.response.data);
      thunkAPI.dispatch(SET_ERRORS(error.response.data));
    }
  }
)

export const POST_SCREAM = createAsyncThunk(
  "screams/post",
  async (action, thunkAPI) => {
    try {
      const FBToken = localStorage.getItem("FBIdToken");
      Axios.defaults.headers.common["Authorization"] = FBToken;

      Axios.defaults.baseURL =
      "https://asia-east2-socialape-fb7db.cloudfunctions.net/api";
      const formData = action;
      const res = await Axios.post('scream/', formData);
      console.log("res data", res.data);
      thunkAPI.dispatch(ADD_SCREAM(res.data));
      thunkAPI.dispatch(ADD_USER_SCREAM(res.data));
      return res.data;
    } catch (error) {
      console.log("error", error.response.data);
      thunkAPI.dispatch(SET_ERRORS(error.response.data));
    }
  }
)

const newFeed = createSlice({
  name: "newFeed",
  initialState: initialScreams,
  reducers: {
    ADD_SCREAM: (state, action) => {
      state.unshift(action.payload);
    }
  },
  extraReducers: {
    [SET_LIKE_SCREAM.fulfilled] : (state, action) => {
      const screamIndex = state.findIndex(scream => {
        return scream.screamId === action.payload.screamId
        })
      state[screamIndex].likeCount += 1;
    },
    [SET_UNLIKE_SCREAM.fulfilled] : (state, action) => {
      const screamIndex = state.findIndex(scream => {
        return scream.screamId === action.payload
        })
      state[screamIndex].likeCount -= 1;
    },
    [DELETE_SCREAMS.fulfilled] : (state, action) => {
      const screamId = action.payload;
      return state.filter(scream => scream.screamId !== screamId);
    },
    [FLETCH_SCREAMS.fulfilled]: (state, action) => {
      console.log("action", action.payload);
      return state = [...action.payload];
    }
  }
})

const {reducer, actions} = newFeed;
export const { FLETCH, ADD_SCREAM } = actions;
export default reducer;
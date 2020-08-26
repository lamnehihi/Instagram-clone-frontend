import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useEffect } from "react";
import screamApi from "api/screamApi";
import Axios from "axios";
import { SET_ERRORS } from "features/Auth/UiSlice";
import { SET_LOGIN } from "features/Auth/UserSlice";

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
      thunkAPI.dispatch(FLETCH(res.data));
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
    FLETCH: (state, action) => {
      console.log("action", action.payload);
      return state = [...action.payload];
    },
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
  }
})

const {reducer, actions} = newFeed;
export const { FLETCH } = actions;
export default reducer;
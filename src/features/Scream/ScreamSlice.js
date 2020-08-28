import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useEffect } from "react";
import screamApi from "api/screamApi";
import Axios from "axios";
import { SET_ERRORS } from "features/Auth/UiSlice";
import { SET_LOGIN } from "features/Auth/UserSlice";

const initialScream = {
  userHandle: '',
  commentCount: 0,
  likeCount: 0,
  createAt: "",
  body: "",
  userImage: "",
  screamId: "",
  comments: [],
};

export const GET_SCREAM = createAsyncThunk(
  "scream/getDetails",
  async (action, thunkAPI) => {
    try {
      const FBToken = localStorage.getItem("FBIdToken");
      Axios.defaults.headers.common["Authorization"] = FBToken;

      Axios.defaults.baseURL =
      "https://asia-east2-socialape-fb7db.cloudfunctions.net/api";

      const screamId = action;
      const res = await Axios.get(`scream/${screamId}`);
      console.log("scream detail", res.data);
      return res.data;
    } catch (error) {
      console.log("error get scream details", error.response.data);
      thunkAPI.dispatch(SET_ERRORS(error.response.data));
    }
  }
)

export const POST_COMMENT = createAsyncThunk(
  "scream/postComment",
  async (action, thunkAPI) => {
    try {
      const FBToken = localStorage.getItem("FBIdToken");
      Axios.defaults.headers.common["Authorization"] = FBToken;

      Axios.defaults.baseURL =
      "https://asia-east2-socialape-fb7db.cloudfunctions.net/api";
      const {body: newComment, screamId} = action;
      const res = await Axios.post(`scream/${screamId}/comment`, newComment);
      return res.data;
    } catch (error) {
      console.log("error get scream details", error.response.data);
      thunkAPI.dispatch(SET_ERRORS(error.response.data));
    }
  }
)

const Scream = createSlice({
  name: "Scream",
  initialState: initialScream,
  reducers: {
    LIKE: (state, action) => {
      return {
        ...state,
        likeCount : state.likeCount + 1,
      }
    },
    UNLIKE: (state, action) => {
      return {
        ...state,
        likeCount : state.likeCount - 1,
      }
    },
    
  },
  extraReducers: {
    [GET_SCREAM.fulfilled] : (state, action) => {
      return {...action.payload}
    },
    [POST_COMMENT.fulfilled] : (state, action) => {
      const newComment = {...action.payload.newComment};
      console.log("comment detail", newComment);
      state.comments.push(newComment);
    },
  }
})

const {reducer, actions} = Scream;
export const { LIKE, UNLIKE } = actions;
export default reducer;
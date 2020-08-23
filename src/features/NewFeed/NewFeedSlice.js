import { createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";
import screamApi from "api/screamApi";

const initialScreams = [];

const newFeed = createSlice({
  name: "newFeed",
  initialState: initialScreams,
  reducers: {
    FLETCH: (state, action) => {
      console.log("action", action.payload);
      return state = [...action.payload];
    },
  }
})

const {reducer, actions} = newFeed;
export const { FLETCH } = actions;
export default reducer;
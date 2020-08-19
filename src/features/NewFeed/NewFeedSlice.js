import { createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";
import screamApi from "api/screamApi";

const initialScreams = [];

const newFeed = createSlice({
  name: "newFeed",
  initialState: initialScreams,
  reducers: {
    fletch: (state, action) => {
      console.log("action", action.payload);
      return state = [...action.payload];
    },
    like: (state, action) => {
      
    }

  }
})

const {reducer, actions} = newFeed;
export const { fletch } = actions;
export default reducer;
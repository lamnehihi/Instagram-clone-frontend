import { createSlice } from "@reduxjs/toolkit";
import { hottestPeople } from "assets/images/hottestPeople";

const initialScreams = [];

const hottest = createSlice({
  name: "hottest",
  initialState: initialScreams,
  reducers: {
    FLETCH_HOTTEST: (state, action) => {
      const hottest = hottestPeople.sort(() => 0.5 - Math.random());
      return state = [...hottest];
    }
  },
  extraReducers: {
  }
})

const {reducer, actions} = hottest;
export const { FLETCH_HOTTEST } = actions;
export default reducer;
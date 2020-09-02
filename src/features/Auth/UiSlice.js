import { findAllByTestId } from "@testing-library/react";

const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  loading: false,
  errors: {},
  loadingNewFeed: false,
};

const ui = createSlice({
  name: "ui",
  initialState: initialState,
  reducers: {
    LOADING_UI: (state, action) => {
      state.loading = true;
    },
    LOADING_NEW_FEED: (state, action) => {
      state.loadingNewFeed = true;
    },
    LOADING_NEW_FEED_DONE: (state, action) => {
      state.loadingNewFeed = false;
    },
    SET_ERRORS: (state, action) => {
      state.errors = action.payload;
      state.loading = false;
    },
    CLEAR_ERROR: (state, action) => {
      state.errors = null;
      state.loading = false;
    },
    LOADING_DONE: (state, action) => {
      state.loading = false;
    },
  },
});

const { reducer, actions } = ui;
export const {
  LOADING_UI,
  LOADING_NEW_FEED,
  LOADING_NEW_FEED_DONE,
  SET_ERRORS,
  CLEAR_ERROR,
  LOADING_DONE,
} = actions;
export default reducer;

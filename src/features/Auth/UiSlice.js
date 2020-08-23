const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  loading: false,
  errors: {

  }
};

const ui = createSlice({
  name: 'ui',
  initialState: initialState,
  reducers: {
    LOADING_UI: (state, action) => {
      state.loading = true;
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
    }
  }
})

const { reducer, actions } = ui;
export const { LOADING_UI, SET_ERRORS, CLEAR_ERROR, LOADING_DONE } = actions;
export default reducer;
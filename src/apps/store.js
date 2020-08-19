import { configureStore } from "@reduxjs/toolkit";

import newFeedReducer from "features/NewFeed/NewFeedSlice";

const rootReducer = {
  newFeed: newFeedReducer,
}

const store = configureStore({
  reducer: rootReducer,
})

export default store;
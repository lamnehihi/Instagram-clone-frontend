import { configureStore } from "@reduxjs/toolkit";

import newFeedReducer from "features/NewFeed/NewFeedSlice";
import screamHottest from "features/NewFeed/HottestSlice";

import userReducer from "features/Auth/UserSlice";
import UiReducer from "features/Auth/UiSlice";
import profileReducer from "features/Profile/ProfileSlice";
import screamReducer from "features/Scream/ScreamSlice";




const rootReducer = {
  newFeed: newFeedReducer,
  user: userReducer,
  ui: UiReducer,
  profile: profileReducer,
  scream: screamReducer,
  hottest: screamHottest,
}

const store = configureStore({
  reducer: rootReducer,
})

export default store;
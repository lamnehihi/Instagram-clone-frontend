import { configureStore } from "@reduxjs/toolkit";

import newFeedReducer from "features/NewFeed/NewFeedSlice";
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
}

const store = configureStore({
  reducer: rootReducer,
})

export default store;
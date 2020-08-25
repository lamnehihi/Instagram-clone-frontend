import Axios from "axios";
import { SET_LOGIN, setAuthorizationHeader } from "features/Auth/UserSlice";

const { createAsyncThunk } = require("@reduxjs/toolkit");

export const EDIT_AVATAR = createAsyncThunk(
  "profile/avatar",
  async (action, thunkAPI) => {
    try {
      const FBToken = localStorage.getItem("FBIdToken");
      Axios.defaults.headers.common["Authorization"] = FBToken;
      const formData = action;
      console.log(formData);

      Axios.defaults.baseURL =
        "https://asia-east2-socialape-fb7db.cloudfunctions.net/api";
      await Axios.post("user/uploadImg", formData);
      const { dispatch } = thunkAPI;
      dispatch(SET_LOGIN());
    } catch (error) {
      console.log(error);
    }
  }
);

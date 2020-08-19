import axiosClient from "./axiosClient";

const authApi = {
  login : async (userData) => {
    const url = '/auth/login';
    try {
      const res = await axiosClient.post(url, userData);
    console.log("res", res.data);
      return res;
    } catch (error) {
      console.log({...error});
      return error;
    }
  },

}
export default authApi;
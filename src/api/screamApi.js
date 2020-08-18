import axiosClient from "./axiosClient";

const screamApi = {
  getAll : (params) => {
    const url = '/scream';
    return axiosClient.get(url, { params });
  },

  get : (id) => {
    const url = `/scream/${id}`;
    return axiosClient.get(url);
  }
}
export default screamApi;
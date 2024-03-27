import axios from "axios";

axios.defaults.baseURL = 'https://world-of-craft-670e0fb14b24.herokuapp.com/';
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();

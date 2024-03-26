import axios from "axios";

axios.defaults.baseURL = 'https://world-of-craft-0e06bf8581a1.herokuapp.com/';
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();

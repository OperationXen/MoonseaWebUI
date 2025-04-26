import axios, { AxiosInstance } from "axios";

const instance: AxiosInstance = axios.create({
  withCredentials: true,
  baseURL: "/",
});

export default instance;

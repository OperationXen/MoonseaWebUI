import axios from "axios";

const instance = axios.create({
  withCredentials: true,
  baseURL: "/",
});

export default instance;

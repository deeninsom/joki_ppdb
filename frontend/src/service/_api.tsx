import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://sistem-ppdb.vercel.app/api/v1",
  timeout: 5000
});

export default axiosInstance;
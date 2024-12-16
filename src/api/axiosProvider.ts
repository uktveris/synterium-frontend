import axios from "axios";

const BASE_URL = "http://localhost:8080/api";

const axiosMain = axios.create({
  baseURL: BASE_URL,
});

const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export { axiosMain, axiosPrivate };

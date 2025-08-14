import axios from "axios";

const javaJobservice = axios.create({
  baseURL: "http://localhost:8082/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default javaJobservice;

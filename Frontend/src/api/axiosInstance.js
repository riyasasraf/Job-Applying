import axios from "axios";

const pythonInstance = axios.create({
  baseURL: "http://127.0.0.1:5000/receive_jobs", // Your FastAPI base URL
  timeout: false,
  headers: {
    "Content-Type": "application/json",
  },
});

export default pythonInstance;

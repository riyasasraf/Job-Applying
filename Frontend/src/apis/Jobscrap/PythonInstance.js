import axios from "axios";

const pythonInstance = axios.create({
  baseURL: "http://127.0.0.1:5000",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

export default pythonInstance ;
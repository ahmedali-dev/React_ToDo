import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/",
  method: "POST"
});

export default instance;
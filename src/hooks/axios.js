import axios from "axios";

const url = "https://2sdjqn-5000.csb.app";
const url2 = "http://localhost:5000";
const instance = axios.create({
  baseURL: url2,
  method: "POST",
});

export default instance;

import axios from "axios";

const url = "https://4yzt9s-5001.csb.app";
const url2 = "http://localhost:5000";
const instance = axios.create({
  baseURL: url,
  method: "POST",
});

export default instance;

import axios from "axios";

const url = "https://sppy53-5000.csb.app/";
const url2 = "http://localhost:5000";
const instance = axios.create({
  baseURL: url,
  method: "POST",
});

export default instance;

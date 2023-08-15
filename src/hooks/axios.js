import axios from "axios";

const url2 = "https://node-to-do-n1zx.vercel.app/";
const instance = axios.create({
  baseURL: url2,
  method: "POST",
});

export default instance;

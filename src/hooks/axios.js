import axios from "axios";

const instance = axios.create({
  baseURL: "https://nodetodo--ahmedali-dev.repl.co/",
  method: "POST"
});

export default instance;
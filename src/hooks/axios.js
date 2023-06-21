import axios from "axios";

const url = 'https://vr3s6v-5000.csb.app/'
const instance = axios.create({
  baseURL: url,
  method: "POST"
});

export default instance;
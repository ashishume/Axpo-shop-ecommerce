import axios from "axios";
import { BASE_URL } from "../constants/api-path";

const Axios = axios.create({
  baseURL: BASE_URL,
});

export default Axios;

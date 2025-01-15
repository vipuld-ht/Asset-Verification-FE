import axios from "axios";

const baseURL = "https://pokeapi.co/api/v2/";
const axiosIns = axios.create({
  baseURL: baseURL,
});


axiosIns.interceptors.request.use(
    async (config) => {
        return config;
});


export default axiosIns;
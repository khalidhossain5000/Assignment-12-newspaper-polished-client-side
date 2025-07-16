import axios from "axios";

const axiosInstance = axios.create({
    // baseURL: `https://assignment-12-server-sigma-pied.vercel.app/`
    baseURL: `http://localhost:3000`
})

const useAxios = () => {
    return axiosInstance;
};

export default useAxios;
import axios from "axios";
import { AppConfig } from "./appConfig";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
    baseURL: AppConfig.baseUrl,
    timeout: 30000,
    timeoutErrorMessage: "Request timed out. Please try again.",
    headers:{
        "Content-Type":"application/json",
    }
});

//attach intercepters
axiosInstance.interceptors.request.use((config)=>{
    const _at_57 =Cookies.get("_at_57")
    if(_at_57){
        config.headers.Authorization ="Bearer " +_at_57
    }
    return config;
})

export default axiosInstance;
import axios from "axios"
import { baseURI } from "./appconfig"

const instance=axios.create()

axios.interceptors.response.use(function (response) {
    return response;
  }, async function (error) {
      
    const originalRequest = error.config;
    
    originalRequest.retry = true;
    
    return Promise.reject(error);
  });


const handleResfreshAccess=async (refresh)=>{
    try {
        const res= await axios.post(`${baseURI}api/auth/account/jwt/refresh/`,{
            refresh
        })

        const {data}=res

        localStorage.setItem('access_key',data.access)

        return true
    } catch (error) {
        return false
    }
}


export default handleResfreshAccess
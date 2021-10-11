import axios from "axios"
import {baseURI} from './appconfig'
import handleResfreshAccess from "./handleResfreshAccess"

const instance=axios.create()

axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
  
    const originalRequest = error.config;
   
    if (error.response.status === 401 && !originalRequest.retry) {
      originalRequest.retry = true;
      
      await handleResfreshAccess(localStorage.getItem("refresh_key"));
      
       const access_token =localStorage.getItem("access_key");
      
        originalRequest.headers.Authorization="Token " + access_token;
      return instance(originalRequest);
    }
    return Promise.reject(error);
  });

const getUser=async()=>{
    try {

        const access=localStorage.getItem('access_key')
        if (access){

            const res=await axios.post(`${baseURI}api/check-user/`,{},{
                headers:{'Authorization':`Token ${access}`}
            })
            return true
        }else{
            throw Error('Auth error')
        }

    } catch (err) {

        return false
    }
}

export default getUser
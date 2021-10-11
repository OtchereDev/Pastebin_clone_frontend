import { ref } from "@vue/reactivity";
import axios from "axios";
import { baseURI } from "./appconfig";

const error = ref(null)

const getPaste=()=>{
    const handleGetPaste=async(uuid,add_auth=false)=>{
        try {
            
            if(add_auth){
                
                const access=localStorage.getItem('access_key')
                const res=await axios.get(`${baseURI}api/bin/${uuid}/`,{
                    headers:{
                        'Authorization':`Token ${access}`
                    }
                })
                const {data}=res
                console.log(data)
                return data
            }else{
                console.log('happening')
                const res=await axios.get(`${baseURI}api/bin/${uuid}/`)
    
                const {data}=res
                console.log(data)
                return data
            }

        } catch (err) {
            console.log(err.response)
            if(err.response){

                if(err.response.status=404){
                    error.value='The paste you are trying to fetch does not exist... '
                }else{
    
                    error.value='There was an error fetching this paste'
                }
            }else{
    
                error.value='There was an error fetching this paste... Please try again later'
            }
        }
    }

    return {handleGetPaste,error}
}

export default getPaste
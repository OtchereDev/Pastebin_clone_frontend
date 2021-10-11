import axios from 'axios'
import {ref} from 'vue'
import {baseURI} from './appconfig'

const error=ref(null)



const handleLogin=()=>{
    const login= async(username,password)=>{
        try {
            error.value=null
            const res = await axios.post(`${baseURI}api/auth/account/jwt/create/`,{
                'username':username,
                'password':password
            }) 
    
            const {data}=res

            localStorage.setItem('access_key',data.access)
            localStorage.setItem('refresh_key',data.refresh)
        } catch (err) {
            error.value=err.response.data.detail
            
        }
    }

    return {login,error}
}

export default handleLogin
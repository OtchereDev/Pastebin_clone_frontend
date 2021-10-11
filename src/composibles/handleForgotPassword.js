import axios from "axios";
import {baseURI} from './appconfig'

const { ref } = require("@vue/reactivity");

const error=ref(null)

const handleForgotPassword=()=>{
    const forgotPassword=async (email,type='password')=>{
        error.value=null
        try {
            const res = await axios.post(`${baseURI}api/auth/users/reset_${type}/`,{
                email
            })
            
            return true
        } catch (err) {
            
            error.value='Sorry, there was an error ... please try again later'
            
            return false
        }
    }

    return {error, forgotPassword}
}

export default handleForgotPassword
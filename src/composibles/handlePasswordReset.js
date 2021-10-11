import axios from "axios";
import {baseURI} from './appconfig'

const { ref } = require("@vue/reactivity");

const error=ref([])

const handleResetPassword=()=>{
    error.value=[]
    const resetPassword= async (token,uid,new_password,type='password')=>{
        error.value=[]
        try {

            let post_data

            if(type==='password'){
                post_data={
                    uid,
                    new_password,
                    token
                }
            }else{
                post_data={
                    uid,
                    token,
                    username:new_password
                }
            }

            const uri = `${baseURI}api/auth/users/reset_${type}_confirm/`

            console.log(uri)
            
            const res= await axios.post(uri,post_data)

            const {data}=res
            console.log(res,data)

            return true

        } catch (err) {
            console.log(err)

            if(err.response){

                if(err.response.data.new_password){
                    err.response.data.new_password.forEach(errors=>{
                        error.value.push(errors)
                    }) 
                }
    
                else if(err.response.data.token){
                    err.response.data.token.forEach(errors=>{
                        error.value.push(errors)
                    }) 
                    error.value.push('Please request for a new reset of password')
                }

                else{
                    error.value.push('Sorry there was an error... Try again later')
                }
            }

            return false

        }
    }

    return {resetPassword,error}
}

export default handleResetPassword
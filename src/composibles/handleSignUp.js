import axios from 'axios'
import {ref} from 'vue'
import {baseURI} from './appconfig'
import handleLogin from './handleLogin'

const error=ref([])

const {login}=handleLogin()



const handleSignUp=()=>{
    const signup= async(username,password,email)=>{
        try {
            error.value=[]
            const res = await axios.post(`${baseURI}api/auth/users/`,{
                username,
                password,
                email
            }) 

            await login(username,password)

        } catch (err) {
    
            if(err.response.data.password){
                err.response.data.password.forEach(errors=>{
                    error.value.push(errors)
                }) 
            }


            if(err.response.data.username){
                err.response.data.username.forEach(errors=>{
                    error.value.push(errors)
                }) 
            }


            if(err.response.data.email){
                err.response.data.email.forEach(errors=>{
                    error.value.push(errors)
                }) 
            }
            
        }
    }

    return {signup,error}
}

export default handleSignUp
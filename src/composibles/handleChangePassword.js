import axios from "axios";
import {baseURI} from './appconfig'

const { ref } = require("@vue/reactivity");

const error=ref([])

const handleChangePassword=()=>{
    error.value=[]
    const changePassword= async (current_password,new_password,re_new_password)=>{
        error.value=[]
        try {
            
            const res= await axios.post(`${baseURI}api/auth/users/set_password/`,{
                new_password,
                re_new_password,
                current_password
            },{
                headers:{'Authorization':`Token ${localStorage.getItem('access_key')}`}
            })

            return true

        } catch (err) {
            console.log(err.response)
            if(err.response.data.current_password){
               
                    error.value.push("Enter your correct current password")
               
            }

            if(err.response.data.new_password){
                err.response.data.new_password.forEach(errors=>{
                    error.value.push(errors)
                }) 
            }

            return false

        }
    }

    return {changePassword,error}
}

export default handleChangePassword
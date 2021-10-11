import { ref } from "@vue/reactivity"
import axios from "axios"
import {baseURI} from '@/composibles/appconfig'


const error = ref(null)
const profile=ref(null)

const getProfile=()=>{
    
    const performAction= async ()=>{
        try {
            const res= await axios.get(`${baseURI}api/get_user_profile/`,{
                headers:{
                    Authorization: `Token ${localStorage.getItem('access_key')}`
                }
            })
            console.log(res)
            const {data}=res
            profile.value=data
            
        } catch (err) {
            error.value='Sorry cant perform this action'
            console.log(err.message)
        }
    }

    return {performAction,error,profile}
}

export default getProfile
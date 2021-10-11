import { ref } from "@vue/reactivity"
import axios from "axios"
import {baseURI} from '@/composibles/appconfig'

const deletePaste=async(uuid)=>{
    const paste_error = ref(null)

    try {
        const res = await axios.post(`${baseURI}api/bin/${uuid}/delete/`,{},{
            headers:{
                Authorization : `Token ${localStorage.getItem('access_key')}`
            }
        })

    } catch (error) {
        console.log(error.message)
        paste_error.value=error.message
    }

    return paste_error
}

export default deletePaste
import {ref} from 'vue'
import axios from 'axios'
import {baseURI} from './appconfig'


const error=ref(null)

const handleNewPaste=()=>{
    error.value=null
    const postToAPI=async(paste_data,withAuth=false,update_uuid=null)=>{
        error.value=null
        console.log(paste_data)
        if(withAuth){
            const access=localStorage.getItem('access_key')
            
            try {
                const res= await axios.post(`${baseURI}api/${update_uuid?`bin/${update_uuid}/update/`:"new/"}`,paste_data,{
                    headers:{'Authorization':`Token ${access}`}
                })

                // fallback with fetch
                // const res=fetch(`${baseURI}api/new/`,{
                //     method:'POST',
                //     headers:{
                //         'content-type':'application/json',
                //         'Authorization':`Token ${access}`

                //     }
                // })

                // if(res.status ==401){
                //     await handleResfreshAccess(localStorage.getItem("refresh_key"));
       
                //     const access =localStorage.getItem("access_key");
                //     const res=fetch(`${baseURI}api/new/`,{
                //         method:'POST',
                //         headers:{
                //             'content-type':'application/json',
                //             'Authorization':`Token ${access}`
    
                //         }
                //     })

                //     if(res.ok){
                //         throw Error('Auth failed')
                //     }
                // }

                // if(res.ok){
                //     throw Error('Auth failed')
                // }
                
                const {data}=res
                return data
            } catch (err) {
                console.log(err)
                error.value='Sorry, there was an error. Please try again!'
            }
        }else{
            console.log('no auth')
            try {
                const res= await axios.post(`${baseURI}api/new/`,paste_data)
                
                const {data}=res
                console.log(data)
                return data
            } catch (err) {
                console.log(err)
                error.value='Sorry, there was an error. Please try again!'
            }
        }
    }

    return {postToAPI,error}
}

export default handleNewPaste
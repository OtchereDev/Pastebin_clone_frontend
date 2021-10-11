import axios from 'axios'
import {ref} from 'vue'
import handleResfreshAccess from "./handleResfreshAccess"

const error=ref(null)

const handleProfileSettingUpdate=()=>{
    const postToAPI=async(url,user_data,hasAvatar=false)=>{

        error.value=null

        const access=localStorage.getItem('access_key')

        try {
            
            // const res = await axios.post(url,data,{
            //     headers:{
            //         'Authorization':`Token ${access}`
            //     }
            // })

            let res 

            if (!hasAvatar){

                res=await fetch(url,{
                    method:"POST",
                    headers:{
                        Authorization:`Token ${access}`,
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(user_data)
                })
            }
            else{
                const form =new FormData()
                form.append('avatar',user_data['avatar'])
                form.append('location',user_data['location'])
                form.append('website_url',user_data['website_url'])
                res=await fetch(url,{
                    method:"POST",
                    headers:{
                        Authorization:`Token ${access}`,
                        
                    },
                    body: form
                })
            }
            

            
            if (res.status===401){
                const auth_res = await handleResfreshAccess(localStorage.getItem("refresh_key"))
                const new_access=localStorage.getItem('access_key')
                if(!auth_res){
                    throw Error('Auth failed')
                }

                if (!hasAvatar){

                    res=await fetch(url,{
                        method:"POST",
                        headers:{
                            Authorization:`Token ${new_access}`,
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(user_data)
                    })
                }
                else{
                    const form =new FormData()
                    form.append('avatar',user_data['avatar'])
                    form.append('location',user_data['location'])
                    form.append('website_url',user_data['website_url'])
                    res=await fetch(url,{
                        method:"POST",
                        headers:{
                            Authorization:`Token ${new_access}`,
                            
                        },
                        body: form
                    })
                }
            }

            if(!res.ok){
                throw Error('Cant handle request')
            }

            const data = await res.json()

            return data
        } catch (err) {
            console.log(err)
            if(err.response){
                error.value=err.response.detail
            }else{
                error.value='Sorry can not perform the desired action ... please try again later.'
            }
        }
    }

    return {postToAPI,error}
}

export default handleProfileSettingUpdate
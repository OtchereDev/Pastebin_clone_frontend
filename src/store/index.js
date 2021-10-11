import { createStore } from 'vuex'
import {baseURI} from '@/composibles/appconfig'
import handleResfreshAccess from '../composibles/handleResfreshAccess'

export default createStore({
  state: {
    user:null,

    user_paste_preference:{

      defaultSyntax:'PLAINTEXT',
      defaultExpiration:'Never',
      nightMode:false,
      defaultExposure:'Public'

    },
    
    all_user_folder:[ 'no folder selected' ],

    languages:[
      "PLAINTEXT",
      "PYTHON",
      "JAVASCRIPT",
      "GOLANG",
      "RUBY",
      "HTML",
      "JAVA",
      "JSON",
      "CSS",
      "C#",
      "C++"
    ],

    expirations:[
      'Never',
      '10 min',
      '1 hr',
      '1 week',
      '2 week',
      '1 month',
      '6 month',
      '1 year'
    ]
  },
  getters:{
    getUser(state){
      return state.user
    },
    getUserPastePrefence(state){
      return state.user_paste_preference
    },
    getLanguages(state){
      return state.languages
    },
    getAllUserFolder(state){
      return state.all_user_folder
    },
    getExpirations(state){
      return state.expirations
    }
  },
  mutations: {

    changeUser(state,data){
      state.user=data
    },

    changeUserFolder(state,data){
      if(data.folders){

        const folder =[]
        data.folders.forEach(({name})=>{
          folder.push(name)
        })

        state.all_user_folder = ['no folder selected', ...folder]

      }
    },

    changeUserPreference(state,{data}){
      
      state.user_paste_preference.defaultSyntax=data.defaultSyntax
      state.user_paste_preference.defaultExpiration=data.defaultExpiration
      state.user_paste_preference.nightMode=data.nightMode
      state.user_paste_preference.defaultExposure=data.defaultExposure
      
    }

  },
  actions: {

    
    async handleChangeUser({commit}){
      let res = await fetch(`${baseURI}api/check-user/`,{
        method:'POST',
        headers:{
          Authorization:`Token ${localStorage.getItem('access_key')}`
        }
      })

      if(res.status===401){
        await handleResfreshAccess(localStorage.getItem('refresh_key'))

        res = await fetch(`${baseURI}api/check-user/`,{
          method:'POST',
          headers:{
            Authorization:`Token ${localStorage.getItem('access_key')}`
          }
        })

        if(!res.ok){
          return commit('changeUser',null)
        }

        
      }
      
      if(!res.ok){
        return commit('changeUser',null)
      }
      
      
      return commit('changeUser',true)
      
    },

    async handleChangeUserPreference({commit}){
      let res = await fetch(`${baseURI}api/get_user_settings/`,{
       
        headers:{
          Authorization:`Token ${localStorage.getItem('access_key')}`
        }
      })

      if(res.status===401){
        await handleResfreshAccess(localStorage.getItem('refresh_key'))

        res = await fetch(`${baseURI}api/get_user_settings/`,{
         
          headers:{
            Authorization:`Token ${localStorage.getItem('access_key')}`
          }
        })

        if(!res.ok){
          return commit('changeUserPreference',{})
        }

        
      }
      
      if(!res.ok){
        return commit('changeUserPreference',{})
      }

      const data =await res.json()
      
      return commit('changeUserPreference',data)
      
    },

    async handleChangeUserFolder({commit}){
      let res = await fetch(`${baseURI}api/all_folders/`,{
       
        headers:{
          Authorization:`Token ${localStorage.getItem('access_key')}`
        }
      })

      if(res.status===401){
        await handleResfreshAccess(localStorage.getItem('refresh_key'))

        res = await fetch(`${baseURI}api/all_folders/`,{
         
          headers:{
            Authorization:`Token ${localStorage.getItem('access_key')}`
          }
        })

        if(!res.ok){
          return commit('changeUserFolder',[])
        }

        
      }
      
      if(!res.ok){
        return commit('changeUserFolder',[])
      }

      const data =await res.json()
      
      return commit('changeUserFolder',data)
      
    }
  },
  modules: {
  }
})

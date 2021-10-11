import store from '@/store'


const handleLogout=async()=>{
    localStorage.removeItem('refresh_key')
    localStorage.removeItem('access_key')

    await store.dispatch('handleChangeUser')
    
}

export default handleLogout
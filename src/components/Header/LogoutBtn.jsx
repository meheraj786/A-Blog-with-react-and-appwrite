import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'
import { useNavigate } from 'react-router-dom'

function LogoutBtn() {
  const navigate = useNavigate()
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
            navigate('/')
            
        })
    }
  return (
    
    <><button
    fullWidth variant="gradient" size="sm" className="bg-black text-white dark:bg-[#303a69] p-3 rounded-lg"
    onClick={logoutHandler}
    >Logout</button></>
  )
}

export default LogoutBtn
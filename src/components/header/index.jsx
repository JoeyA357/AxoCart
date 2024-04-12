import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/authContext'
import { doSignOut } from '../../firebase/auth'
import Login from "../auth/login";
import Register from "../auth/register";
import Home from "../home";

const Header = () => {
    const navigate = useNavigate()
    const { userLoggedIn } = AuthContext
    return (
        <nav className='flex flex-row gap-x-2 w-full z-20 fixed top-0 left-0 h-12 border-b place-content-center items-center bg-gray-200'>
            {
                userLoggedIn
                    ?
                    <>
                        
                        <button onClick={() => { doSignOut().then(() => { navigate('/login') }) }} className='text-sm text-blue-600 underline'>Logout</button>
                        <button onClick={() => { doSignOut().then(() => { navigate('/register') }) }} className='text-sm text-blue-600 underline'>Register New Account</button>
                    </>
                    :
                    <>
                        <Link className='text-sm text-blue-600 underline' to={'/login'}>Login</Link>
                        <Link className='text-sm text-blue-600 underline' to={'/register'}>Register New Account</Link>
                    </>
            }

        </nav>
    )
}

export default Header
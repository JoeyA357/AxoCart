import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/authContext'
import { doSignOut } from '../../firebase/auth'
import Login from "../auth/login";
import Register from "../auth/register";
import Home from "../home";
import CartLogo from "../assets/cartlogo.png";
import ProfileLogo from "../assets/profilelogo.png";

const Header = () => {
    const navigate = useNavigate()
    const { userLoggedIn } = useAuth()
    return (
    
                userLoggedIn
                    ?
                    <>
                        <div className="navbar">
                        <div className="leftside">
                            
                            </div>    
                        <div className='rightside'>
                        <img src={CartLogo} className="images" />
                        <img src={ProfileLogo} className="images" />
                        <button onClick={() => { doSignOut().then(() => { navigate('/login') }) }} className='navlinks'>Logout</button>
                        </div>
                        </div>
                    </>
                    :
                    <>
                        <nav className='flex flex-row gap-x-2 w-full z-20 fixed top-0 left-0 h-12 border-b place-content-center items-center bg-gray-200'>
                        <Link className='text-sm text-blue-600 underline' to={'/login'}>Login</Link>
                        <Link className='text-sm text-blue-600 underline' to={'/register'}>Register New Account</Link>
                        </nav>
                    </>
            

    )
}

export default Header
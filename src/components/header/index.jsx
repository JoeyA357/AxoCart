import React, {useContext} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/authContext'
import { doSignOut } from '../../firebase/auth'
import Login from "../auth/login";
import Register from "../auth/register";
import Home from "../home";
import CartLogo from "../assets/cartlogo.png";
import ProfileLogo from "../assets/profilelogo.png";
import { CartContext } from '../../contexts/cartContext';
import { Icon } from 'react-icons-kit'
import { cart } from 'react-icons-kit/entypo/cart'
import { home } from 'react-icons-kit/icomoon/home'
import '../home/home.css';
import { useAuth } from '../../contexts/authContext'


const Header = () => {
    const navigate = useNavigate()

    const {totalQty} = useContext(CartContext)
    const {currentUser} = useContext(AuthContext)
    const { userLoggedIn } = useAuth()
    return (
        userLoggedIn ? (
            <>
                <div className="navbar">
                    <div className="leftside">
                        <img src={currentUser.photoURL} className="pfp" alt="Profile Logo" />
                    </div>    
                    <div className='middleside'></div>
                    <div className='rightside'>
                       <span><Link to="/cart" classname='navlinks'><Icon icon={cart} /></Link></span>
                            <span className='no-of-products'>{totalQty}</span>
                            <span><Link to="/home" classname='homebtn'><Icon size={20} icon={home} /></Link></span>
                        
                        <button onClick={() => { navigate('/addProducts') }} className='navlinks'>Add Product</button>
                        <button onClick={() => { navigate('/chat') }} className='navlinks'>Chat</button>
                        <button onClick={() => { doSignOut().then(() => { navigate('/login') }) }} className='navlinks'>Logout</button>
                    </div>
                </div>
            </>
        ) : (
            <>
                <nav className='flex flex-row gap-x-2 w-full z-20 fixed top-0 left-0 h-12 border-b place-content-center items-center bg-gray-200'>
                    <Link className='text-sm text-blue-600 underline' to={'/login'}>Login</Link>
                    <Link className='text-sm text-blue-600 underline' to={'/register'}>Register New Account</Link>
                </nav>
            </>
        )
    );
}

export default Header
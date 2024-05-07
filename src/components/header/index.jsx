import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/authContext';
import { doSignOut } from '../../firebase/auth';
import { CartContext } from '../../contexts/cartContext';
import { Icon } from 'react-icons-kit';
import { cart } from 'react-icons-kit/entypo/cart';
import { home } from 'react-icons-kit/icomoon/home';
import '../home/home.css';
import { useAuth } from '../../contexts/authContext';
import { db } from '../../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import AxoCartLogo from '../assets/AxoCartLogoBack.png';

const Header = () => {
  const navigate = useNavigate();
  const { totalQty } = useContext(CartContext);
  const { currentUser } = useContext(AuthContext);
  const { userLoggedIn } = useAuth();
  const [user, setUser] = useState(null);


  // Fetch user data and query them later on
  useEffect(() => {
    if (currentUser) {
      const fetchUser = async () => {
        const userRef = doc(db, 'users', currentUser.uid);
        const userDoc = await getDoc(userRef);
        setUser(userDoc.data());
      };
      fetchUser();
    }
  }, [currentUser]);

  return (
    userLoggedIn ? (
      <>
        <div className="navbar">
          <div className="leftside">
          <img src={AxoCartLogo} className="pfp" alt="AxoCart" />
            <img src={user?.photoURL} className="pfp" alt="Profile Logo" />
          </div>
          <div className='middleside'></div>
          <div className='rightside'>
            <span><button onClick={() => {
                if (user && user.userType === 'seller') {
                  alert('Only Customers can purchase products');
                } else {
                  navigate('/cart');
                }
              }} classname='navlinks'><Icon icon={cart} /></button></span>
            <span className='no-of-products'>{totalQty}</span>
            <span><Link to="/home" classname='homebtn'><Icon size={20} icon={home} /></Link></span>
            <button onClick={() => {
                if (user && user.userType === 'customer') {
                  alert('Only Sellers can add products to the website');
                } else {
                  navigate('/addProducts');
                }
              }} className='navlinks'>Add Product</button>
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

export default Header;
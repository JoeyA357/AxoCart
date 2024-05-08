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

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@600&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    return () => {
        document.head.removeChild(link);
    };
}, []);

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
      <div className="navbar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div className="leftside" style={{ display: 'flex', alignItems: 'center' }}>
          <img src={user?.photoURL} className="pfp" alt="Profile Logo" />
        </div>
        <div className="centerSide" style={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
          <p style={{
              fontSize: '34px', 
              fontWeight: '700', 
              fontFamily: 'Poppins, sans-serif', 
              color: '#0E1F6C', 
              margin: '0 10px', 
              textShadow: '1px 1px 2px gray'
            }}>AxoCart</p>
          <img src={AxoCartLogo} style={{ height: '50px', borderRadius: '50%' }} alt="AxoCart Logo" />
        </div>
        <div className="rightSide" style={{ display: 'flex' }}>
          <button onClick={() => {
            if (user && user.userType === 'seller') {
              alert('Only Customers can purchase products');
            } else {
              navigate('/cart');
            }
          }} className='navlinks'><Icon icon={cart} /></button>
          <button onClick={() => navigate('/home')} className='navlinks'><Icon icon={home} /></button>
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
    ) : (
      <nav className='flex flex-row gap-x-2 w-full z-20 fixed top-0 left-0 h-12 border-b place-content-center items-center bg-gray-200'>
        <Link className='text-sm text-blue-600 underline' to={'/login'}>Login</Link>
        <Link className='text-sm text-blue-600 underline' to={'/register'}>Register New Account</Link>
      </nav>
    )
  );
}

export default Header;

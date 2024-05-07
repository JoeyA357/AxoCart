import React, { useContext, useState } from 'react'
import {signOut} from "firebase/auth"
import { auth } from '../../firebase/firebase.js'
import { AuthContext } from '../../contexts/authContext'


const Navbar = () => {
  const {currentUser} = useContext(AuthContext)
  const [redirect, setRedirect] = useState(false); // State to manage redirection


  if (redirect) {
    return <>{/* Redirect component or navigate programmatically */}</>;
  }

  return (
    <div className='navbar'>
      <span className="logo">Chat</span>
      <div className="user">
        <img src={currentUser.photoURL} alt="" />
        <span>{currentUser.displayName}</span> 
        
      </div>
    </div>
  )
}

export default Navbar
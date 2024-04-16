import React, { useContext, useState } from 'react'
import {signOut} from "firebase/auth"
import { auth } from '../../firebase/firebase.js'
import { AuthContext } from '../../contexts/authContext'


const Navbar = () => {
  const {currentUser} = useContext(AuthContext)
  const [redirect, setRedirect] = useState(false); // State to manage redirection

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setRedirect(true); // Set redirect to true after sign out
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (redirect) {
    return <>{/* Redirect component or navigate programmatically */}</>;
  }

  return (
    <div className='navbar'>
      <span className="logo">Chat</span>
      <div className="user">
        {/* <img src={currentUser.photoURL} alt="" /> */}
        <span>{currentUser.displayName}</span> 
        <button onClick={handleSignOut}>logout</button>
      </div>
    </div>
  )
}

export default Navbar
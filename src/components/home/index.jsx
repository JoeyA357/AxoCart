import React from 'react'
import { useAuth } from '../../contexts/authContext';
import Products from '../products/products';


const Home = () => {
    const { currentUser } = useAuth()
    
    return (
       <div>
           
           <Products />
           <div className='text-2xl font-bold pt-14'>Hello {currentUser.displayName ? currentUser.displayName : currentUser.email}, you are now logged in.</div>
        </div>
    
    
       
    )
    
}

export default Home
import React from 'react'
import '../home/home.css'
import { useAuth } from '../../contexts/authContext';
import Products from '../products/products';


const Home = () => {
    const { currentUser } = useAuth()
    
    return (
           <div className="wrapper">
            <Products />
        </div>
    
    )
    
}

export default Home
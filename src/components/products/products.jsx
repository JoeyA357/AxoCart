import React, { useContext, useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { ProductsContext } from '../../contexts/productContext';
import { CartContext } from '../../contexts/cartContext';
import { AuthContext } from '../../contexts/authContext';
import { useEffect } from 'react';
import { useAuth } from '../../contexts/authContext';
import { db } from '../../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { ProductInfoContext } from "../../contexts/ProductInfoContext";
import AxocartLogo from '../assets/AxoCartLogoBack.png';
import AxocartLogo2 from '../assets/AxoCart_Logo.png';
import Slider1 from '../assets/slider1_bag.jpg';
import Slider2 from '../assets/Slider2_necklace (1).jpg';
import Slider3 from '../assets/Slider3_shirt (1).jpg';

const Products = () => {

  const [productName, setProductName] = useState("");

  const { products } = useContext(ProductsContext);
  const { currentUser } = useContext(AuthContext);
  const { userLoggedIn } = useAuth();
  const [user, setUser] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { prod,setProd } = useContext(ProductInfoContext); 
  const images = [
    Slider1,  // Replace with actual URLs
    Slider2,
    Slider3
];

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

    const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Cleanup the interval on component unmount
}, [currentUser, images.length]);

const navigate = useNavigate();
const { dispatch } = useContext(CartContext);

const addToCart = (product) => {
    if (user && user.userType === 'seller') {
        alert('Only Customers can purchase products');
    } else {
        dispatch({ type: 'ADD_TO_CART', id: product.productID, product });
    }
};


  const productInfo = (product) => {
    console.log(product.productID)
    setProd(product.productID);
    navigate('/product');
  }

  return (
    <>
    <div className='slider'>
                <button className="slide-arrow left-arrow" onClick={() => setCurrentSlide((currentSlide - 1 + images.length) % images.length)}>&laquo;</button>
                <img src={images[currentSlide]} alt={`Slide ${currentSlide}`} style={{ width: '100%', height: 'auto' }} />
                <button className="slide-arrow right-arrow" onClick={() => setCurrentSlide((currentSlide + 1) % images.length)}>&raquo;</button>
            </div>
            {products.length !== 0 && <h1 style={{ textAlign: 'center' }}>Products</h1>}
            <div class="container">
                <div class="center">
            <button onClick={() => { navigate('/searchProducts') }} className='searchlinks'>Search Product</button>
            </div>
            </div>
            <div className='products-container'>
                {products.length === 0 && <div>slow internet...no products to display</div>}
                {products.map(product => (
                    <div className='product-card' key={product.productID}>
                        <div className='product-img'>
                            <img src={product.productImg} onClick={() => {productInfo(product)}} alt="not found" />
                        </div>
                        <div className='product-name'>
                            {product.productName}
                        </div>
                        <div className='product-price'>
                            $ {product.productPrice}.00
                        </div>

                        
                        <button className='addcart-btn' onClick={() => {addToCart(product)}}>ADD TO CART</button>
                        </div>
                         ))}
                        </div>                                    </>
                      );
                }
            
         export default Products;
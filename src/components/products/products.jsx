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

const Products = () => {

  const [productName, setProductName] = useState("");
  
  const { products } = useContext(ProductsContext);
  const { currentUser } = useContext(AuthContext);
  const { userLoggedIn } = useAuth();
  const [user, setUser] = useState(null);
  const { prod,setProd } = useContext(ProductInfoContext); 

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

  //console.log(products);

  //const data = useContext(CartContext);
  //console.log(data);
  const navigate = useNavigate()
  
  const {dispatch} = useContext(CartContext);

  const addToCart = (product) => {
    if (user && user.userType === 'seller') {
      alert('Only Customers can purchase products');
    } else {
      dispatch({type: 'ADD_TO_CART', id: product.productID, product})
    }
  }

  const productInfo = (product) => {
    setProd(product.productID);
    navigate('/product');
  }

  return (
    <>
            {products.length !== 0 && <h1>Products</h1>}
            <button onClick={() => { navigate('/searchProducts') }} className='navlinks'>Search Product</button>
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

                        <button className='addcart-btn' onClick={() => {productInfo(product)}}>Info</button>
                        <button className='addcart-btn' onClick={() => {addToCart(product)}}>ADD TO CART</button>
                        </div>
                         ))}
                        </div>                                    </>
                      );
                }
            
         export default Products;
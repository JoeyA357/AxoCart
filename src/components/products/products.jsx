import React, { useContext, useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { ProductsContext } from '../../contexts/productContext';
import { CartContext } from '../../contexts/cartContext';

const Products = () => {

  const [productName, setProductName] = useState("");
  
  const { products } = useContext(ProductsContext);
  //console.log(products);

  //const data = useContext(CartContext);
  //console.log(data);
  const navigate = useNavigate()
  
  const {dispatch} = useContext(CartContext);

  return (
    <>
            {products.length !== 0 && <h1>Products</h1>}
            <button onClick={() => { navigate('/searchProducts') }} className='navlinks'>Search Product</button>
            <div className='products-container'>
                {products.length === 0 && <div>slow internet...no products to display</div>}
                {products.map(product => (
                    <div className='product-card' key={product.productID}>
                        <div className='product-img'>
                            <img src={product.productImg} alt="not found" />
                        </div>
                        <div className='product-name'>
                            {product.productName}
                        </div>
                        <div className='product-price'>
                            $ {product.productPrice}.00
                    </div>
                        <button className='addcart-btn' onClick={() => {dispatch({type: 'ADD_TO_CART', id: product.productID, product})}}>ADD TO CART</button>
                        </div>
                         ))}
                        </div>                                    </>
                      );
                }
            
         export default Products;

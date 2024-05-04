import React, { useContext, useState, useEffect, Fragment } from "react";
import {
    doc,
    onSnapshot,
    updateDoc,
    setDoc,
    deleteDoc,
    collection,
    serverTimestamp,
    getDocs,
    query,
    where,
    orderBy,
    limit,
} from "firebase/firestore";
import { db } from "../../firebase/firebase.js";
import { ProductsContext } from '../../contexts/productContext.jsx';
import { CartContext } from '../../contexts/cartContext.jsx';

const SearchProducts = () => {

    const colletionRef = collection(db, 'Products');
    const {dispatch} = useContext(CartContext);

  const [productName, setProductName] = useState("");
  const [loading, setLoading] = useState(false);
  const [product, setProducts] = useState([]);
  const [err, setErr] = useState(false);
  const { products } = useContext(ProductsContext);
  //console.log(products);

  //const data = useContext(CartContext);
  const handleSearch = async () => {
    const q = query(
      collection(db, "Products"),
      where('productName', '>=', productName),
      where('productName', '<=', productName + '\uf8ff')
    );

    try {
      const querySnapshot = await getDocs(q);
      const productsData = [];
      querySnapshot.forEach((doc) => {
        productsData.push(doc.data());
      });
      console.log(productsData);
      setProducts(productsData);
    } catch (err) {
      setErr(true);
    }
};


  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };
  return (
    
      <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find a user"
          onKeyDown={handleKey}
          onChange={(e) => setProductName(e.target.value)}
          value={productName}
        />
      </div>
      <div className='products-container'>
      {err && <span>Item not found!</span>}
      
    
        {/* <h6>Score 0-10</h6>
        <input
          type="number"
          value={score}
          onChange={(e) => setScore(e.target.value)}
        />
        <h6>Description</h6>
        <textarea value={desc} onChange={(e) => setDesc(e.target.value)} />
        <button onClick={() => addSchool()}>Submit</button> */}

      {loading ? <h1>Loading...</h1> : null}
      {product.map ((prod)=> (
                    <div className='product-card' key={product.productID}>
                        <div className='product-img'>
                            <img src={prod.productImg} alt="not found" />
                        </div>
                        <div className='product-name'>
                            {prod.productName}
                        </div>
                        <div className='product-price'>
                            $ {prod.productPrice}.00
                    </div>
                        <button className='addcart-btn' onClick={() => {dispatch({type: 'ADD_TO_CART', id: product.productID, product})}}>ADD TO CART</button>
                        </div>
                         ))}
                         </div>
                         </div>

  );
                }
            
         export default SearchProducts;

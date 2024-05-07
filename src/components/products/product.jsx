import React, { useContext, useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { ProductsContext } from '../../contexts/productContext';
import { CartContext } from '../../contexts/cartContext';
import { AuthContext } from '../../contexts/authContext';
import { useEffect } from 'react';
import { useAuth } from '../../contexts/authContext';
import { db } from '../../firebase/firebase';
import { ProductInfoContext } from "../../contexts/ProductInfoContext";
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
  getDoc,
} from "firebase/firestore";

const Product = () => {
  const [err, setErr] = useState(false);
  const [productName, setProductName] = useState("");
  const [product, setProducts] = useState(null);
  const { products } = useContext(ProductsContext);
  const { currentUser } = useContext(AuthContext);
  const { userLoggedIn } = useAuth();
  const [user, setUser] = useState(null);
  const  {prod} = useContext(ProductInfoContext); 
  const productID = prod;
  console.log(productID+" created")

  useEffect(() => {
    const fetchData = async () => {
      if (prod) {
        // const q = query(
        //   collection(db, "Products"),
        //   where(firebase.firestore.FieldPath.documentId(), '==', prod)
        // );
  
        // try {
        //   const querySnapshot = await getDocs(q);
        //   const productsData = [];
        //   querySnapshot.forEach((doc) => {
        //     productsData.push(doc.data());
        //   });
        //   console.log(productsData);
        //   setProducts(productsData[0]); // Assuming there's only one matching product
        // } catch (err) {
        //   setErr(true);
        // }
        const docRef = doc(db, "Products", prod);
        const docSnap = await getDoc(docRef);
        setProducts(docSnap.data());
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
        }
      }
    };
  
    fetchData(); // Call the async function immediately
  }, [prod]);
  

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

  return (
    <>
      {product && (
        <div className='products-container1'>
            <h1 className='product-name1'>{product.productName}</h1>
            <div className='product-img1'>
              <img src={product.productImg} alt="not found" />
            </div>
            <div >
              <h2 className="Dectit">Description</h2>
              <div className="Description">{product.productDescription}</div>
            </div>
            <div className='product-price1'>
              $ {product.productPrice}.00
            </div>
            <button className='addcart-btn1' onClick={() => {addToCart(product)}}>ADD TO CART</button>
          
        </div>
      )}
    </>
  );
  

}
            
         export default Product;
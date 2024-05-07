import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../../firebase/firebase';
import { ProductsContext } from '../../contexts/productContext.jsx';
import { CartContext } from '../../contexts/cartContext.jsx';
import { AuthContext } from '../../contexts/authContext';
import { ProductInfoContext } from '../../contexts/ProductInfoContext.jsx';

const Product = () => {
  const [product, setProduct] = useState(null);
  const { prod } = useContext(ProductInfoContext);
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      if (prod) {
        const docRef = doc(db, "Products", prod);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProduct(docSnap.data());
        } else {
          console.log("No such product!");
        }
      }
    };
    fetchProduct();
  }, [prod]);

  const addToCart = (product) => {
    if (currentUser?.userType === 'seller') {
      alert('Only Customers can purchase products');
    } else {
      dispatch({ type: 'ADD_TO_CART', id: product.productID, product });
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
      <div className="product-container2">
        <div className="product-image2">
          <img src={product.productImg} alt={`${product.productName}`} />
        </div>
        <div className="product-details2">
          <h1 className="product-name2">{product.productName}</h1>
          <h2>Description</h2>
          <p className="product-description2">{product.productDescription}</p>
          <p className="product-price2">Price: ${product.productPrice}.00</p>
          <button className="btn-add-to-cart2" onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
      </div>
    );
  };

export default Product;

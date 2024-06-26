import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, doc } from 'firebase/firestore';
import { db, auth } from '../../firebase/firebase';
import { CartContext } from '../../contexts/cartContext';
import { setDoc, getDoc, deleteDocdoc,
  onSnapshot,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  getDocs,
  query,
  where,
  orderBy,
  limit,
 } from 'firebase/firestore';


const Cashout = () => {
  const navigate = useNavigate();
  const { shoppingCart, totalPrice, totalQty, dispatch } = useContext(CartContext);
  const [displayName, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cell, setCell] = useState('');
  const [address, setAddress] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [product, setProducts] = useState([]);
  const [err, setErr] = useState(false);
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      const docRef = doc(db, 'users', user.uid);
      getDoc(docRef).then(doc => {
        if (doc.exists) {
          const data = doc.data();
          setName(data.displayName || '');
          setEmail(data.email || '');
        }
      })
    } else {
      navigate('/login');
    }
  }, [navigate, user]);

  const cashoutSubmit = async (e) => {
    e.preventDefault();

     if (user) {
       let count=0
       while(count<shoppingCart.length) {
    //     const q = query(
    //       collection(db, "Products"),
    //       where('productID', '==', "MuVmSRjv9vuTE6400oAQ"),
    //     );
    
    //     try {
    //       const querySnapshot = await getDocs(q);
    //       const productsData = [];
    //       querySnapshot.forEach((doc) => {
    //         productsData.push(doc.data());
    //       });
    //       setProducts(productsData);
    //     } catch (err) {
    //       setErr(true);
    //     }
    //     console.log(product)
      const date = new Date();
      const time = date.getTime();
      console.log(shoppingCart)
      await setDoc(doc(db, 'Buyer-Info','Buyer-Info' + user.uid+ '_' + time), {
        //SellerName: product.productSeller,
        productID: shoppingCart[count].productID,
        BuyerName: displayName,
        BuyerEmail: email,
        BuyeCell: cell,
        BuyerAddress: address,
        BayerPayment: totalPrice,
        BuyerQuantity: totalQty
      });
      console.log(count)
      await deleteDoc(doc(db, "Products", shoppingCart[count].productID));
      
      count=count+1;
    }

    

      setCell('');
      setAddress('');
      dispatch({ type: 'EMPTY' });

      setTimeout(() => {
        setSuccessMsg('Your order has been placed successfully. You will be redirected to the Home Page!');
        navigate('/home');
      }, 5000);
    }
  }

  return (
    <>
      <div className='container'>
        <br />
        <h2>Cashout Details</h2>
        <br />
        {successMsg && <div className='success-msg'>{successMsg}</div>}
        <form autoComplete="off" className='form-group' onSubmit={cashoutSubmit}>
          <label htmlFor="name">Name</label>
          <input type="text" className='form-control' required
            value={displayName} disabled />
          <br />
          <label htmlFor="email">Email</label>
          <input type="email" className='form-control' required
            value={email} disabled />
          <br />
          <label htmlFor="Cell No">Cell No</label>
          <input type="number" className='form-control' required
            onChange={(e) => setCell(e.target.value)} value={cell} placeholder='eg 03123456789' />
          <br />
          <label htmlFor="Delivery Address">Delivery Address</label>
          <input type="text" className='form-control' required
            onChange={(e) => setAddress(e.target.value)} value={address} />
          <br />
          <label htmlFor="Price To Pay">Price To Pay</label>
          <input type="number" className='form-control' required
            value={totalPrice} disabled />
          <br />
          <label htmlFor="Total No of Products">Total No of Products</label>
          <input type="number" className='form-control' required
            value={totalQty} disabled />
          <br />
                    <button type="submit" className='btn btn-success btn-md mybtn'>SUBMIT</button>
                </form>
            </div>
        </>
    )
}

export default Cashout;

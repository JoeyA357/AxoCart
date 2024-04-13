import React, { useState } from 'react';
import { storage, db } from '../../firebase/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';

const AddProducts = () => {
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState(0);
    const [productImg, setProductImg] = useState(null);
    const [error, setError] = useState('');

    const types = ['image/png', 'image/jpeg']; //image types

    //product image handler
    const productImgHandler = (e) => {
        let selectedFile = e.target.files[0];
        if (selectedFile && types.includes(selectedFile.type)) {
            setProductImg(selectedFile);
            setError('');
        } else {
            setProductImg(null);
            setError('Please select a valid image type png or jpeg');
        }
    };

    // Add product to Firestore
    const addProductToFirestore = async (url) => {
        try {
            await addDoc(collection(db, 'Products'), {
                productImg: url,
                productName: productName,
                productPrice: Number(productPrice),
            });
            console.log('Product added successfully');
            // Display success message
            alert('Product added successfully');
            // Reset input fields
            setProductName('');
            setProductPrice(0);
            setProductImg(null);
        } catch (err) {
            console.error('Error adding product to Firestore:', err);
            setError(err.message);
        }
    };

    // Upload image to Firebase Storage
    const uploadImageToStorage = async () => {
        try {
            const storageRef = ref(storage, `product-images/${productImg.name}`);
            await uploadBytes(storageRef, productImg);
            const url = await getDownloadURL(storageRef);
            console.log('Image uploaded successfully');
            await addProductToFirestore(url);
        } catch (err) {
            console.error('Error uploading image to storage:', err);
            setError(err.message);
        }
    };

    // Add product from submit event
    const addProduct = async (e) => {
        e.preventDefault();

        if (!productImg) {
            setError('Please select an image');
            return;
        }

        try {
            await uploadImageToStorage();
        } catch (err) {
            console.error('Error adding product:', err);
            setError(err.message);
        }
    };

    return (
        <div className='container'>
            <br />
            <h2>ADD PRODUCTS</h2>
            <hr />
            <form autoComplete='off' className='form-group' onSubmit={addProduct}>
                <label htmlFor='product-name'>Product Name</label>
                <br />
                <input
                    type='text'
                    className='form-control'
                    required
                    onChange={(e) => setProductName(e.target.value)}
                    value={productName}
                />
                <br />
                <label htmlFor='product-price'>Product Price</label>
                <br />
                <input
                    type='number'
                    className='form-control'
                    required
                    onChange={(e) => setProductPrice(e.target.value)}
                    value={productPrice}
                />
                <br />
                <label htmlFor='product-img'>Product Image</label>
                <br />
                <input type='file' className='form-control' onChange={productImgHandler} id='file' />
                <br />
                <button className='btn btn-success btn-md mybtn'>ADD</button>
            </form>
            {error && <span>{error}</span>}
        </div>
    );
};

export default AddProducts;

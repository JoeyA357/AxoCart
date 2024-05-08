import React, { useState } from 'react';
import { auth,storage, db } from '../../firebase/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';

const AddProducts = () => {
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState(0);
    const [productImg, setProductImg] = useState(null);
    const [productDescription, setProductDescription] = useState('');
    const [error, setError] = useState('');
    const user = auth.currentUser;

    const types = ['image/png', 'image/jpeg']; // image types

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

    const addProductToFirestore = async (url) => {
        try {
            await addDoc(collection(db, 'Products'), {
                productSeller: user.uid,
                productImg: url,
                productName: productName,
                productPrice: Number(productPrice),
                productDescription: productDescription
            });
            alert('Product added successfully');
            setProductName('');
            setProductPrice(0);
            setProductImg(null);
            setProductDescription('');
        } catch (err) {
            console.error('Error adding product to Firestore:', err);
            setError(err.message);
        }
    };

    const uploadImageToStorage = async () => {
        if (!productImg) {
            setError('Please select an image');
            return;
        }

        try {
            const storageRef = ref(storage, `product-images/${productImg.name}`);
            const snapshot = await uploadBytes(storageRef, productImg);
            const url = await getDownloadURL(snapshot.ref);
            await addProductToFirestore(url);
        } catch (err) {
            console.error('Error uploading image to storage:', err);
            setError(err.message);
        }
    };

    const addProduct = async (e) => {
        e.preventDefault();
        await uploadImageToStorage();
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
                <label htmlFor='product-name'>Product Description</label>
                <br />
                <input
                    type='text'
                    className='form-control'
                    required
                    onChange={(e) => setProductDescription(e.target.value)}
                    value={productDescription}
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

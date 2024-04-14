import React, { createContext, useEffect, useState } from 'react';
import { db } from '../firebase/firebase';
import { collection, onSnapshot } from 'firebase/firestore';

export const ProductsContext = createContext();

export const ProductsContextProvider = ({ children }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const productsCollectionRef = collection(db, 'Products');
        const unsubscribe = onSnapshot(productsCollectionRef, (snapshot) => {
            const fetchedProducts = snapshot.docs.map((doc) => ({
                productID: doc.id,
                productName: doc.data().productName,
                productPrice: doc.data().productPrice,
                productImg: doc.data().productImg,
            }));
            setProducts(fetchedProducts);
        });

        return () => unsubscribe();
    }, []);

    return (
        <ProductsContext.Provider value={{ products: [...products] }}>
            {children}
        </ProductsContext.Provider>
    );
};

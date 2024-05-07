import React, { createContext, useState } from 'react';

export const ProductInfoContext = createContext();

export const ProductInfoContextProvider = ({ children }) => {
    const [prod, setProd] = useState(null)
    return (
        <ProductInfoContext.Provider value={{ prod, setProd }}>
            {children}
        </ProductInfoContext.Provider>
    );
}

import React, { createContext, useReducer } from 'react';
import { cartReducer } from '../contexts/cartReducer';

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
    const [cart, dispatch] = useReducer(cartReducer, { shoppingCart: [], totalPrice: 0, totalQty: 0 });
    return (
        <CartContext.Provider value={{ ...cart, dispatch }}>
            {children}
        </CartContext.Provider>
    );
}

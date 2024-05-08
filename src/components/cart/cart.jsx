import React, { useContext, useEffect } from 'react';
import { CartContext } from '../../contexts/cartContext';
import { Icon } from 'react-icons-kit'
import { ic_add } from 'react-icons-kit/md/ic_add'
import { ic_remove } from 'react-icons-kit/md/ic_remove'
import { iosTrashOutline } from 'react-icons-kit/ionicons/iosTrashOutline'
import { Link } from 'react-router-dom'
import { Cashout } from '../cashout/cashout';

const Cart = () => {
    const { shoppingCart, totalPrice, totalQty, dispatch } = useContext(CartContext);

    console.log(shoppingCart)
    return (
        <>
            {shoppingCart.length !== 0 && <h1>Cart</h1>}
            <div className='cart-container'>
                {shoppingCart.length === 0 && (
                    <>
                        <div>No items are in your cart or slow internet causing trouble (Refresh the page)</div>
                        <div><Link to="/home">Return to Home page</Link></div>
                    </>
                )}
                {shoppingCart && shoppingCart.map(cart => (
                    <div className='cart-card' key={cart.productID}>
                        <div className='cart-img'>
                            <img src={cart.productImg} alt="not found" />
                        </div>
                        <div className='cart-name'>{cart.productName}</div>
                        <div className='cart-price-orignal'>$ {cart.productPrice}.00</div>
                        {/* <div className='inc' onClick={() => dispatch({ type: 'INC', id: cart.productID, cart })}>
                            <Icon icon={ic_add} size={24} />
                        </div> */}
                        <div className='quantity'>{cart.qty}</div>
                        {/* <div className='dec' onClick={() => dispatch({ type: 'DEC', id: cart.productID, cart })}>
                            <Icon icon={ic_remove} size={24} />
                        </div> */}
                        <div className='cart-price'>
                            $ {cart.TotalProductPrice}.00
                        </div>
                        <button className='delete-btn' onClick={() => dispatch({ type: 'DELETE', id: cart.productID, cart })}>
                            <Icon icon={iosTrashOutline} size={24} />
                        </button>
                    </div>
                ))}
                {shoppingCart.length > 0 && (
                    <div className='cart-summary'>
                        <div className='cart-summary-heading'>
                            Cart-Summary
                        </div>
                        <div className='cart-summary-price'>
                            <span>Total Price</span>
                            <span>{totalPrice}</span>
                        </div>
                        <div className='cart-summary-price'>
                            <span>Total Qty</span>
                            <span>{totalQty}</span>
                        </div>
                        <Link to='/cashout' className='cashout-link'>
                            <button className='btn btn-success btn-md' style={{ marginTop: 5 + 'px' }}>
                                Cash on delivery
                            </button>
                        </Link>
                    </div>
                )}
            </div>
        </>
    )
}

export default Cart;

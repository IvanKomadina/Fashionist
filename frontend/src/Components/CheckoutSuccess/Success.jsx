import React, { useContext, useEffect } from 'react'
import './CheckoutSuccess.css'
import check_icon from '../Assets/check_icon.png'
import { ShopContext } from '../../Context/ShopContext'
import { useNavigate } from 'react-router-dom'

const Success = () => {
  const navigate = useNavigate();
  const {clearCart} = useContext(ShopContext)

  useEffect(() => {
    if (localStorage.getItem('checkout')) {
      alert('Checkout completed.')
      localStorage.removeItem('cartItems');
      localStorage.removeItem('checkout');
      clearCart();
    } else {
      navigate('/')
    } 
  }, [clearCart, navigate]);

  return (
    <div className="success-container">
      <div className="message">
          <img src={check_icon} alt="" className="icon" />
          <p>Successful Checkout</p>
      </div>
    </div>
  )
}

export default Success
import React, {useEffect} from 'react'
import './CheckoutSuccess.css'
import fail_icon from '../Assets/fail_icon.png'
import { useNavigate } from 'react-router-dom'

const Cancel = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('checkout')) {
      localStorage.removeItem('checkout')
    }
  }, [navigate]);
  return (
    <div className="success-container">
      <div className="message">
          <img src={fail_icon} alt="" className="icon" />
          <p>Checkout Canceled</p>
      </div>
    </div>
  )
}

export default Cancel
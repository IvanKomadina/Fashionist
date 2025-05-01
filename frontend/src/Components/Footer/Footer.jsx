import React from 'react'
import './Footer.css'
import logo from '../Assets/logo.png'

const Footer = () => {
  return (
    <div className="footer">
        <hr />
        <div className="footer-logo">
            <img src={logo} alt="" />
            <p>FASHIONIST</p>
        </div>
        <div className="footer-copyright">
            <p>Copyright @2024 - All Rights Reserved.</p>
        </div>
    </div>
  )
}

export default Footer
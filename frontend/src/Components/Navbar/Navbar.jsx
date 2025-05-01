import React, { useContext } from "react";
import { Link } from "react-router-dom";
import './Navbar.css';
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import heart_icon from '../Assets/heart_icon.png'
import profile_icon from '../Assets/profile_icon.png'
import { ShopContext } from "../../Context/ShopContext"

const Navbar = () => {
  const {cartItems, getTotalCartItems} = useContext(ShopContext);
  const token = localStorage.getItem('auth-token');

  const restoreStock = () => {
    if (cartItems.length > 0) {
      cartItems.forEach((item) => {
        fetch('http://localhost:4000/api/products/incrementstock/' + item.id, {
          method: 'PATCH',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              size: item.size,
              quantity: item.quantity
          })
        });
      })
    }
  }

  return (
    <div className="navbar">
        <div className="navbar-top">
          <div className="nav-logo">
              <img src={logo} alt="" />
              <p>FASHIONIST</p>
              {token ? <Link to='/profile'><img className="profile-icon-img" src={profile_icon} alt="" /></Link> : <></>}
          </div>
          <div className="nav-login-cart">
            {token 
            ? <button onClick={() => {
              restoreStock();
              localStorage.removeItem('auth-token');
              localStorage.removeItem('cartItems');
              window.location.replace('/')}}>Logout</button>
            : <Link to='/login'><button>Login</button></Link>}
      
            {token 
            ? <><Link to='/cart'><img src={cart_icon} alt="" /></Link>
              <div className="nav-cart-count">{getTotalCartItems()}</div>
              <Link to='/favorites'><img src={heart_icon} alt="" /></Link></>
            : <></>}
          </div>
        </div>
        <div className="navbar-bottom">
          <ul className="nav-menu">                                                                                                       
              <li><Link style={{ textDecoration: 'none' }} to='/'>Shop</Link></li>
              <li><Link style={{ textDecoration: 'none' }} to='/men'>Men</Link></li>
              <li><Link style={{ textDecoration: 'none' }} to='/women'>Women</Link></li>
              <li><Link style={{ textDecoration: 'none' }} to='/kids'>Kids</Link></li>
          </ul>
        </div>
    </div>
  )
}

export default Navbar
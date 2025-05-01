import React from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'

const Navbar = () => {
  return (
    <div className="navbar">
        <div className="nav-logo">
            <img src={logo} alt="" className="nav-logo" />
            <p>FASHIONIST</p>
        </div>
        <div className='nav-right'>
          {localStorage.getItem('auth-token') 
          ? <button onClick={() => {
            localStorage.removeItem('auth-token');
            window.location.replace('/')}}>Logout</button> : <></>}
          <p className='admin-panel'>Admin Panel</p>
        </div>
</div>
  )
}

export default Navbar
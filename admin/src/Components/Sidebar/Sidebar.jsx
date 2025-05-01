import React from 'react'
import './Sidebar.css'
import { Link } from 'react-router-dom'
import add_product_icon from '../../assets/add_product_icon.png'
import product_list_icon from '../../assets/product_list_icon.png'
import user_list_icon from '../../assets/user_list_icon.png'
import order_icon from '../../assets/order_icon.png'
import analytics_icon from '../../assets/analytics_icon.png'

const Sidebar = () => {
  return (
    <div className='sidebar'>
        <Link to={'/productlist'} style={{textDecoration:"none"}}>
            <div className="sidebar-item">
                <img src={product_list_icon} alt="" />
                <p>Product list</p>
            </div>
        </Link>
        <Link to={'/addproduct'} style={{textDecoration:"none"}}>
            <div className="sidebar-item">
                <img src={add_product_icon} alt="" />
                <p>Add product</p>
            </div>
        </Link>
        <Link to={'/userlist'} style={{textDecoration:"none"}}>
            <div className="sidebar-item">
                <img src={user_list_icon} alt="" />
                <p>User list</p>
            </div>
        </Link>
        <Link to={'/orderlist'} style={{textDecoration:"none"}}>
            <div className="sidebar-item">
                <img src={order_icon} alt="" />
                <p>Order list</p>
            </div>
        </Link>
        <Link to={'/analytics'} style={{textDecoration:"none"}}>
            <div className="sidebar-item">
                <img src={analytics_icon} alt="" />
                <p>Analytics</p>
            </div>
        </Link>
    </div>
  )
}

export default Sidebar
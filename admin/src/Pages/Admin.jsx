import React from 'react'
import './CSS/Admin.css'
import Sidebar from '../Components/Sidebar/Sidebar'
import { Routes, Route } from 'react-router-dom'
import AddProduct from '../Components/AddProduct/AddProduct'
import ProductList from '../Components/ProductList/ProductList'
import UpdateProduct from '../Components/UpdateProduct/UpdateProduct'
import UserList from '../Components/UserList/UserList'
import OrderList from '../Components/OrderList/OrderList'
import Analytics from '../Components/Analytics/Analytics'

const Admin = () => {
  return (
    <div className="admin">
        <Sidebar />
        <Routes>
          <Route path='/' element={<ProductList />} />
          <Route path='/productlist' element={<ProductList/>}/>
          <Route path='/addproduct' element={<AddProduct/>}/>
          <Route path='/updateproduct/:id' element={<UpdateProduct/>} />
          <Route path='/userlist' element={<UserList/>} />
          <Route path='/orderlist' element={<OrderList/>} />
          <Route path='/analytics' element={<Analytics/>} />
        </Routes>
    </div>
  )
}

export default Admin
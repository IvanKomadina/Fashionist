import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './ProductList.css'
import cross_icon from '../../assets/cross_icon.png'
import update_icon from '../../assets/update_icon.png'

const ProductList = () => {
  const [allproducts, setAllProducts] = useState([]);
  const [productsLoad, setProductsLoad] = useState(false);

  const fetchAllProducts = async () => {
    await fetch('http://localhost:4000/api/products/allproducts')
    .then((res) => res.json())
    .then((data) => {setAllProducts(data)});

    setProductsLoad(true);
  }

  useEffect(() => {
    fetchAllProducts();
    window.scrollTo(0, 0);
  }, [])

  const delete_product = async (id) => {
    await fetch('http://localhost:4000/api/products/deleteproduct/' + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }          
    })
    await fetchAllProducts();
  }

  if (!productsLoad) {
    return <div className='loading'>Loading...</div>;
  }
  
  return (
    <div className="list-product">
      <h1>All products</h1>
      <div className="listproduct-allproducts">
        <hr />
        {allproducts.map((product, i) => (
          <div key={i}>
            <div className="listproduct-format">
              <img src={product.image} alt="" className="listproduct-product-icon" />
              <p>{product.name}</p>
              <p className='listproduct-hide'>{product.description}</p>
              <p className='listproduct-hide'>{product.price}€</p>
              <p className='listproduct-hide'>{product.category}</p>
              <p className='listproduct-hide'>{product.type}</p>
              <Link to={`/updateproduct/${product._id}`}><img className="listproduct-right-icon" src={update_icon} alt="" /></Link>
              <img onClick={() => {delete_product(product._id)}} className="listproduct-right-icon" src={cross_icon} alt="" />
            </div>
            <hr />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductList
import React, { useContext, useState, useEffect, useCallback } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { useParams } from 'react-router-dom'
import './CSS/Product.css'

const Product = () => {
  const [size, setSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
  const {all_products, addToCart, addToFavorites, removeFromFavorites, isFavorite} = useContext(ShopContext);
  const {id} = useParams();
  const token = localStorage.getItem('auth-token');
  const [stock, setStock] = useState({});

  const fetchStock = useCallback(async () => {
    await fetch('http://localhost:4000/api/products/getstock/' + id)
    .then((res) => res.json())
    .then((data) => setStock(data)) 
  }, [id]);

  useEffect(() => {
    fetchStock();
  }, [fetchStock])

  const product = all_products.find((e) => e._id === id);

  const handleFavoritesToggle = () => {
    if (isFavorite(product._id)) {
        removeFromFavorites(product._id);
    } else {
        addToFavorites(product._id);
    }
  };

  const changeQuantity = (e) => {
    setQuantity(Number(e.target.value));
  };

  if (!product) {
    return <div className='loading'>Loading...</div>;
  }

  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <img className="productdisplay-main-img" src={product.image} alt="" />
      </div>
      <div className="productdisplay-right">
          <h1>{product.name}</h1>
          <div className="productdisplay-right-prices">
            <div className="productdisplay-right-price">
              Price: {product.price}€
            </div>
            {product.discount && (
            <div className="productdisplay-right-old-price">
              {product.old_price}€
            </div>
            )}
          </div>
          <div className="productdisplay-right-description">
            {product.description}
          </div>
          <div className="productdisplay-right-size">
            <h1>Select size</h1>
            <div className="productdisplay-right-sizes">
            {sizes.map((buttonSize) => (
              <button 
                key={buttonSize} 
                onClick={() => {setSize(buttonSize);setQuantity(1);}}
                className={size === buttonSize ? 'chosen-size-button' : 'size-button'}
                disabled={!token || stock[buttonSize] === 0}>
                  {buttonSize}
              </button>
            ))}
            </div>
          </div>
          {size !== '' &&
          <div className='quantity-enter'>
            <p>Quantity:</p>
            <input type='number' onChange={changeQuantity} name='quantity' value={quantity} min={1} max={stock[size]}></input>
          </div>
          }
          <div className="product-buttons">
            <button className="addToCart-button" 
            onClick={() => {addToCart(product._id, product.name, product.price, product.type, size, quantity); stock[size] -= quantity;}} 
            disabled={!token || size === '' || stock[size] === 0}>
              ADD TO CART
            </button>
            <button className="fav-button" onClick={handleFavoritesToggle} disabled={!token}>
              {isFavorite(product._id) ? 'REMOVE FROM FAVORITES' : 'ADD TO FAVORITES'}
            </button>
          </div>
      </div>
    </div>
  )
}

export default Product
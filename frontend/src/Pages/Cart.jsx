import React, { useContext, useState, useEffect } from 'react'
import './CSS/Cart.css'
import { ShopContext } from "../Context/ShopContext"
import cross_icon from '../Components/Assets/cross_icon.png'

const Cart = () => {
  const {all_products, cartItems, removeFromCart, getTotalCartPrice} = useContext(ShopContext);
  const [userId, setUserId] = useState("")
  const [userEmail, setUserEmail] = useState("")

    const fetchUserId = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/users/singleuser', {
          headers: {
            'auth-token': localStorage.getItem('auth-token')
          }
        });
        const data = await response.json();
        setUserId(data._id);
        setUserEmail(data.email);
      } catch (error) {
        console.error('Failed to fetch user ID:', error);
      }
    };

    useEffect(() => {
      fetchUserId();
    }, []);


    const createCheckout = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/orders/checkoutsession', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            items: cartItems,
            userId: userId,
            userEmail: userEmail
          }),
        });
        if (!response.ok) {
          throw new Error('Failed to create checkout session');
        }
        const { url } = await response.json();

        localStorage.setItem('checkout', 'true');

        window.location = url; // Redirect to Stripe Checkout
      } catch (error) {
        console.error('Error creating checkout session:', error.message);
      }
    };    

  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Size</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {cartItems.map((cartItem, i) => {
          const product = all_products.find((product) => product._id === cartItem.id);

          if (!product) {
            return <div className='Loading' key={i}>Loading...</div>;
          }

          return <div key={i}>
                   <div className="cartitems-format cartitems-format-main">
                      <img src={product.image} alt="" className="carticon-product-icon" />
                      <p className="item-name">{product.name}</p>
                      <p className="single-price">{product.price}€</p>
                      <p className="cartitems-quantity">{cartItem.quantity}</p>
                      <p>{cartItem.size}</p>
                      <p>{product.price * cartItem.quantity}€</p>
                      <img className="cartitems-remove-icon" src={cross_icon} onClick={() => {removeFromCart(cartItem.id, cartItem.size, cartItem.quantity)}} alt="" />
                  </div>
                  <hr />
                </div>
      })}
       <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Price</h1>
          <div>
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>{getTotalCartPrice()}€</h3>
            </div>
            <hr />
          </div>
            <button onClick={() => {createCheckout()}} disabled={cartItems.length === 0}>PROCEED TO CHECKOUT</button>
        </div>
      </div>
    </div>
  )
}

export default Cart
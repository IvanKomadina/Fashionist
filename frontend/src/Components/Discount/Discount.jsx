import React, { useContext } from 'react'
import './Discount.css'
import DiscountItem from '../DiscountItem/DiscountItem'
import { ShopContext } from '../../Context/ShopContext'

const Discount = () => {
  const {all_products} = useContext(ShopContext);

  const discount_products = all_products.filter(item => item.discount === true);
  
  return (
    <div className="discount">
        {discount_products.length > 0 ? <h1>BEST OFFERS</h1> : <></>}
        <hr/>
        <div className="discount-item">
            {discount_products.map((item) => {
                return <DiscountItem 
                          key={item._id} 
                          id={item._id} 
                          name={item.name} 
                          image={item.image} 
                          price={item.price} 
                          old_price={item.old_price} 
                        />
            })}
        </div>
    </div>
  )
}

export default Discount
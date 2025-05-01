import React from 'react'
import { Link } from 'react-router-dom'
import './DiscountItem.css'

const DiscountItem = (props) => {
  return (
    <div className="item">
        <Link to={`/product/${props.id}`} onClick={() => window.scrollTo(0,0)}><img src={props.image} alt="" /></Link>
        <p>{props.name}</p>
        <div className="item-prices">
            <div className="item-price-new">
                {props.price}€
            </div>
            <div className="item-price-old">
                {props.old_price}€
            </div>
        </div>
    </div>
  )
}

export default DiscountItem
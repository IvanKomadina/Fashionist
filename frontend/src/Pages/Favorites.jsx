import React, { useContext } from 'react'
import './CSS/Favorites.css'
import { ShopContext } from '../Context/ShopContext'
import Item from '../Components/Item/Item'

const Favorites = () => {
    const {all_products, favorites, removeFromFavorites} = useContext(ShopContext);

    return (
        <div className="favorite-products">
            {favorites.map((id) => {
                const product = all_products.find((product) => product._id === id);
                return (
                    <div key={product._id} className="fav-item-container">
                        <Item 
                            id={product._id} 
                            name={product.name} 
                            image={product.image} 
                            price={product.price} 
                            discount={product.discount}
                            old_price={product.old_price}   
                        />
                        <button onClick={() => {removeFromFavorites(product._id)}} className="favorite-button">REMOVE FROM FAVORITES</button>
                    </div>
                )
            })}
        </div>
    )
}

export default Favorites
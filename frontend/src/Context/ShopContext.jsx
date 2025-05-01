import React, { createContext, useEffect, useState, useCallback } from "react";

// create context and initialize to null
export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
    const [all_products, setAllProducts] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const token = localStorage.getItem('auth-token');

    const [cartItems, setCartItems] = useState(() => {
        const savedCartItems = localStorage.getItem('cartItems');
        return savedCartItems ? JSON.parse(savedCartItems) : [];
    });

    useEffect(() => {
        fetch('http://localhost:4000/api/products/allproducts')
        .then((response) => response.json())
        .then((data) => setAllProducts(data))

        if (token) {
            fetch('http://localhost:4000/api/users/getfavorites', {
                headers: {
                    'auth-token': token
                }
            })
            .then((response) => response.json())
            .then((data) => setFavorites(data.favorites))
        }
    }, [token])

    useEffect(() => {
        // Save cart items to local storage whenever cartItems changes
        if (token) {
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
        }
    }, [cartItems, token]);

    useEffect(() => {
        if (!token && (localStorage.getItem('cartItems'))) {
            localStorage.removeItem('cartItems');
        }
    }, [token]);

    // update cart state
    const addToCart = (itemID, name, price, type, size, quantity) => {
        setCartItems((prev) => {
            const existingCartItem = prev.find(item => item.id === itemID && item.size === size);
            // if the item is already in the cart, increase its quantity
            if (existingCartItem) {
                return prev.map(item => item.id === itemID && item.size === size ? { ...item, quantity: item.quantity + quantity } : item);
            }
            return [...prev, { id: itemID, name, price, type, size, quantity}];
        });

        fetch('http://localhost:4000/api/products/decrementstock/' + itemID, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                size: size,
                quantity: quantity
            })
        });
    }    

    const removeFromCart = (itemID, size, cartQuantity) => {
        setCartItems((prev) => {
            return prev.filter(item => !(item.id === itemID && item.size === size));
        });

        fetch('http://localhost:4000/api/products/incrementstock/' + itemID, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                size: size,
                quantity: cartQuantity
            })
        });
    }  

    const clearCart = useCallback(() => {
        setCartItems([])
    }, [])

    const addToFavorites = (itemID) => {
        setFavorites((prev) => [...prev, itemID]);

        fetch('http://localhost:4000/api/users/addtofavorites', {
            method: 'POST',
            headers: {
                'auth-token': token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({itemID: itemID}),
        })
    };

    const removeFromFavorites = (itemID) => {
        setFavorites((prev) => prev.filter(id => id !== itemID));

        fetch('http://localhost:4000/api/users/removefromfavorites', {
            method: 'PATCH',
            headers: {
                'auth-token': token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({itemID: itemID}),
        })
    };

    const isFavorite = (itemID) => {
        return favorites.includes(itemID);
    };

    const getTotalCartPrice = () => {
        return cartItems.reduce((totalPrice, cartItem) => {
            const product = all_products.find(product => product._id === cartItem.id);
            if (product) {
                return totalPrice + (product.price * cartItem.quantity);
            }
            return totalPrice;
        }, 0);
    }

    const getTotalCartItems = () => {
        return cartItems.reduce((totalItems, cartItem) => totalItems + cartItem.quantity, 0);
    }

    // data to be provided to the components that use context
    const contextValue = {
        all_products, 
        cartItems,
        favorites, 
        addToCart,  
        removeFromCart, 
        clearCart,
        getTotalCartPrice, 
        getTotalCartItems,
        addToFavorites,
        removeFromFavorites,
        isFavorite
    };

    return (
        // wrap the components and provide them with context value
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;
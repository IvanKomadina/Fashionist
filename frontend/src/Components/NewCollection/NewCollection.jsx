import React, { useEffect, useState } from "react"
import './NewCollection.css'
import Item from "../Item/Item"

const NewCollection = () => {
  const [new_collection, setNewCollection] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/products/newcollection')
    .then((response) => response.json())
    .then((data) => setNewCollection(data))
}, [])

  return (
    <div className="new-collections">
      <h1>NEW COLLECTION</h1>
      <hr/>
      <div className="collections">
          {new_collection.map((item) => {
              return <Item 
                      key={item._id} 
                      id={item._id} 
                      name={item.name} 
                      image={item.image} 
                      price={item.price} 
                      discount={item.discount}
                      old_price={item.old_price}  
                      />
          })}
      </div>
    </div>
  )
}

export default NewCollection
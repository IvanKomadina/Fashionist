import React, {useState, useEffect} from 'react'
import './OrderList.css'

const OrderList = () => {
    const [allOrders, setAllOrders] = useState([]);
    const [ordersLoad, setOrdersLoad] = useState(false);

    const formatDate = (date) => {
      const dateString = date.toString();
      const [dateStr] = dateString.split('T');
      return dateStr; // 'YYYY-MM-DD' format
    };

    const fetchAllOrders = async () => {
      await fetch('http://localhost:4000/api/orders/allorders')
      .then((res) => res.json())
      .then((data) => {setAllOrders(data)});

      setOrdersLoad(true);
    }
  
    useEffect(() => {
      fetchAllOrders();
      window.scrollTo(0, 0);
    }, [])

  if (!ordersLoad) {
    return <div className='loading'>Loading...</div>;
  }
    
  return (
    <div className='order-list'>
        <h1>All orders</h1>
        {allOrders.map((order, i) => (
            <div key={i}>
                <div className='order-customer'>
                    <p>Customer:</p>
                    <p>{order.customerEmail}</p>
                </div>
                <div className='order-price'>
                    <p>Price:</p>
                    <p>{order.price}€</p>
                </div>
                <div className='order-date'>
                    <p>Date:</p>
                    <p>{formatDate(order.date)}</p>
                </div>
            </div>
        ))}
    </div>
  )
}

export default OrderList
import React, {useState, useEffect} from 'react'
import './UserOrderList.css'

const UserOrderList = () => {
    const [userId, setUserId] = useState('');
    const [userOrders, setUserOrders] = useState([]);
    const [ordersLoad, setOrdersLoad] = useState(false);

    const formatDate = (date) => {
        const dateString = date.toString();
        const [dateStr] = dateString.split('T'); // split at the 'T' character
        return dateStr; // 'YYYY-MM-DD' format
    };

    useEffect(() => {
        fetch('http://localhost:4000/api/users/singleuser', {
          headers: {
              'auth-token': localStorage.getItem('auth-token')
          }
        })
        .then((response) => response.json())
        .then((data) => setUserId(data._id))
      }, [])

      useEffect(() => {
        if (userId !== '') {
            fetch('http://localhost:4000/api/orders/ordersbyuser/' + userId)
            .then((response) => response.json())
            .then((data) => setUserOrders(data))

            setOrdersLoad(true);
        }
      }, [userId])

  if (!ordersLoad) {
    return <div className='loading'>Loading...</div>;
  }

  return (
    <div className='order-list'>
        <h1>Your orders</h1>
        {userOrders.map((order, i) => (
            <div key={i}>
                <div className='order-price'>
                    <p>Price:</p>
                    <p>€{order.price}</p>
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

export default UserOrderList
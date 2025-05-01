import React from 'react'
import './Analytics.css'
import { useState, useEffect } from 'react'
import MonthChart from './Charts/MonthChart'
import ClothesChart from './Charts/ClothesChart'

const Analytics = () => {
  const [orderCount, setOrderCount] = useState("");
  const [customerCount, setCustomerCount] = useState("");
  const [totalEarnings, setTotalEarnings] = useState("");
  const [earningsByMonth, setEarningsByMonth] = useState([]);
  const [tshirtCount, setTshirtCount] = useState("");
  const [hoodieCount, setHoodieCount] = useState("");
  const [pantsCount, setPantsCount] = useState("");
  const [jacketCount, setJacketCount] = useState("");
  const [clothesCount, setClothesCount] = useState("");

  const fetchOrderCount = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/orders/ordercount');
      const data = await response.json();
      setOrderCount(data.count);
    } catch (error) {
      console.error('Failed to fetch order count:', error);
    }
  };

  const fetchCustomerCount = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/orders/customercount');
      const data = await response.json();
      setCustomerCount(data.count);
    } catch (error) {
      console.error('Failed to fetch order count:', error);
    }
  };
  
  const fetchTotalEarnings = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/orders/totalearnings');
      const data = await response.json();
      setTotalEarnings(data.total);
    } catch (error) {
      console.error('Failed to fetch order count:', error);
    }
  };

  const fetchEarningsByMonth = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/orders/earningsbymonth');
      const data = await response.json();
      setEarningsByMonth(data.earningsByMonth);
    } catch (error) {
      console.error('Failed to fetch order count:', error);
    }
  };

  const fetchTshirtCount = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/orders/tshirtcount');
      const data = await response.json();
      setTshirtCount(data.soldCount);
    } catch (error) {
      console.error('Failed to fetch order count:', error);
    }
  };

  const fetchHoodieCount = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/orders/hoodiecount');
      const data = await response.json();
      setHoodieCount(data.soldCount);
    } catch (error) {
      console.error('Failed to fetch order count:', error);
    }
  };

  const fetchPantsCount = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/orders/pantscount');
      const data = await response.json();
      setPantsCount(data.soldCount);
    } catch (error) {
      console.error('Failed to fetch order count:', error);
    }
  };

  const fetchJacketCount = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/orders/jacketcount');
      const data = await response.json();
      setJacketCount(data.soldCount);
    } catch (error) {
      console.error('Failed to fetch order count:', error);
    }
  };

  const fetchClothesCount = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/orders/clothescount');
      const data = await response.json();
      setClothesCount(data.totalSold);
    } catch (error) {
      console.error('Failed to fetch order count:', error);
    }
  };

  useEffect(() => {
    fetchOrderCount();
    fetchCustomerCount();
    fetchTotalEarnings();
    fetchEarningsByMonth();
    fetchTshirtCount();
    fetchHoodieCount();
    fetchPantsCount();
    fetchJacketCount();
    fetchClothesCount();
  }, [])

  const percentage = (count) => {
    return clothesCount > 0 ? ((count / clothesCount) * 100).toFixed(0) : 0;
  };

  return (
    <div className='analytics'>
      <div>
        <h1>Analytics</h1>
        <h3>Totals</h3>
        <div className='general-analytics'>
          <p>Total Orders: {orderCount}</p>
          <p>Total customers: {customerCount}</p>
          <p>Total earnings: {totalEarnings}€</p>
        </div>

        <h3>Clothes sold</h3>
        <div className='type-analytics'>
          <div className='clothes-chart'>
            <ClothesChart 
              tshirtCount={tshirtCount} 
              hoodieCount={hoodieCount} 
              pantsCount={pantsCount} 
              jacketCount={jacketCount} 
              clothesCount={clothesCount} 
            />
          </div>
{/*           <p>T-shirts sold: {percentage(tshirtCount)}%</p>
          <p>Hoodies sold: {percentage(hoodieCount)}%</p>
          <p>Pants sold: {percentage(pantsCount)}%</p>
          <p>Jackets sold: {percentage(jacketCount)}%</p> */}
        </div>
      </div>

        <h3>Earnings by Month</h3>
        <div className="earnings-list">
{/*           {earningsByMonth.map((earning, i) => (
          <div key={i} className="earning-item">
            <p>{earning._id}</p>
            <p>{earning.total}€</p>
          </div>
        ))} */}
          <MonthChart earningsByMonth={earningsByMonth} />
        </div>
    </div>
  )
}

export default Analytics
import React, { useEffect, useState } from 'react'

import { BACKEND_URL } from '../../App.jsx';

import axios from "axios";

import { toast } from 'react-toastify';

import "./index.css"
import { assets } from '../../assets/assets.js';

const AdminOrders = ({ token }) => {

  const [orderList, setOrderList] = useState([]);

  // console.log(orderList)

  const FetchAllOrder = async () => {

    try {

      if (!token) return null;

      const response = await axios.post(BACKEND_URL + "/api/order/list", {}, { headers: { Authorization: `Bearer ${token}` } });

      if (response.data.success) {
        setOrderList(response.data.orders);
      } else {
        toast.error(response.data.message);
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  const onChangeStatus = async (e, orderId) => {
    try {

      const response = await axios.post(BACKEND_URL + "/api/order/status", { orderId, status: e.target.value }, { headers: { Authorization: `Bearer ${token}` } })
      if (response.data.success) {
        FetchAllOrder();
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    FetchAllOrder()
  }, [token])

  return (
    <main className='Admin_order_main_conatainer'>
      <h3 className='Order_heading'>Order Page</h3>
      <div className='Order_container'>
        {orderList.map((order, index) => (
          <div key={index} className='order_image_container'>
            <img src={assets.parcel_icon} alt="parcel_icons" className='parcel_icons' />
            <div className='Parcel_detailes_container'>
              <div className='Parcel_detailes_card'>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return <p key={index} className='parcel_name'>{item.name} X {item.quantity} <span>{item.size}</span></p>
                  } else {
                    return <p key={index} className='parcel_name'>{item.name} X {item.quantity} <span>{item.size}</span>,</p>
                  }
                })}
              </div>
              <p className='user_name user_name_active'>{order.address.firstName + " " + order.address.lastName}</p>
              <div className='user_address_container'>
                <p className='user_name'>{order.address.street + ","}</p>
                <p className='user_name'>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>
              </div>
              <p className='user_name'>{order.address.phone}</p>
            </div>
            <div className='Parcel_detailes_card'>
              <p className='user_name'>Items : {order.items.length}</p>
              <p className='user_name'>Method : {order.paymentMethod}</p>
              <p className='user_name'>Payment : {order.payment ? "Done" : "Pending"}</p>
              <p className='user_name'>Date : {new Date(order.date).toLocaleDateString()}</p>
            </div>
            <p className='user_name user_name_active'>${order.amount}</p>
            <select className='user_select' value={order.status} onChange={(e) => onChangeStatus(e, order._id)}>
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shippend">Shippend</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </main>
  )
}

export default AdminOrders

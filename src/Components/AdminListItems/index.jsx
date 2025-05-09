import React, { useEffect, useState } from 'react'

import axios from "axios";

import { BACKEND_URL } from '../../App.jsx';

import { toast } from 'react-toastify';

import "./index.css";

const AdminListItems = ({ token }) => {

  // console.log(token)

  const [AdminList, setAdminList] = useState([]);

  const FilterList = async () => {
    try {
      const response = await axios.get(BACKEND_URL + "/api/product/list")

      if (response.data.success) {
        setAdminList(response.data.products)
      } else {
        toast.error(response.data.message);
      }

    } catch (error) {
      toast.error(error.message);
    }
  }

  const RemoveItems = async (id) => {
    try {
      const response = await axios.post(BACKEND_URL + "/api/product/remove", { id }, { headers: { Authorization: `Bearer ${token}` } })
      if (response.data.success) {
        toast.success(response.data.message);
        await FilterList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    FilterList();
  }, [])

  return (
    <section className='Admin_list_container'>
      <p className='Admin_para'>All Products List</p>
      <div className='Admin_heading_container'>
        <b className='Admin_heading_para'>Image</b>
        <b className='Admin_heading_para'>Name</b>
        <b className='Admin_heading_para'>Category</b>
        <b className='Admin_heading_para'>Price</b>
        <b className='Admin_heading_para action'>Action</b>
      </div>

      <ul className='Admin_list_un_order_container'>
        {AdminList.map((items, index) => (
          <li key={index} className='Admin_items_list_container'>
            <img src={items.image[0]} alt={items.name} className='item_image' />
            <p className='item_name Admin_para'>{items.name}</p>
            <p className='item_category Admin_para'>{items.category}</p>
            <p className='item_price Admin_para'>${items.price}</p>
            <p onClick={() => RemoveItems(items._id)} className='item_action Admin_para'>X</p>
          </li>
        ))}
      </ul>

    </section>
  )
}

export default AdminListItems

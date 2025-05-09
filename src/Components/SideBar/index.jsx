import React from 'react'

import { NavLink } from 'react-router-dom'

import { assets } from '../../assets/assets'

import "./index.css"

const SideBar = () => {
  return (
    <main className='SideBar_container'>

      <NavLink to= "/add" className={({isActive}) => `Side_Bar_Nav_link ${isActive ? 'Side_Bar_active' : ''}`}>
      <img src= {assets.add_icon} alt='add_icons' className='Side_bar_icon'/>
      <p className='Side_Bar_Para'>Add Items</p>
      </NavLink>

      <NavLink to= "/list"  className={({isActive}) => `Side_Bar_Nav_link ${isActive ? 'Side_Bar_active' : ''}`}>
      <img src= {assets.order_icon} alt='order_icons' className='Side_bar_icon'/>
      <p className='Side_Bar_Para'>List Items</p>
      </NavLink>

      <NavLink to= "/order"  className={({isActive}) => `Side_Bar_Nav_link ${isActive ? 'Side_Bar_active' : ''}`}>
      <img src= {assets.order_icon} alt='order_icons' className='Side_bar_icon'/>
      <p className='Side_Bar_Para'>Orders</p>
      </NavLink>
    </main>
  )
}

export default SideBar

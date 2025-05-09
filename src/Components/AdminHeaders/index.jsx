import React from 'react'

import { assets } from "../../assets/assets.js"

import "./index.css"

const AdminHeaders = ({setToken}) => {
  return (
    <nav className='nav_bar_container'>
      <img src= {assets.logo} alt="logo" className='logo' />
      <button onClick={() => setToken('')} type='button' className='logout_btn'>Logout</button>
    </nav>
  )
}

export default AdminHeaders

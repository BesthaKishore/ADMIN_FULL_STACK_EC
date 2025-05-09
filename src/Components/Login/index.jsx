import React, { useState } from 'react'

import { BACKEND_URL } from '../../App.jsx';

import { toast } from 'react-toastify';

import axios from 'axios';

import "./index.css"

const Login = ({ setToken }) => {

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const AdminPanelHandler = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(BACKEND_URL + '/api/user/admin', { email, password })

      if (response.data.success) {
        setToken(response.data.token);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }

  }

  return (
    <section className='Login_section_contianer'>
      <form className='Form_container' onSubmit={AdminPanelHandler}>
        <h3 className='Form_heading'>Admin Panel</h3>
        <div className='Form_card_container'>
          <label className='Form_label'>Email</label>
          <input onChange={(e) => setEmail(e.target.value)} value={email} type='email' className='Form_input' placeholder='Your Email' required />
        </div>
        <div className='Form_card_container'>
          <label className='Form_label'>Password</label>
          <input onChange={(e) => setPassword(e.target.value)} value={password} type='password' className='Form_input' placeholder='Your Password' required />
        </div>
        <button type="submit" className='Login_btn'>Login</button>
      </form>
    </section>
  )
}

export default Login

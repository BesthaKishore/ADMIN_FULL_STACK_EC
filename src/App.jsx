import React, { useEffect, useState } from 'react';

import { Routes, Route, Navigate } from "react-router-dom"

import AdminHeaders from "./Components/AdminHeaders"

import SideBar from "./Components/SideBar"

import AdminAddItems from "./Components/AdminAddItems"

import AdminListItems from "./Components/AdminListItems"

import AdminOrders from "./Components/AdminOrders"

import Login from "./Components/Login"

import { ToastContainer } from 'react-toastify';

import "./App.css"

export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const App = () => {

  const [token, setToken] = useState(localStorage.getItem("token") ? localStorage.getItem("token") : '');

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token])


  return (
    <div className='Admin_app_main_container'>
      <ToastContainer />
      {token === "" ?
        (<Login setToken={setToken} />) :
        (
          <div className='App_Header_container'>
            <AdminHeaders setToken={setToken} />
            <div className='Admin_card_container'>
              <div className='Admin_side_bar_section'>
                <SideBar />

              </div>
              <div className='Admin_Nav_Items_container'>
                <Routes>
                  <Route path='/' element={<Navigate to="/add" />} />
                  <Route path='/add' element={<AdminAddItems token={token} />} />
                  <Route path='/list' element={<AdminListItems token={token} />} />
                  <Route path='/order' element={<AdminOrders token={token} />} />
                </Routes>
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default App;

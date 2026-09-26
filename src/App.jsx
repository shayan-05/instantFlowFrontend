import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './App.css'

import {login, logout} from "./store/authSlice"
import Header  from './components/header/Header.jsx'
import { Outlet } from 'react-router-dom'
import axios from "axios"
import socket from "./socket.js"

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const authStatus = useSelector((state) => state.auth.status)

  useEffect(() => {
    const getUser = async () => {
        try {
            const response = await axios.get(
          `${import.meta.env.VITE_URL}/user/current-user`,
          { withCredentials: true }
            );

            if (response.data?.data) {
                dispatch(login(response.data.data));
            } else {
                dispatch(logout());
            }
        } catch (error) {
            dispatch(logout());
        } finally {
            setLoading(false);
        }
    };

    getUser();
}, [dispatch]);

  useEffect(() => {
    if (loading) return

    if (authStatus) {
      if (!socket.connected) socket.connect()
    } else {
      socket.disconnect()
    }
  }, [authStatus, loading])
  
  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
        TODO:  <Outlet />
        </main>
   
      </div>
    </div>
  ) : null
}

export default App
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Add from './pages/Add.jsx';
import List from './pages/List.jsx';
import Orders from './pages/Orders.jsx';
import Login from './components/Login.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const backendUrl = import.meta.env.VITE_BACKEND_URL;

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  return (
    <div className='min-h-screen bg-gray-50'>
      <ToastContainer />
      {
        token === '' ? (
          <Login setToken={(token) => {
            setToken(token);
            localStorage.setItem('token', token);
          }} />
        ) : (
          <>
            <Navbar  setToken={setToken}/>
            <hr />
            <div className='flex w-full'>
              <Sidebar />
              <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base'>
                <Routes>
                  <Route path='/add' element={<Add  token={token}/>} />
                  <Route path='/list' element={<List token={token} />} />
                  <Route path='/orders' element={<Orders token={token}  />} />
                </Routes>
              </div>
            </div>
          </>
        )
      }
    </div>
  );
};

export default App;

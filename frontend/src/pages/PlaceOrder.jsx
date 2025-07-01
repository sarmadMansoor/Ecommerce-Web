import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/assets';

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');
  const navigate = useNavigate();

  return (
    <div className='flex flex-col lg:flex-row gap-8 w-full p-4'>
      {/* Left: Delivery Information */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px] bg-white rounded-lg shadow-md p-4'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1='DELIVERY' text2='INFORMATION' />
        </div>

        {/* Name Fields */}
        <div className='flex gap-3'>
          <input
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full focus:outline-none focus:ring-2 focus:ring-blue-500'
            type='text'
            placeholder='First name'
            aria-label='First name'
          />
          <input
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full focus:outline-none focus:ring-2 focus:ring-blue-500'
            type='text'
            placeholder='Last name'
            aria-label='Last name'
          />
        </div>

        {/* Other Fields */}
        <input
          className='border border-gray-300 rounded py-1.5 px-3.5 w-full focus:outline-none focus:ring-2 focus:ring-blue-500'
          type='email'
          placeholder='Email address'
          aria-label='Email address'
        />
        <input
          className='border border-gray-300 rounded py-1.5 px-3.5 w-full focus:outline-none focus:ring-2 focus:ring-blue-500'
          type='text'
          placeholder='Street'
          aria-label='Street'
        />
        <div className='flex gap-3'>
          <input
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full focus:outline-none focus:ring-2 focus:ring-blue-500'
            type='text'
            placeholder='City'
            aria-label='City'
          />
          <input
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full focus:outline-none focus:ring-2 focus:ring-blue-500'
            type='text'
            placeholder='State'
            aria-label='State'
          />
        </div>
        <div className='flex gap-3'>
          <input
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full focus:outline-none focus:ring-2 focus:ring-blue-500'
            type='text'
            placeholder='Zipcode'
            aria-label='Zipcode'
          />
          <input
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full focus:outline-none focus:ring-2 focus:ring-blue-500'
            type='text'
            placeholder='Country'
            aria-label='Country'
          />
        </div>
        <input
          className='border border-gray-300 rounded py-1.5 px-3.5 w-full focus:outline-none focus:ring-2 focus:ring-blue-500'
          type='tel'
          placeholder='Phone'
          aria-label='Phone number'
        />
      </div>

      {/* Right Side - CartTotal and Payment Method */}
      <div className='w-full sm:min-w-[320px] lg:min-w-[400px] flex flex-col'>
        <CartTotal />

        <div className='mt-8 p-4 bg-white rounded-lg shadow-md'>
          <Title text1='PAYMENT' text2='METHOD' />
          <div className='flex gap-3 flex-col lg:flex-row mt-4'>
            {/* Stripe */}
            <div
              onClick={() => setMethod('stripe')}
              className={`flex items-center gap-3 border p-2 px-3 rounded-lg cursor-pointer w-full ${
                method === 'stripe' ? 'border-green-500 bg-green-50' : 'border-gray-300'
              }`}
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === 'stripe' ? 'bg-green-500' : 'border-gray-400'
                }`}
              ></p>
              <img
                className='h-5 mx-4'
                src={assets.stripe_logo}
                alt='Stripe Logo'
              />
              
            </div>

            {/* Razorpay */}
            <div
              onClick={() => setMethod('razorpay')}
              className={`flex items-center gap-3 border p-2 px-3 rounded-lg cursor-pointer w-full ${
                method === 'razorpay' ? 'border-green-500 bg-green-50' : 'border-gray-300'
              }`}
            >
              <p
                className={`min-w-3.5 h-3.5  border rounded-full ${
                  method === 'razorpay' ? 'bg-green-500' : 'border-gray-400'
                }`}
              ></p>
              <img
                className='h-5 mx-4 p-1'
                src={assets.razorpay_logo}
                alt='Razorpay Logo'
              />
            
            </div>

            {/* Cash on Delivery */}
            <div
              onClick={() => setMethod('cod')}
              className={`flex items-center gap-3 border p-2 px-3 rounded-lg cursor-pointer w-full ${
                method === 'cod' ? 'border-green-500 bg-green-50' : 'border-gray-300'
              }`}
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === 'cod' ? 'bg-green-500' : 'border-gray-400'
                }`}
              ></p>
              <span className='text-sm font-medium'>Cash on Delivery</span>
            </div>
          </div>

          <div className='mt-6 text-right'>
            <button
              onClick={() => navigate('/orders')}
              className='bg-black text-white text-sm px-6 py-2 rounded'
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;

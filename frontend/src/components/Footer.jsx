import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <div className='flex flex-col md:grid md:grid-cols-3 gap-14 my-10 text-sm'>
      <div>
        <img src={assets.logo} className='mb-5 w-32 mx-auto md:mx-0' alt='Company Logo' />
        <p className='w-full md:w-2/3 text-gray-600'>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
        </p>
      </div>

      <div>
        <p className='text-xl font-medium mb-5'>COMPANY</p>
        <ul className='flex flex-col gap-1 text-gray-600'>
          <li>Home</li>
          <li>About us</li>
          <li>Delivery</li>
          <li>Privacy policy</li>
        </ul>
      </div>

      <div>
        <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
        <ul className='flex flex-col gap-1 text-gray-600'>
          <li>Email: info@example.com</li>
          <li>Phone: +123 456 7890</li>
          <li>Address: 123 Street, City, Country</li>
        </ul>
      </div>

      {/* Full-width footer copyright row */}
      <div className='col-span-full w-full'>
        <hr className='my-4' />
        <p className='text-sm text-center text-gray-500'>
          © 2024 @ forever.com – All rights reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;

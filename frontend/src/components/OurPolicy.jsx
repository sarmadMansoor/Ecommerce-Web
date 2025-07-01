import React from 'react';
import { assets } from '../assets/assets'; // ✅ Correct import

const OurPolicy = () => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 my-10 text-center px-6'>
      {/* Policy Item 1 */}
      <div>
        <img src={assets.exchange_icon} className='w-12 m-auto mb-5' alt='Easy Exchange' />
        <p className='font-semibold'>Easy Exchange Policy</p>
        <p className='text-gray-400'>We offer hassle-free exchange policy</p>
      </div>

      {/* Policy Item 2 */}
      <div>
        <img src={assets.quality_icon} className='w-12 m-auto mb-5' alt='7 Days Return' />
        <p className='font-semibold'>7 Days Return Policy</p>
        <p className='text-gray-400'>We provide 7 days free return policy</p>
      </div>

      {/* Policy Item 3 */}
      <div>
        <img src={assets.support_img} className='w-12 m-auto mb-5' alt='Best Customer Support' />
        <p className='font-semibold'>Best Customer Support</p>
        <p className='text-gray-400'>We provide 24/7 customer support</p>
      </div>
    </div>
  );
};

export default OurPolicy;

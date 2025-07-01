import React from 'react';

const NewsletterBox = () => {
    function SubmitHandler(e) {
        e.preventDefault(); // ✅ with capital "D"
    }
    return (
        <div className='text-center'>
            <p className='text-2xl font-medium text-gray-800'>Subscribe now & get 20% off</p>
            <p className='text-gray-400 mt-3'>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            </p>
            <form onSubmit={SubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3 rounded-lg overflow-hidden'>
                <input
                    className='w-full sm:flex-1 outline-none p-2 rounded-l-lg'
                    type='email'
                    placeholder='Enter your email'
                    required
                />
                <button
                    type='submit'
                    className='bg-black text-white text-xs px-6 py-4 rounded-r-lg hover:bg-gray-800 transition-colors duration-200'
                >
                    SUBSCRIBE
                </button>
            </form>
        </div>
    );
};

export default NewsletterBox;

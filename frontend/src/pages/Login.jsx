import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { backendUrl } from '../App';

const Login = () => {
  const [currentState, setCurrentState] = useState('Login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setToken } = useContext(ShopContext);
  const navigate = useNavigate();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const url =
        currentState === 'Sign Up'
          ? `${backendUrl}/api/user/register`
          : `${backendUrl}/api/user/login`;

      const payload =
        currentState === 'Sign Up'
          ? { name, email, password }
          : { email, password };

      const response = await axios.post(url, payload);

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
        toast.success(`${currentState} successful!`);
        navigate('/');
      } else {
        toast.error(response.data.message || `${currentState} failed`);
      }
    } catch (error) {
      toast.error(`Error: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4'
    >
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>

      {currentState === 'Sign Up' && (
        <input
          type='text'
          className='w-full px-3 py-2 border border-gray-800'
          placeholder='Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      )}

      <input
        type='email'
        className='w-full px-3 py-2 border border-gray-800'
        placeholder='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type='password'
        className='w-full px-3 py-2 border border-gray-800'
        placeholder='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        type='submit'
        className='w-full bg-black text-white py-2 font-medium'
      >
        {currentState}
      </button>

      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer'>Forgot your password?</p>
        {currentState === 'Login' ? (
          <p onClick={() => setCurrentState('Sign Up')} className='cursor-pointer'>
            Create new account
          </p>
        ) : (
          <p onClick={() => setCurrentState('Login')} className='cursor-pointer'>
            Login here
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;

'use client'
import { Orbitron } from "next/font/google";
import React, { useState } from 'react'
import Button from "./Button";
import { useAuth } from "@/context/AuthContext";

const orbitron = Orbitron({ subsets: ["latin"], weight: ['400'] });

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, SetIsRegister] = useState(false);
  const [authenticating, setAuthenticating] = useState(false);
  const [error, setError] = useState('');
  const { signup, login } = useAuth();
  
  async function handleSubmit() {
    if (!email || !password || password.length < 6) {
      setError('Email and password are required, and password should be at least 6 characters long.');
      return;
    }
    setError('');
    setAuthenticating(true);
    try {
      if (isRegister) {
        await signup(email, password);
      } else {
        await login(email, password);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setAuthenticating(false);
    }
  }

  return (
    <div className='flex flex-col flex-1 justify-center items-center gap-4'>
      <h3 className={'text-4xl sm:text-5xl md:text-6xl ' + orbitron.className}>
        {isRegister ? 'Register' : 'Log In'}
      </h3>
      <p>You&#39;re one step away!</p>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className='w-full max-w-[400px] mx-auto px-3 duration-200 hover:border-gray-600 focus:border-gray-600 dark:hover:border-gray-400 dark:focus:border-gray-400 py-2 sm:py-3 border border-solid border-gray-400 dark:border-gray-600 rounded-full outline-none bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200'
        placeholder="Email"
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className='w-full max-w-[400px] mx-auto px-3 duration-200 hover:border-gray-600 focus:border-gray-600 dark:hover:border-gray-400 dark:focus:border-gray-400 py-2 sm:py-3 border border-solid border-gray-400 dark:border-gray-600 rounded-full outline-none bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200'
        placeholder="Password"
        type="password"
      />
      {error && <p className="text-red-500">{error}</p>}
      <div className='max-w-[400px] w-full mx-auto'>
        <Button
          clickHandler={handleSubmit}
          text={authenticating ? 'Submitting...' : 'Submit'}
          full
          disabled={authenticating}
        />
      </div>
      <p className='text-center'>
        {isRegister ? 'Already have an account? ' : 'Don\'t have an account? '}
        <button
          onClick={() => SetIsRegister(!isRegister)}
          className='text-gray-600 dark:text-gray-400'
        >
          {isRegister ? 'Sign In' : 'Sign Up'}
        </button>
      </p>
    </div>
  );
}

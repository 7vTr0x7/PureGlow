import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import logo from "../assets/images/logo.png";


const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();
  
  const API_URL = import.meta.env.VITE_API_URL;

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!email || !password) {
      toast.error('Please fill in all fields.');
      return;
    }

    const loadingToast = toast.loading('Signing in...');

    try {
      const response = await fetch(`${API_URL}/api/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Invalid credentials. Please try again.');
      }

      const data = await response.json();

      if (data.token) {
        localStorage.setItem('authToken', data.token);
        toast.success('Login successful!');
        navigate('/');
      } else {
        throw new Error('Login failed. Please try again.');
      }
    } catch (error: any) {
      toast.error(error.message || 'An error occurred. Please try again later.');
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <div className="flex items-center gap-3 justify-center mb-6">
          <img alt="logo" src={logo} className="h-12 w-12" />
          <p className="text-lg font-semibold">Elysian</p>
        </div>

        <h2 className="text-2xl font-bold text-center text-gray-800">Welcome Back</h2>
        <p className="text-center text-gray-600 mb-6">Login to your account</p>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="********"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 rounded-md text-sm font-medium bg-[#cc8a68] text-white"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 flex items-center justify-center">
          <span className="text-gray-500 text-sm">Don't have an account?</span>
          <Link to="/signup" className="ml-2 text-sm font-medium text-[#cc8a68] hover:text-indigo-500">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

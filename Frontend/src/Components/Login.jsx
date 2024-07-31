import React, { useState } from 'react';
import { motion } from 'framer-motion';
import logo from '../assets/ry-logo.png'
import bg1 from '../assets/taxi3.png'
// import logo from '../assets/ryder.png'
import { Await, useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { Toast } from 'react-toastify';



const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();


  // const validateForm = () => {
  //   let formErrors = {};
  //   if (!email) formErrors.email = "Email is required";
  //   else if (!/\S+@\S+\.\S+/.test(email)) formErrors.email = "Email is invalid";
  //   if (!password) formErrors.password = "Password is required";
  //   else if (password.length < 6) formErrors.password = "Password must be at least 6 characters";
  //   setErrors(formErrors);
  //   return Object.keys(formErrors).length === 0;
  // };

  const loginApi = async()=>{
    console.log(`${import.meta.env.VITE_BACKEND_URL}`)
    try{
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/login`, {email,password},{withCredentials:true});

      if(response.status=== 201){
        console.log('Login successfull',response.data);
        navigate('/dashboard');
      }
    } catch (error){
      console.error('Login failed:',error.response?.data?.message || error.message);
      setErrors({...errors,server: 'Invalid email or password'});
    }finally{
      setIsLoading(false);
    }
    
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await loginApi();
  };

  

  return (
    <div className="min-h-screen  flex items-center justify-center bg-cover bg-center "
      style={{backgroundImage:`url(${bg1})`}}
    >
      <motion.div 
        className="bg-white shadow-purple-600 text-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md"
        // style={{backgroundImage:`url(${bg1})`}}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <img src={logo} alt="Admin Logo" className="mx-auto w-auto h-24 mb-4" />
          <h2 className="text-3xl font-bold">Admin Login</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-bold mb-2">Email</label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="text-red-500 text-xs italic mt-1">{errors.email}</p>}
          </div>

          <div className="mb-6 relative">
            <label htmlFor="password" className="block text-sm font-bold mb-2">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-3 top-8 text-gray-400 hover:text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
            {errors.password && <p className="text-red-500 text-xs italic mt-1">{errors.password}</p>}
          </div>

          <div className="mb-6 flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="rememberMe" className="text-sm">Remember me</label>
          </div>

          <motion.button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging in...
              </span>
            ) : 'Login'}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
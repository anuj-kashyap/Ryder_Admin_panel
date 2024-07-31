import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Bar, ComposedChart } from 'recharts';
import bg from '../assets/safety2.png';
import bg2 from '../assets/taxi3.png'
import logo from '../assets/ryder.png';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';


const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();


  const StatCard = ({ title, value, icon }) => (
    <motion.div 
      className="bg-white p-6 rounded-lg shadow-lg"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-500">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
        <div className="bg-blue-500 p-3 rounded-full">
          {icon}
        </div>
      </div>
    </motion.div>
  );

  const data = [
    { name: 'Jan', bookings: 4000, revenue: 24000 },
    { name: 'Feb', bookings: 3000, revenue: 18000 },
    { name: 'Mar', bookings: 5000, revenue: 30000 },
    { name: 'Apr', bookings: 2780, revenue: 16680 },
    { name: 'May', bookings: 1890, revenue: 11340 },
    { name: 'Jun', bookings: 2390, revenue: 14340 },
    { name: 'Jul', bookings: 3490, revenue: 20940 },
  ];

  const recentBookings = [
    { id: 1, user: 'John Doe', route: 'New York to Boston', amount: 150 },
    { id: 2, user: 'Jane Smith', route: 'Los Angeles to San Francisco', amount: 200 },
    { id: 3, user: 'Bob Johnson', route: 'Chicago to Detroit', amount: 120 },
    { id: 4, user: 'Alice Brown', route: 'Miami to Orlando', amount: 180 },
    { id: 5, user: 'Charlie Wilson', route: 'Seattle to Portland', amount: 100 },
    { id: 6, user: 'Diana Lee', route: 'Houston to Austin', amount: 130 },
    { id: 7, user: 'Eva Garcia', route: 'Philadelphia to Washington D.C.', amount: 160 },
    { id: 8, user: 'Frank Miller', route: 'Denver to Salt Lake City', amount: 190 },
  ];

  

  return (
    <div className="min-h-screen pt-4 bg-gray-100  bg-cover bg-center " style={{backgroundImage: `url(${bg2})`}}>
      <Navbar/>
      {/* <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <img className="h-8  w-auto" src={logo} alt="Ryder Logo" />
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <a href="#" className="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Dashboard
                </a>
              </div>
            </div>
            <div className="flex items-center">
              <button
              onClick={handleLogout}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline">
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav> */}

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <motion.h1 
            className="text-3xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Dashboard
          </motion.h1>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard title="Total Bookings" value="1,234" icon="🚕" />
            <StatCard title="Active Users" value="5,678" icon="👥" />
            <StatCard title="Revenue" value="$12,345" icon="💰" />
            <StatCard title="Growth" value="+15%" icon="📈" />
          </div>

          <motion.div 
            className="bg-white shadow-lg rounded-lg overflow-hidden mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Booking and Revenue Trends
              </h3>
            </div>
            <div className="p-4" style={{ height: '400px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  width={500}
                  height={400}
                  data={data}
                  margin={{
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 20,
                  }}
                >
                  <CartesianGrid stroke="#f5f5f5" />
                  <XAxis dataKey="name" scale="band" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="bookings" barSize={20} fill="#413ea0" yAxisId="left" />
                  <Line type="monotone" dataKey="revenue" stroke="#ff7300" yAxisId="right" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div 
            className="bg-white shadow-lg rounded-lg overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Recent Bookings
              </h3>
            </div>
            <div className="max-h-80 overflow-y-auto">
              <ul className="divide-y divide-gray-200">
                {recentBookings.map((booking) => (
                  <li key={booking.id} className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-blue-600 truncate">
                        Booking #{booking.id}
                      </p>
                      <div className="ml-2 flex-shrink-0 flex">
                        <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Completed
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">
                          👤 {booking.user}
                        </p>
                        <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                          🚕 {booking.route}
                        </p>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        💳 ${booking.amount}.00
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
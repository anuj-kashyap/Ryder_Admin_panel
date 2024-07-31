import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import Navbar from './Navbar';
import bg2 from '../assets/taxi3.png'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const earningsData = [
  { date: '2023-07-01', amount: 1250.50 },
  { date: '2023-07-02', amount: 1100.75 },
  { date: '2023-07-03', amount: 1300.25 },
  { date: '2023-07-04', amount: 1500.00 },
  { date: '2023-07-05', amount: 1150.50 },
  { date: '2023-07-06', amount: 1400.75 },
  { date: '2023-07-07', amount: 1600.25 },
];

const Earnings = () => {
  const [timeFrame, setTimeFrame] = useState('week');
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [averageEarnings, setAverageEarnings] = useState(0);

  useEffect(() => {
    const total = earningsData.reduce((sum, day) => sum + day.amount, 0);
    setTotalEarnings(total);
    setAverageEarnings(total / earningsData.length);
  }, []);

  const chartData = {
    labels: earningsData.map(day => day.date),
    datasets: [
      {
        label: 'Daily Earnings',
        data: earningsData.map(day => day.amount),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Daily Earnings',
      },
    },
  };

  return (
    <div className="min-h-screen pt-4 bg-gray-100  bg-cover bg-center " style={{backgroundImage: `url(${bg2})`}}>
    <Navbar/>
    <div className=" p-6" >
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Earnings Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">Total Earnings</h2>
          <p className="text-3xl font-bold text-green-600">${totalEarnings.toFixed(2)}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">Average Daily Earnings</h2>
          <p className="text-3xl font-bold text-blue-600">${averageEarnings.toFixed(2)}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">Time Frame</h2>
          <select 
            value={timeFrame} 
            onChange={(e) => setTimeFrame(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="year">Last Year</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <Bar data={chartData} options={options} />
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Earnings Breakdown</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Earnings</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {earningsData.map((day, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">{day.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">${day.amount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Earnings;
import React, { useState, useEffect } from "react";
import axios from "axios";
import bg2 from '../assets/taxi3.png'
import Navbar from "./Navbar";

const Booking = () => {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  useEffect(() => {
    setIsLoading(true);
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/bookings`)
      .then((response) => {
        if (Array.isArray(response.data)) {
          setBookings(response.data);
        } else {
          setError("Unexpected response format");
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching bookings:", error);
        setError("Failed to fetch bookings. Please try again later.");
        setIsLoading(false);
      });
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredBookings = bookings.filter((booking) =>
    booking.customerName?.toLowerCase().includes(filter.toLowerCase()) ||
    booking.pickupLocation?.toLowerCase().includes(filter.toLowerCase()) ||
    booking.destination?.toLowerCase().includes(filter.toLowerCase()) ||
    booking.typeOfService?.toLowerCase().includes(filter.toLowerCase())
  );

  const sortedBookings = React.useMemo(() => {
    let sortableItems = [...filteredBookings];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [filteredBookings, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="min-h-screen pt-4 bg-gray-100  bg-cover bg-center " style={{backgroundImage: `url(${bg2})`}}>
      <Navbar/>
    <div className="  p-4 min-h-screen "  >
      <h1 className=" p-4 text-3xl font-bold mb-6 text-gray-800">Bookings</h1>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Filter bookings..."
          value={filter}
          onChange={handleFilterChange}
          className="px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      {isLoading ? (
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      ) : (
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th onClick={() => requestSort('customerName')} className="px-6 py-3 cursor-pointer hover:bg-gray-200">Customer Name</th>
                <th onClick={() => requestSort('pickupLocation')} className="px-6 py-3 cursor-pointer hover:bg-gray-200">Pickup Location</th>
                <th onClick={() => requestSort('destination')} className="px-6 py-3 cursor-pointer hover:bg-gray-200">Destination</th>
                <th onClick={() => requestSort('fare')} className="px-6 py-3 cursor-pointer hover:bg-gray-200">Fare</th>
                <th onClick={() => requestSort('numberOfPassengers')} className="px-6 py-3 cursor-pointer hover:bg-gray-200">Passengers</th>
                <th onClick={() => requestSort('typeOfService')} className="px-6 py-3 cursor-pointer hover:bg-gray-200">Service Type</th>
              </tr>
            </thead>
            <tbody>
              {sortedBookings.map((booking) => (
                <tr key={booking.id} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{booking.customerName}</td>
                  <td className="px-6 py-4">{booking.pickupLocation}</td>
                  <td className="px-6 py-4">{booking.destination}</td>
                  <td className="px-6 py-4">${booking.fare?.toFixed(2)}</td>
                  <td className="px-6 py-4">{booking.numberOfPassengers}</td>
                  <td className="px-6 py-4">{booking.typeOfService}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {!isLoading && !error && sortedBookings.length === 0 && (
        <p className="text-center mt-4 text-gray-500">No bookings found.</p>
      )}
    </div>
    </div>
  );
};

export default Booking;
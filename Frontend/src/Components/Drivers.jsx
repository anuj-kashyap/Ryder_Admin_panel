import React, { useState } from 'react';
import bg2 from '../assets/taxi3.png';
import Navbar from './Navbar';
const driversData = [
  {
    id: 1,
    name: 'John Doe',
    vehicle: 'Toyota Camry',
    licenseNumber: 'DL12345',
    rating: 4.8,
    trips: 1250,
    status: 'Available'
  },
  {
    id: 2,
    name: 'Jane Smith',
    vehicle: 'Honda Civic',
    licenseNumber: 'DL67890',
    rating: 4.9,
    trips: 980,
    status: 'On Trip'
  },
  {
    id: 3,
    name: 'Mike Johnson',
    vehicle: 'Ford Fusion',
    licenseNumber: 'DL54321',
    rating: 4.7,
    trips: 1500,
    status: 'Available'
  },
  {
    id: 4,
    name: 'Sarah Williams',
    vehicle: 'Chevrolet Malibu',
    licenseNumber: 'DL09876',
    rating: 4.6,
    trips: 750,
    status: 'Offline'
  },
  {
    id: 5,
    name: 'David Brown',
    vehicle: 'Nissan Altima',
    licenseNumber: 'DL13579',
    rating: 4.9,
    trips: 2000,
    status: 'Available'
  }
];

const Drivers = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDrivers = driversData.filter(driver =>
    driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    driver.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    driver.licenseNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-4 bg-gray-100  bg-cover bg-center " style={{backgroundImage: `url(${bg2})`}}>
      <Navbar/>
    <div className="p-6">
      
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Drivers</h1>
      
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search drivers..."
          className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDrivers.map(driver => (
          <div key={driver.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{driver.name}</h2>
              <p className="text-gray-600 mb-4">{driver.vehicle}</p>
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-gray-500">License: {driver.licenseNumber}</span>
                <span className="text-sm font-semibold text-blue-600">{driver.rating} ★</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-gray-500">Total Trips: {driver.trips}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  driver.status === 'Available' ? 'bg-green-200 text-green-800' :
                  driver.status === 'On Trip' ? 'bg-yellow-200 text-yellow-800' :
                  'bg-red-200 text-red-800'
                }`}>
                  {driver.status}
                </span>
              </div>
              <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredDrivers.length === 0 && (
        <p className="text-center mt-6 text-gray-500">No drivers found matching your search.</p>
      )}
    </div>
    </div>
  );
};

export default Drivers;
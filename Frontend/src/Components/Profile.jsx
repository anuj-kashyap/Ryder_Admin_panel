import React, { useEffect, useState } from 'react';
import { FaPencilAlt, FaCar, FaPhone, FaIdCard } from 'react-icons/fa';
import axios from "axios";
import { toast } from 'react-toastify';
import bg2 from '../assets/taxi3.png'
import Navbar from './Navbar';

const Profile = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    licenseNumber: '',
    preferredVehicle: '',
    image: 'https://example.com/default-profile-image.jpg',
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/getuser`, { withCredentials: true });
      const userData = response.data;
      setUser(userData);
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("Failed to load user data");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setUser(prevUser => ({
        ...prevUser,
        image: reader.result
      }));
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/user/update`, user, { withCredentials: true });
      toast.success("Profile updated successfully");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user data:", error);
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-4  bg-cover bg-center " style={{backgroundImage: `url(${bg2})`}}>
        <Navbar/>
    <div className=" flex justify-center p-20 items-center" >
        
      <div className="bg-white p-10 rounded-3xl shadow-lg w-full max-w-xl">
        <div className="relative flex flex-col items-center">
          <img className="w-40 h-40 rounded-full object-cover mb-4 border-4 border-cyan-500" src={user.image} alt="User" />
          <label className="absolute bottom-0 right-1/3 bg-cyan-500 p-2 rounded-full shadow-md cursor-pointer">
            <FaPencilAlt className="text-white" />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
          <h2 className="text-2xl font-semibold text-gray-800">{user.name}</h2>
        </div>
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaPhone className="text-gray-400" />
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={user.phone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">License Number</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaIdCard className="text-gray-400" />
                </div>
                <input
                  type="text"
                  name="licenseNumber"
                  value={user.licenseNumber}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Preferred Vehicle</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaCar className="text-gray-400" />
                </div>
                <input
                  type="text"
                  name="preferredVehicle"
                  value={user.preferredVehicle}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500"
                />
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-center space-x-4">
            {isEditing ? (
              <>
                <button
                  type="submit"
                  className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-full"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-full"
              >
                Edit Profile
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default Profile;
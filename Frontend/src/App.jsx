import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './index.css'
import Login from './Components/Login'
import Dashboard from './Components/Dashboard'
// import { ToastContainer } from 'react-toastify';
import Booking from '../src/Components/Booking'
// import Navbar from './Components/Navbar'
import Profile from './Components/Profile'
import Navbar from './Components/Navbar'
import Drivers from './Components/Drivers'
import Earnings from './Components/Earnings'
// import BookingTable from './Components/BookingTable'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Router>

    {/* <Navbar/> */}
      <Routes>
        <Route path = "/" element={<Login/>}/>
        
        <Route path = "/dashboard" element={<Dashboard/>}/>
        <Route path="/booking" element={<Booking/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/drivers" element={<Drivers/>}/>
        <Route path="/earnings" element={<Earnings/>}/>
        
      </Routes>
      
    </Router>
    </>
  )
}

export default App

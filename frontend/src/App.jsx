import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';

// components 
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import AddStation from './pages/AddStation';
import Home from './pages/Home';
import MyBookings from './pages/MyBookings';
import ProfileScreen from './pages/ProfileScreen';
import OwnerDashboard from './pages/OwnerDashboard';
import  AllStation from './pages/AllStation'
import About from './pages/About';


function App() {

// 1. ALL HOOKS MUST BE AT THE TOP (Never inside an 'if')
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 2. RUN THIS ONCE ON MOUNT
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Corrupt user data in local storage");
      }
    }
    // Always finish loading, whether user is found or not
    setLoading(false); 
  }, []);

// 4. SHOW LOADING SCREEN (Prevents redirects while checking data)
  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}>
        <h2>Loading...</h2>
      </div>
    );
  }

  // 👇 THIS IS THE MISSING PART CAUSING THE ERROR 👇
  const isAuthenticated = !!user;
  const isOwner = user?.role === 'STATION_OWNER';
  const isDriver = user?.role === 'VEHICLE_OWNER';
  // 👆 ------------------------------------------ 👆


  return (
    <Router>
      <Toaster position="top-center" reverseOrder={false} />
      
      {/* Pass user to Navbar if it needs it */}
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        
        {/* IMPORTANT: Pass setUser to Login so the app updates immediately after login */}
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/add-station" element={<AddStation />} />
        <Route path="/all-stations" element={<AllStation />} />
        <Route path="/about" element={<About />} />

        {/* OWNER ONLY ROUTE */}
        <Route 
          path="/dashboard" 
          element={
            user && isOwner 
              ? <OwnerDashboard /> 
              :<OwnerDashboard /> 
          } 
        />

        {/* DRIVER ONLY ROUTE */}
        <Route 
          path="/my-bookings" 
          element={
            user && isDriver
              ? <MyBookings /> 
              :<MyBookings />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
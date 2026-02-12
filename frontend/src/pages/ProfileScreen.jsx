import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DashboardHistory from '../components/DashboardHistory'; // Ensure this path is correct

const ProfileScreen = () => {
  const navigate = useNavigate();

  // 1. Initialize state directly from Local Storage (Instant Display)
  // This prevents the "empty inputs" issue while waiting for the API
  const storedUser = JSON.parse(localStorage.getItem('user')) || {};
  
  const [name, setName] = useState(storedUser.name || '');
  const [email, setEmail] = useState(storedUser.email || '');
  const [role, setRole] = useState(storedUser.role || '');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);

  useEffect(() => {
    // 2. Fetch fresh data from Backend to ensure it's up-to-date
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          navigate('/login');
          return;
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`, // Ensure "Bearer " is included
          },
        };

        // Debugging: Check if this log appears in your browser console (F12)
        // console.log("Fetching profile with token:", token);

        const { data } = await axios.get('http://localhost:5000/api/users/profile', config);
        
        // console.log("Profile Data Received:", data); // Check this log!

        // Update state with fresh data from DB
        setName(data.name);
        setEmail(data.email);
        setRole(data.role);
        
      } catch (error) {
        console.error('Error fetching profile:', error.response?.data?.message || error.message);
        setMessage('Failed to load latest profile data');
      }
    };

    fetchProfile();
  }, [navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setMessage(null);
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.put(
        'http://localhost:5000/api/users/profile', 
        { name, password }, 
        config
      );
      
      setMessage('Profile Updated Successfully');
      
      // Update local storage so the Navbar updates instantly too
      const updatedUser = { ...storedUser, name: data.name };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error updating profile');
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6">
      <div className="bg-white shadow-md rounded-md p-6 max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">User Profile</h2>
        
        {message && (
          <div className={`p-2 mb-4 rounded text-center ${
            message.includes('Success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {message}
          </div>
        )}

        {role && (
          <div className="mb-4 text-center">
            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
              role === 'STATION_OWNER' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
            }`}>
              {role.replace('_', ' ')}
            </span>
          </div>
        )}

        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Name</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
                   disabled
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Email Address</label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded bg-gray-100 cursor-not-allowed"
              value={email}
              disabled
            />
          </div>

        
      


        </form>
      </div>

      {/* Dashboard History Section (Bookings or Stations) */}
      <hr className="my-10 border-gray-300" />
      <DashboardHistory role={role} />
    </div>
  );
};

export default ProfileScreen;
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../api';

const Register = () => {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    role: 'VEHICLE_OWNER' 
  });
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Preventive Check: Physically stop user from typing beyond 50 characters
    if ((name === 'name' || name === 'password') && value.length > 50) return;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password } = formData;

    // 1. Check for empty fields or just whitespace
    if (!name.trim() || !email.trim() || !password.trim()) {
      toast.error('All fields are required and cannot be empty');
      return;
    }

    // 2. Name validation (Length > 1)
    if (name.trim().length <= 1) {
      toast.error('Name must be more than 1 character long');
      return;
    }

    // 3. Password validation (Length > 7)
    // We allow up to 50 on frontend; backend will handle the hashing
    if (password.length <= 7) {
      toast.error('Password must be at least 8 characters long');
      return;
    }

    try {
      await api.post('/auth/register', formData);
      toast.success('Registration Successful! Please Login.');
      navigate('/login'); 
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Register</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-1">
              Full Name ({formData.name.length}/50)
            </label>
            <input 
              type="text" 
              name="name" 
              value={formData.name}
              placeholder="Enter your name"
              className="w-full p-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none transition" 
              onChange={handleChange} 
              required 
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-1">Email</label>
            <input 
              type="email" 
              name="email" 
              value={formData.email}
              placeholder="email@example.com"
              className="w-full p-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none transition" 
              onChange={handleChange} 
              required 
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-1">
              Password ({formData.password.length}/50)
            </label>
            <input 
              type="password" 
              name="password"
              value={formData.password}
              placeholder="Min 8 characters"
              onChange={handleChange} 
              required
              className={`w-full p-2.5 border rounded outline-none transition-all ${
                formData.password.length > 0 && formData.password.length < 8 
                ? 'border-red-500 focus:ring-2 focus:ring-red-200' 
                : 'border-gray-300 focus:ring-2 focus:ring-green-500'
              }`}
            />
            {formData.password.length > 0 && formData.password.length < 8 && (
              <p className="text-red-500 text-xs mt-1">Must be at least 8 characters.</p>
            )}
          </div>

          {/* Role Field */}
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-1">I am a:</label>
            <select 
              name="role" 
              value={formData.role}
              className="w-full p-2.5 border border-gray-300 rounded bg-white focus:ring-2 focus:ring-blue-500 outline-none" 
              onChange={handleChange}
            >
              <option value="VEHICLE_OWNER">Vehicle Owner (Driver)</option>
              <option value="STATION_OWNER">Station Owner (Host)</option>
            </select>
          </div>

          <button 
            type="submit" 
            className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 active:scale-[0.98] transition-all"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
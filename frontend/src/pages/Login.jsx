import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // ✅ 1. Imported Link
import api from '../api';
import toast from 'react-hot-toast';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', formData);
      
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      
      toast.success('Login Successful!');
      navigate('/');
    } catch (err) {
      toast.error('Login Failed: ' + (err.response?.data?.msg || 'Error'));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Email</label>
            <input 
              type="email" 
              name="email" 
              className="w-full p-2 border rounded mt-1" 
              onChange={handleChange} 
              required 
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input 
              type="password" 
              name="password" 
              className="w-full p-2 border rounded mt-1" 
              onChange={handleChange} 
              required 
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
            Login
          </button>
        </form>

        {/* ✅ 2. Added Register Link Section */}
        <div className="mt-6 text-center border-t pt-4">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link 
              to="/register" 
              className="text-blue-600 hover:text-blue-800 font-semibold hover:underline transition"
            >
              Register here
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Login;
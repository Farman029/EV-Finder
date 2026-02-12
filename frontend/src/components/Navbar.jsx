import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGeolocation } from '../hooks/useGeolocation'; 

const Navbar = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  // ✅ 1. Add State for the search input
  const [searchTerm, setSearchTerm] = useState('');

  const { location } = useGeolocation(); 
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsDropdownOpen(false);
    navigate('/login');
  };

  // ✅ 2. Add Handler to redirect to Home with search query
const handleSearch = (e) => {
  e.preventDefault();
  // 🚀 UPDATE: Send the query to the Home Page ('/')
  navigate(`/?search=${searchTerm}`);
};

  return (
    <nav className="bg-gray-900 p-4 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center gap-4">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold hover:text-green-400 whitespace-nowrap">
          EV Stations
        </Link>

        {/* ✅ 3. SEARCH BAR (Fixed & Functional) */}
        {/* Added 'hidden md:flex' so it doesn't break layout on mobile phones */}
        <form onSubmit={handleSearch} className="hidden md:flex bg-gray-100 rounded-full px-4 py-2 w-1/3 border focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200 transition">
          <input 
            type="text" 
            placeholder="Search location or station..." 
            className="bg-transparent outline-none w-full text-gray-700 placeholder-gray-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="text-gray-500 hover:text-blue-600 pl-2">
            🔍
          </button>
        </form>

        {/* Right Side Links */}
        <div className="space-x-4 flex items-center">
          <Link to="/all-stations" className="text-lg font-bold hover:text-green-400 hidden lg:block">
            Find Stations
          </Link>
          <Link to="/about" className=  " text-lg font-bold  hover:text-green-400">About Us</Link>
          {token && user ? (
            <>
              {user.role === 'STATION_OWNER' && (
                <Link to="/add-station" className="text-lg font-bold hover:text-green-400 hidden sm:block">
                  Add Station
                </Link>
              )}

              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 focus:outline-none hover:text-gray-200"
                >
                  <div className="w-8 h-8 rounded-full bg-white text-blue-600 flex items-center justify-center font-bold text-sm">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <span className="hidden md:inline">{user.name}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 text-gray-800 border border-gray-100">
                    <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setIsDropdownOpen(false)}>
                      Profile
                    </Link>
                    
                    {user?.role === 'STATION_OWNER' ? (
                      <Link to="/dashboard" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setIsDropdownOpen(false)}>
                        My Stations
                      </Link>
                    ) : (
                      <Link to="/my-bookings" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setIsDropdownOpen(false)}>
                        My Bookings
                      </Link>
                    )}

                    <div className="border-t border-gray-100 my-1"></div>
                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 font-medium">
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-gray-200 font-medium">Login</Link>
              <Link to="/register" className="bg-green-600 px-2 py-2 rounded-xl  text-lg  hover:bg-green-400 hidden lg:block transition shadow-sm font-medium">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
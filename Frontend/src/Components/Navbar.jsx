import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Check if user is logged in - adapt this to your auth system
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('userRole');
    
    if (token) {
      setIsLoggedIn(true);
      setUserRole(role);
    }
  }, []);

  const handleLogout = () => {
    // Clear auth data - adapt this to your auth system
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    setIsLoggedIn(false);
    setUserRole(null);
    navigate('/login');
  };

  return (
    <nav className="bg-indigo-600 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold">
              YogaAsanas
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/asanas" className="hover:text-indigo-200 transition">
              Asanas Library
            </Link>
            
            {isLoggedIn && (userRole === 'super-admin' || userRole === 'moderator') && (
              <Link to="/add-asana" className="hover:text-indigo-200 transition">
                Add New Asana
              </Link>
            )}
            
            {!isLoggedIn ? (
              <>
                <Link 
                  to="/login" 
                  className="bg-white text-indigo-600 px-3 py-1 rounded hover:bg-indigo-100 transition"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="bg-indigo-500 text-white px-3 py-1 rounded hover:bg-indigo-400 transition"
                >
                  Register
                </Link>
              </>
            ) : (
              <button 
                onClick={handleLogout}
                className="bg-indigo-500 text-white px-3 py-1 rounded hover:bg-indigo-400 transition"
              >
                Logout
              </button>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-2 pb-4 space-y-2">
            <Link 
              to="/asanas" 
              className="block hover:bg-indigo-700 px-3 py-2 rounded transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Asanas Library
            </Link>
            
            {isLoggedIn && (userRole === 'super-admin' || userRole === 'moderator') && (
              <Link 
                to="/add-asana" 
                className="block hover:bg-indigo-700 px-3 py-2 rounded transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                Add New Asana
              </Link>
            )}
            
            {!isLoggedIn ? (
              <>
                <Link 
                  to="/login" 
                  className="block hover:bg-indigo-700 px-3 py-2 rounded transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="block hover:bg-indigo-700 px-3 py-2 rounded transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            ) : (
              <button 
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left hover:bg-indigo-700 px-3 py-2 rounded transition"
              >
                Logout
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
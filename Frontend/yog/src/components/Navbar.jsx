import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaMoon, FaSun, FaBars, FaTimes, FaLeaf } from 'react-icons/fa';
import { Link } from 'react-scroll'; // Import smooth scroll

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center"
          >
            <motion.div
              animate={{ rotate: [0, 10, 0, -10, 0], scale: [1, 1.1, 1, 1.1, 1] }}
              transition={{ duration: 5, repeat: Infinity, repeatType: 'loop' }}
              className="mr-3 text-3xl text-yogaGreen-500"
            >
              <FaLeaf />
            </motion.div>
            <span className="text-2xl font-serif font-bold gradient-text">Yogasana</span>
          </motion.div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <motion.button onClick={toggleMobileMenu} className="text-gray-700 dark:text-gray-300 p-2"
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </motion.button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {["home", "features", "benefits", "how-it-works", "community"].map((section, index) => (
              <motion.div key={section} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }} whileHover={{ scale: 1.05 }}>
                <Link to={section} smooth={true} duration={500} className="nav-link text-base font-medium capitalize">
                  {section.replace("-", " ")}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            

            <motion.button className="btn-secondary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.8 }}>
              Login
            </motion.button>

            <motion.button className="btn-primary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.9 }}>
              Sign Up
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: isMobileMenuOpen ? 'auto' : 0, opacity: isMobileMenuOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }} className="md:hidden overflow-hidden">
          {isMobileMenuOpen && (
            <div className="py-4 flex flex-col">
              {["home", "features", "benefits", "how-it-works", "community"].map((section) => (
                <Link key={section} to={section} smooth={true} duration={500}
                  className="py-2 text-gray-700 dark:text-gray-300 hover:text-yogaGreen-600 dark:hover:text-yogaGreen-400 transition-colors capitalize">
                  {section.replace("-", " ")}
                </Link>
              ))}
              
              {/* Dark Mode & Buttons */}
              <div className="flex items-center space-x-3 mt-4">
                
                
                <button className="btn-secondary flex-1">Login</button>
                <button className="btn-primary flex-1">Sign Up</button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;

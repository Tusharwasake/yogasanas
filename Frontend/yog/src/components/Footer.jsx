import { motion } from "framer-motion";
import { FaInstagram, FaFacebook, FaTwitter, FaYoutube, FaLeaf } from "react-icons/fa";


const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-gray-900 text-white py-12"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Social Links */}
          <div>
            <div className="flex items-center mb-4">
            <motion.div
            animate={{ 
              rotate: [0, 10, 0, -10, 0],
              scale: [1, 1.1, 1, 1.1, 1]
            }}
            transition={{ 
              duration: 5, 
              repeat: Infinity,
              repeatType: "loop"
            }}
            className="mr-3 text-3xl text-yogaGreen-500"
          >
            <FaLeaf />
          </motion.div>
              <span className="text-xl font-serif font-bold">Yogasana</span>
            </div>
            <p className="text-gray-400 mb-4">
              Transform your yoga practice with our gamified wellness app.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: FaInstagram, href: "#" },
                { icon: FaFacebook, href: "#" },
                { icon: FaTwitter, href: "#" },
                { icon: FaYoutube, href: "#" },
              ].map(({ icon: Icon, href }, index) => (
                <a
                  key={index}
                  href={href}
                  className="text-gray-400 hover:text-green-400 transition-colors transform hover:scale-110"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {["Home", "Features", "Benefits", "Community"].map((link, index) => (
                <li key={index}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="footer-link transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Email: info@yogasana.app</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Address: 123 Wellness Street, Mindful City</li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Yogasana. All rights reserved.</p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;

import { motion } from 'framer-motion';
import { useParallax } from 'react-scroll-parallax';
import { FaArrowDown, FaLeaf, FaSpa, FaYinYang } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import FeaturesSection from '../components/FeaturesSection';
import CTASection from '../components/CTASection';
import Benefits from '../components/Benifits';
import Community from '../components/Communit';
import Footer from '../components/Footer';
import HowItWorks from '../components/HowItWorks';

const Hero = () => {
  const parallax = useParallax<HTMLDivElement>({ speed: -15 });

  return (
    <><Navbar/>

    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden bg-[#F3F7EC]">
      {/* Background Image with Parallax Effect */}
     
      <div
        ref={parallax.ref}
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1545389336-cf090694435e?auto=format&fit=crop&w=2064&q=80')" }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Floating Decorative Elements */}
      <motion.div className="absolute top-[20%] left-[15%] w-16 h-16 md:w-24 md:h-24 rounded-full bg-green-300/30 backdrop-blur-sm animate-float" />
      <motion.div className="absolute bottom-[25%] right-[10%] w-20 h-20 md:w-32 md:h-32 rounded-full bg-yellow-300/30 backdrop-blur-sm animate-float delay-1000" />
      <motion.div className="absolute top-[40%] right-[20%] w-12 h-12 md:w-16 md:h-16 rounded-full bg-orange-300/30 backdrop-blur-sm animate-float delay-500" />

      {/* Floating Icons */}
      <motion.div className="absolute top-[30%] left-[25%] text-white/40 text-4xl" animate={{ y: [0, -15, 0] }} transition={{ duration: 4, repeat: Infinity }}>
        <FaLeaf />
      </motion.div>
      <motion.div className="absolute bottom-[35%] left-[10%] text-white/40 text-4xl" animate={{ y: [0, -20, 0] }} transition={{ duration: 5, repeat: Infinity }}>
        <FaSpa />
      </motion.div>
      <motion.div className="absolute top-[45%] right-[30%] text-white/40 text-4xl" animate={{ y: [0, -25, 0] }} transition={{ duration: 6, repeat: Infinity }}>
        <FaYinYang />
      </motion.div>

      {/* Hero Content */}
      <div className="container mx-auto px-6 text-center z-10">
        <motion.h1
          className="text-4xl md:text-6xl font-serif font-bold text-white"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Elevate Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-300 via-teal-400 to-green-500">Yoga Practice</span>
        </motion.h1>

        <motion.p
          className="text-xl text-white/80 mt-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Experience mindfulness, track progress, and unlock new poses with our **interactive & gamified** yoga journey.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex justify-center gap-4 mt-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.button className="bg-green-500 text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-green-600 transition">
            Get Started
          </motion.button>
          <motion.button className="bg-white/20 text-white px-8 py-3 rounded-full font-medium hover:bg-white/30 transition">
            Learn More
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <a href="#features" className="flex flex-col items-center">
          <span className="mb-2 text-sm font-medium">Explore Features</span>
          <FaArrowDown className="animate-bounce text-xl" />
        </a>
      </motion.div>
    </section>
    <FeaturesSection/>
    <Benefits/>
    <HowItWorks/>
    <Community/>
    <CTASection/>
    <Footer/>
    </>
  );
};

export default Hero;



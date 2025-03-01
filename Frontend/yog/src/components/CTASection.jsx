import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const CallToAction = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-20 bg-gradient-to-r from-green-300 via-teal-400 to-green-500 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Ready to Transform Your Yoga Journey?</h2>
          <p className="text-xl mb-8">
            Join thousands of yogis who have elevated their practice through our gamified approach.
          </p>
          
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.button
              className="bg-white text-green-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign Up Now
            </motion.button>
            
            <motion.button
              className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-medium py-3 px-8 rounded-full transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Community = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Yoga Enthusiast",
      quote: "The gamification aspect keeps me motivated to practice daily. I've seen tremendous improvement in my flexibility!",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
    },
    {
      name: "Raj Patel",
      role: "Fitness Trainer",
      quote: "I recommend this app to all my clients. The community features create accountability and make yoga fun.",
      avatar: "https://randomuser.me/api/portraits/men/54.jpg",
    },
    {
      name: "Ananya Desai",
      role: "Yoga Teacher",
      quote: "As an instructor, I love seeing my students track their progress. The leaderboard creates healthy competition.",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    },
  ];

  return (
    <section id="community" className="py-24 bg-yogaGreen-50 dark:bg-gray-800/50">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Join Our Community</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Connect with fellow yogis and share your journey with like-minded practitioners
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 relative hover:shadow-xl transform transition-transform duration-300 hover:scale-105"
            >
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full border-4 border-white dark:border-gray-800"
                />
              </div>
              <div className="pt-6 text-center">
                <p className="text-gray-700 dark:text-gray-300 italic mb-4">"{testimonial.quote}"</p>
                <h4 className="font-bold text-navy-700 dark:text-navy-300">{testimonial.name}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
  transition={{ duration: 0.6, delay: 0.6 }}
  className="text-center mt-16 z-10"
>
  <motion.button
    className=" bg-gradient-to-r from-green-300 via-teal-400 to-green-500 text-white font-semibold px-8 py-3 rounded-lg hover: transition-all duration-300 text-lg shadow-lg"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    Join Our Community
  </motion.button>
</motion.div>


      </div>
    </section>
  );
};

export default Community;

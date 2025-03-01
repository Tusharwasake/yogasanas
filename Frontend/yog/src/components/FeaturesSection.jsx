
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaMedal, FaChartLine, FaUsers, FaMobileAlt } from 'react-icons/fa';

const FeatureCard = ({ icon: Icon, title, description, delay, index }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const colors = [
    'from-yogaGreen-500 to-secondary-500',
    'from-secondary-500 to-yogaOrange-500',
    'from-yogaOrange-500 to-yogaBeige-500',
    'from-yogaBeige-500 to-yogaGreen-500'
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay }}
      className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 md:p-8 flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300 ease-out group"
    >
      <div
        className={`mb-4 w-16 h-16 rounded-full bg-gradient-to-r ${colors[index % colors.length]} flex items-center justify-center shadow-lg transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-green-300 group-hover:via-teal-400 group-hover:to-green-500`}
      >
        <Icon className="text-black text-3xl" />
      </div>

      <h3 className="text-xl font-serif font-bold mb-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-300">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </motion.div>
  );
};

const Features = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const features = [
    {
      icon: FaMedal,
      title: "Gamified Experience",
      description: "Earn points and climb the leaderboard as you complete yoga asanas of varying difficulty levels.",
    },
    {
      icon: FaChartLine,
      title: "Track Progress",
      description: "Monitor your yoga journey with detailed statistics and visualize your improvement over time.",
    },
    {
      icon: FaUsers,
      title: "Join Communities",
      description: "Connect with like-minded yogis, join groups, and share your achievements with friends.",
    },
    {
      icon: FaMobileAlt,
      title: "Responsive Design",
      description: "Access your yoga profile from any device with our mobile-first, responsive interface.",
    },
  ];

  return (
    <section id="features" className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 relative inline-block">
            <span className="relative z-10">Key Features</span>
            <motion.span
              className="absolute -bottom-2 left-0 w-full h-2 bg-gradient-to-r from-yogaGreen-400 to-secondary-400 rounded-full"
              initial={{ width: 0 }}
              animate={inView ? { width: '100%' } : { width: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover how our app transforms your yoga practice with these powerful features
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={0.2 + index * 0.1}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

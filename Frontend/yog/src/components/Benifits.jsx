
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useParallax } from 'react-scroll-parallax';

const Benefits = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const parallax = useParallax({
    speed: -10,
  });

  const benefits = [
    {
      title: "Consistent Practice",
      description: "Gamification encourages regular yoga sessions, helping you build a consistent routine.",
    },
    {
      title: "Community Support",
      description: "Connect with others on the same journey for motivation and accountability.",
    },
    {
      title: "Visual Progress",
      description: "See your improvement over time with intuitive charts and statistics.",
    },
    {
      title: "Mindful Competition",
      description: "Friendly leaderboards inspire you to challenge yourself while respecting your limits.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="benefits" className="relative py-24 overflow-hidden">
      <div 
        ref={parallax.ref}
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
          opacity: 0.3
        }}
      ></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-gray-900 dark:text-white">
  Why Gamify Your Yoga Practice?
</h2>
<p className="text-lg text-gray-800 dark:text-gray-200 max-w-3xl mx-auto">
  Discover the transformative benefits of turning your wellness journey into an engaging experience
</p>

        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
        >
          {benefits.map((benefit, index) => (
            <motion.div
            key={index}
            variants={itemVariants}
            className="bg-white/10 dark:bg-white/15 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-white/20 transition-transform duration-300 hover:scale-105 hover:bg-white/20"
          >
            <h3 className="text-xl font-serif font-bold mb-3 text-navyBlue-800 dark:text-green-400 transition-colors duration-300 group-hover:text-green-600">
              {benefit.title}
            </h3>
            <p className="text-gray-800 dark:text-gray-100 transition-colors duration-300">
              {benefit.description}
            </p>
          </motion.div>
          
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Benefits;

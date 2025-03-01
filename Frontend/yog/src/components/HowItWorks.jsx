import React from "react";
import { motion } from "framer-motion";

const steps = [
  { title: "🧘 Step 1", desc: "Sign Up & Set Your Goals" },
  { title: "📅 Step 2", desc: "Log Your Yogasanas & Track Progress" },
  { title: "🏆 Step 3", desc: "Join Challenges & Earn Rewards" },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-16 bg-gradient-to-b from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-800 text-center">
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        How It Works
      </motion.h2>

      <div className="mt-12 flex flex-wrap justify-center gap-8 px-6">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl w-72 md:w-80 transition-transform duration-300 hover:scale-105 flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
              {step.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mt-2">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;

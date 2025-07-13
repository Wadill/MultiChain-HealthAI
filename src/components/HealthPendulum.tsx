import React from 'react';
import { motion, Variants, Easing } from 'framer-motion';

interface HealthPendulumProps {
  overallScore: number;
}

const HealthPendulum: React.FC<HealthPendulumProps> = ({ overallScore }) => {
  const pendulumSpeed = 2 - (overallScore / 100) * 1.5;
  const pendulumColor = overallScore > 80 ? '#22C55E' : overallScore > 50 ? '#F59E0B' : '#EF4444';

  const pendulumVariants: Variants = {
    swing: {
      rotate: [-30, 30],
      transition: {
        repeat: Infinity,
        repeatType: 'reverse' as const,
        duration: pendulumSpeed,
        ease: 'easeInOut' as Easing,
      },
    },
  };

  return (
    <div className="flex justify-center mt-8">
      <motion.div
        className="relative w-32 h-32"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <svg width="100%" height="100%" viewBox="0 0 100 100">
          <circle cx="50" cy="20" r="5" fill="#4B5563" className="dark:fill-gray-300" />
          <motion.line
            x1="50"
            y1="20"
            x2="50"
            y2="80"
            stroke={pendulumColor}
            strokeWidth="4"
            variants={pendulumVariants}
            animate="swing"
            className="dark:stroke-blue-400"
          />
          <motion.circle
            cx="50"
            cy="80"
            r="10"
            fill={pendulumColor}
            variants={pendulumVariants}
            animate="swing"
            className="dark:fill-blue-400"
          />
        </svg>
        <p className="text-center text-sm text-gray-600 dark:text-gray-300 mt-2">
          Health Pendulum: {overallScore}/100
        </p>
      </motion.div>
    </div>
  );
};

export default HealthPendulum;
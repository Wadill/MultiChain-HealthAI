import React from 'react';
import { motion, Variants } from 'framer-motion';
import { HealthScore } from '../types';

interface ExplanationSectionProps {
  explanations: HealthScore['explanations'];
}

const ExplanationSection: React.FC<ExplanationSectionProps> = ({ explanations }) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.02, boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)' }}
      transition={{ duration: 0.3 }}
      className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl mt-6"
    >
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">AI-Generated Insights</h2>
      <motion.div variants={itemVariants} className="space-y-4">
        {Object.entries(explanations).map(([key, value]) => (
          <motion.div
            key={key}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <h3 className="text-lg font-semibold capitalize text-gray-800 dark:text-gray-100">{key}</h3>
            <p className="text-gray-600 dark:text-gray-300">{value}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default ExplanationSection;
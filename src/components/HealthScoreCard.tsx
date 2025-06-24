import React from 'react';
import { motion, Variants, Easing } from 'framer-motion';
import { HealthScore } from '../types';

interface HealthScoreCardProps {
  score: HealthScore;
}

const HealthScoreCard: React.FC<HealthScoreCardProps> = ({ score }) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Stagger child animations by 0.2s
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const progressBarVariants: Variants = {
    hidden: { width: 0 },
    visible: (percentage: number) => ({
      width: `${percentage}%`,
      transition: {
        duration: 1,
        ease: 'easeInOut' as Easing,
      },
    }),
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.02, boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)' }} // Glow effect
      transition={{ duration: 0.3 }}
      className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl"
    >
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Wallet Health Score</h2>
      <motion.div variants={itemVariants} className="space-y-4">
        <div>
          <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Overall Score: <span>{score.overallScore}/100</span>
          </p>
          <motion.div
            className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
            variants={progressBarVariants}
            initial="hidden"
            animate="visible"
            custom={score.overallScore}
          >
            <div className="h-full bg-blue-600 dark:bg-blue-500" />
          </motion.div>
        </div>
        {['activityScore', 'diversificationScore', 'profitabilityScore', 'securityScore'].map((key) => (
          <motion.div
            key={key}
            variants={itemVariants}
            whileHover={{ scale: 1.03, boxShadow: '0 2px 6px rgba(59, 130, 246, 0.2)' }} // Glow effect
            transition={{ duration: 0.2 }}
            className="space-y-2"
          >
            <p className="text-sm font-medium text-gray-700 dark:text-gray-200 capitalize">
              <span>{`${key.replace('Score', '')}: ${score[key as keyof HealthScore]}/100`}</span>
            </p>
            <motion.div
              className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
              variants={progressBarVariants}
              initial="hidden"
              animate="visible"
              custom={score[key as keyof HealthScore]}
            >
              <div className="h-full bg-blue-500 dark:bg-blue-400" />
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default HealthScoreCard;
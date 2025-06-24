import React from 'react';
import { motion, Variants, Easing } from 'framer-motion';
import { HealthScore } from '../types';

interface HealthScoreCardProps {
  score: HealthScore;
}

const HealthScoreCard: React.FC<HealthScoreCardProps> = ({ score }) => {
  const progressBarVariants: Variants = {
    hidden: { width: 0 },
    visible: (percentage: number) => ({
      width: `${percentage}%`,
      transition: {
        duration: 1,
        ease: 'easeInOut' as Easing, // Explicitly type as Easing
      },
    }),
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-xl mt-6"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Wallet Health Score</h2>
      <div className="space-y-4">
        <div>
          <p className="text-lg font-semibold">
            Overall Score: <span>{score.overallScore}/100</span>
          </p>
          <motion.div
            className="h-4 bg-gray-200 rounded-full overflow-hidden"
            variants={progressBarVariants}
            initial="hidden"
            animate="visible"
            custom={score.overallScore}
          >
            <div className="h-full bg-blue-600" />
          </motion.div>
        </div>
        {['activityScore', 'diversificationScore', 'profitabilityScore', 'securityScore'].map((key) => (
          <div key={key} className="space-y-2">
            <p className="text-sm font-medium text-gray-700 capitalize">
              <span>{`${key.replace('Score', '')}: ${score[key as keyof HealthScore]}/100`}</span>
            </p>
            <motion.div
              className="h-2 bg-gray-200 rounded-full overflow-hidden"
              variants={progressBarVariants}
              initial="hidden"
              animate="visible"
              custom={score[key as keyof HealthScore]}
            >
              <div className="h-full bg-blue-500" />
            </motion.div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default HealthScoreCard;
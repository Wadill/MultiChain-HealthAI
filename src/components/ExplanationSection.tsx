import React from 'react';
import { motion } from 'framer-motion';
import { HealthScore } from '../types';

interface ExplanationSectionProps {
  explanations: HealthScore['explanations'];
}

const ExplanationSection: React.FC<ExplanationSectionProps> = ({ explanations }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-xl mt-6"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-4">AI-Generated Insights</h2>
      <div className="space-y-4">
        {Object.entries(explanations).map(([key, value]) => (
          <div key={key}>
            <h3 className="text-lg font-semibold capitalize">{key}</h3>
            <p className="text-gray-600">{value}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default ExplanationSection;
import React, { useState } from 'react';
import { motion, Variants, Easing } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { HealthScore } from '../types';

interface HealthScoreCardProps {
  score: HealthScore;
  address: string;
  chain: string;
}

const HealthScoreCard: React.FC<HealthScoreCardProps> = ({ score, address, chain }) => {
  const [showInsights, setShowInsights] = useState(false);

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

  const gaugeVariants: Variants = {
    hidden: { rotate: -90 },
    visible: (score: number) => ({
      rotate: -90 + (score / 100) * 180, // Map 0-100 to -90 to 90 degrees
      transition: { duration: 1, ease: 'easeInOut' as Easing },
    }),
  };

  // Mock transaction data for trend graph (replace with API data)
  const trendData = [
    { date: '2025-07-01', transactions: 5 },
    { date: '2025-07-05', transactions: 8 },
    { date: '2025-07-10', transactions: 3 },
    { date: '2025-07-13', transactions: 6 },
  ];

  const exportToCSV = () => {
    const csvContent = [
      ['Metric', 'Score', 'Explanation'],
      ['Overall', score.overallScore, score.explanations.overall],
      ['Activity', score.activityScore, score.explanations.activity],
      ['Diversification', score.diversificationScore, score.explanations.diversification],
      ['Profitability', score.profitabilityScore, score.explanations.profitability],
      ['Security', score.securityScore, score.explanations.security],
      ['Risk', score.riskScore, score.explanations.risk],
      ['MCP Insights', 'N/A', score.explanations.mcpInsights],
    ]
      .map((row) => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `health_metrics_${address}_${chain}.csv`;
    link.click();
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.02, boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)' }}
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
        {['activityScore', 'diversificationScore', 'profitabilityScore', 'securityScore', 'riskScore'].map((key) => (
          <motion.div
            key={key}
            variants={itemVariants}
            whileHover={{ scale: 1.03, boxShadow: '0 2px 6px rgba(59, 130, 246, 0.2)' }}
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

      {/* Metric Insights Section */}
      <motion.div variants={itemVariants} className="mt-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowInsights(!showInsights)}
          className="w-full bg-blue-600 text-white p-2 rounded-md dark:bg-blue-500"
        >
          {showInsights ? 'Hide Insights' : 'Show Metric Insights'}
        </motion.button>
        {showInsights && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
            className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg"
          >
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">AI-Powered Insights (via Nodit MCP)</h3>
            <p className="text-gray-600 dark:text-gray-300">{score.explanations.mcpInsights}</p>
          </motion.div>
        )}
      </motion.div>

      {/* Risk Assessment Gauge */}
      <motion.div variants={itemVariants} className="mt-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">Risk Assessment</h3>
        <div className="relative w-32 h-16 mx-auto">
          <svg width="100%" height="100%" viewBox="0 0 100 50">
            <path d="M10,50 A40,40 0 0,1 90,50" stroke="#E5E7EB" strokeWidth="8" fill="none" />
            <motion.path
              d="M10,50 A40,40 0 0,1 90,50"
              stroke={score.riskScore > 80 ? '#22C55E' : score.riskScore > 50 ? '#F59E0B' : '#EF4444'}
              strokeWidth="8"
              fill="none"
              strokeDasharray="125.6"
              strokeDashoffset={125.6 * (1 - score.riskScore / 100)}
              variants={gaugeVariants}
              initial="hidden"
              animate="visible"
              custom={score.riskScore}
            />
            <motion.line
              x1="50"
              y1="50"
              x2="50"
              y2="30"
              stroke="#4B5563"
              strokeWidth="4"
              variants={gaugeVariants}
              initial="hidden"
              animate="visible"
              custom={score.riskScore}
            />
          </svg>
          <p className="text-center text-sm text-gray-600 dark:text-gray-300 mt-2">
            Risk Score: {score.riskScore}/100
          </p>
        </div>
      </motion.div>

      {/* Trend Graph */}
      <motion.div variants={itemVariants} className="mt-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">Transaction Trends</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" stroke="#4B5563" />
              <YAxis stroke="#4B5563" />
              <Tooltip />
              <Line type="monotone" dataKey="transactions" stroke="#3B82F6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Export to CSV */}
      <motion.div variants={itemVariants} className="mt-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={exportToCSV}
          className="w-full bg-purple-600 text-white p-2 rounded-md dark:bg-purple-500"
        >
          Export Metrics to CSV
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default HealthScoreCard;
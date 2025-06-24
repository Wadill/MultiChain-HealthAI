import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { jsPDF } from 'jspdf';
import WalletInput from './components/WalletInput';
import HealthScoreCard from './components/HealthScoreCard';
import ExplanationSection from './components/ExplanationSection';
import HealthPendulum from './components/HealthPendulum';
import { HealthScore, WalletData } from './types';

const App: React.FC = () => {
  const [healthScores, setHealthScores] = useState<{ address: string; chain: string; score: HealthScore }[]>([]);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const calculateHealthScore = (data: WalletData): HealthScore => {
    const transactionCount = data.activity.transactionCount;
    const lastActiveDate = new Date(data.activity.lastActive);
    const daysSinceLastActive = (Date.now() - lastActiveDate.getTime()) / (1000 * 60 * 60 * 24);
    const activityScore = Math.min((transactionCount / 1000) * 100, 100) * (daysSinceLastActive < 30 ? 1 : 0.5);

    const tokenCount = data.diversification.tokenCount;
    const assetTypeCount = data.diversification.assetTypes.length;
    const diversificationScore = Math.min((tokenCount / 10) * 80 + (assetTypeCount / 5) * 20, 100);

    const roi = data.profitability.roi;
    const profitabilityScore = Math.min(roi * 5, 100);

    const securityScore = (data.security.multiSig ? 50 : 0) + (data.security.suspiciousActivity ? 0 : 50);

    const overallScore = Math.round(
      activityScore * 0.3 + diversificationScore * 0.25 + profitabilityScore * 0.25 + securityScore * 0.2
    );

    const explanations = {
      activity: `Transaction count (${transactionCount}) and recent activity (${daysSinceLastActive.toFixed(1)} days ago) indicate ${
        activityScore > 80 ? 'high' : 'moderate'
      } engagement.`,
      diversification: `Holding ${tokenCount} tokens across ${assetTypeCount} asset types suggests ${
        diversificationScore > 80 ? 'strong' : 'moderate'
      } diversification.`,
      profitability: `ROI of ${roi}% reflects ${profitabilityScore > 80 ? 'excellent' : 'average'} investment performance.`,
      security: `${data.security.multiSig ? 'Multi-signature wallet enhances' : 'Lack of multi-sig reduces'} security; ${
        data.security.suspiciousActivity ? 'suspicious activity detected' : 'no suspicious activity.'
      }`,
    };

    return {
      overallScore,
      activityScore: Math.round(activityScore),
      diversificationScore: Math.round(diversificationScore),
      profitabilityScore: Math.round(profitabilityScore),
      securityScore: Math.round(securityScore),
      explanations,
    };
  };

  const fetchWalletData = async (address: string, chain: string) => {
    setLoading(true);
    const validChains = ['Ethereum', 'Polygon', 'Aptos'] as const;
    type ValidChain = typeof validChains[number];
    if (!validChains.includes(chain as ValidChain)) {
      toast.error('Invalid chain selected');
      setLoading(false);
      return;
    }
    if (!address.match(/^0x[a-fA-F0-9]{40}$/) && chain !== 'Aptos') {
      toast.error('Invalid wallet address');
      setLoading(false);
      return;
    }

    try {
      // Nodit Web3 Data API call (uncomment with valid API key)
      /*
      const response = await axios.post(
        `https://web3.nodit.io/v1/${chain.toLowerCase()}/mainnet/token/getTokenTransfersByAccount`,
        {
          accountAddress: address,
          fromDate: '2025-01-01T00:00:00+00:00',
          toDate: '2025-06-24T00:00:00+00:00',
        },
        {
          headers: { 'X-API-KEY': process.env.REACT_APP_NODIT_API_KEY },
        }
      );
      const balanceResponse = await axios.post(
        `https://web3.nodit.io/v1/${chain.toLowerCase()}/mainnet/token/getTokenBalances`,
        { accountAddress: address },
        { headers: { 'X-API-KEY': process.env.REACT_APP_NODIT_API_KEY } }
      );
      */

      // Mock data
      const mockData: WalletData = {
        address,
        chain: chain as ValidChain,
        activity: { transactionCount: 150, lastActive: '2025-06-09' },
        diversification: { tokenCount: 5, assetTypes: ['ERC-20', 'NFT'] },
        profitability: { totalProfit: 1200, roi: 15 },
        security: { suspiciousActivity: false, multiSig: true },
      };

      const healthScore = calculateHealthScore(mockData);
      setHealthScores((prev) => [...prev, { address, chain, score: healthScore }]);
    } catch (error) {
      console.error('Error fetching wallet data:', error);
      toast.error('Failed to fetch wallet data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const generatePDF = (score: HealthScore, address: string, chain: string) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('MultiChain HealthAI Report', 20, 20);
    doc.setFontSize(12);
    doc.text(`Wallet: ${address}`, 20, 30);
    doc.text(`Chain: ${chain}`, 20, 40);
    doc.text(`Overall Score: ${score.overallScore}/100`, 20, 50);
    Object.entries(score.explanations).forEach(([key, value], i) => {
      doc.text(`${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`, 20, 60 + i * 10);
    });
    doc.save(`health_report_${address}_${chain}.pdf`);
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen py-10 transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-gray-100'}`}>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-gray-100">MultiChain HealthAI</h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: 'loop' }}
            onClick={toggleDarkMode}
            className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full text-gray-800 dark:text-gray-100"
          >
            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </motion.button>
        </div>
        <WalletInput onSubmit={fetchWalletData} />
        {loading && (
          <div className="text-center mt-4">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600 dark:border-blue-400"></div>
          </div>
        )}
        {healthScores.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {healthScores.map(({ address, chain, score }, index) => (
              <div key={`${address}-${chain}-${index}`}>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                    Wallet: {address.slice(0, 6)}...{address.slice(-4)} ({chain})
                  </h2>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatType: 'loop' }}
                    onClick={() => generatePDF(score, address, chain)}
                    className="bg-green-600 text-white p-2 rounded-md dark:bg-green-500"
                  >
                    Download Report
                  </motion.button>
                </div>
                <HealthScoreCard score={score} />
                <ExplanationSection explanations={score.explanations} />
              </div>
            ))}
          </div>
        )}
        {healthScores.length > 0 && (
          <HealthPendulum overallScore={healthScores[healthScores.length - 1].score.overallScore} />
        )}
        <ToastContainer position="top-right" autoClose={3000} theme={darkMode ? 'dark' : 'light'} />
      </div>
    </div>
  );
};

export default App;
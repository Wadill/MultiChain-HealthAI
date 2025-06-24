import React, { useState } from 'react';
import axios from 'axios';
import WalletInput from './components/WalletInput';
import HealthScoreCard from './components/HealthScoreCard';
import ExplanationSection from './components/ExplanationSection';
import { HealthScore, WalletData } from './types';

const App: React.FC = () => {
  const [healthScore, setHealthScore] = useState<HealthScore | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    setError(null);
    const validChains = ['Ethereum', 'Polygon', 'Aptos'] as const;
    type ValidChain = typeof validChains[number];
    if (!validChains.includes(chain as ValidChain)) {
      setError('Invalid chain selected');
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
          toDate: '2025-06-10T00:00:00+00:00',
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

      // Mock data (replace with API data)
      const mockData: WalletData = {
        address,
        chain: chain as ValidChain,
        activity: { transactionCount: 150, lastActive: '2025-06-09' },
        diversification: { tokenCount: 5, assetTypes: ['ERC-20', 'NFT'] },
        profitability: { totalProfit: 1200, roi: 15 },
        security: { suspiciousActivity: false, multiSig: true },
      };

      const healthScore = calculateHealthScore(mockData);
      setHealthScore(healthScore);
    } catch (error) {
      console.error('Error fetching wallet data:', error);
      setError('Failed to fetch wallet data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">MultiChain HealthAI</h1>
      <WalletInput onSubmit={fetchWalletData} />
      {loading && <p className="text-center mt-4 text-blue-600">Loading...</p>}
      {error && <p className="text-center mt-4 text-red-600">{error}</p>}
      {healthScore && (
        <>
          <HealthScoreCard score={healthScore} />
          <ExplanationSection explanations={healthScore.explanations} />
        </>
      )}
    </div>
  );
};

export default App;
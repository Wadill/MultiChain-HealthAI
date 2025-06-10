import React, { useState } from 'react';
import WalletInput from './components/WalletInput';
import HealthScoreCard from './components/HealthScoreCard';
import ExplanationSection from './components/ExplanationSection';
import { HealthScore, WalletData } from './types';

const App: React.FC = () => {
  const [healthScore, setHealthScore] = useState<HealthScore | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchWalletData = async (address: string, chain: string) => {
    setLoading(true);
    // Validate chain to match WalletData type
    const validChains = ['Ethereum', 'Polygon', 'Aptos'] as const;
    type ValidChain = typeof validChains[number];
    if (!validChains.includes(chain as ValidChain)) {
      console.error('Invalid chain selected');
      setLoading(false);
      return;
    }

    try {
      // Simulate Nodit API call (replace with actual API integration)
      // const response = await axios.post(
      //   'https://web3.nodit.io/v1/ethereum/mainnet/token/getTokenTransfersByAccount',
      //   { accountAddress: address, fromDate: '2025-01-01T00:00:00+00:00', toDate: '2025-01-31T00:00:00+00:00' },
      //   { headers: { 'X-API-KEY': process.env.REACT_APP_NODIT_API_KEY } }
      // );

      // Mock data for demonstration
      const mockData: WalletData = {
        address,
        chain: chain as ValidChain, // Explicit type assertion
        activity: { transactionCount: 150, lastActive: '2025-06-09' },
        diversification: { tokenCount: 5, assetTypes: ['ERC-20', 'NFT'] },
        profitability: { totalProfit: 1200, roi: 15 },
        security: { suspiciousActivity: false, multiSig: true },
      };

      // Simulate AI-generated health score and explanations via Nodit MCP
      const mockHealthScore: HealthScore = {
        overallScore: 85,
        activityScore: 90,
        diversificationScore: 80,
        profitabilityScore: 75,
        securityScore: 95,
        explanations: {
          activity: 'High transaction frequency indicates active engagement with the blockchain.',
          diversification: 'Moderate diversification with 5 tokens across 2 asset types.',
          profitability: 'Positive ROI of 15% suggests profitable investments.',
          security: 'Multi-signature wallet usage enhances security.',
        },
      };

      // Use mockData to avoid ESLint warning
      console.log('Fetched wallet data:', mockData);

      setHealthScore(mockHealthScore);
    } catch (error) {
      console.error('Error fetching wallet data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">MultiChain HealthAI</h1>
      <WalletInput onSubmit={fetchWalletData} />
      {loading && <p className="text-center mt-4">Loading...</p>}
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
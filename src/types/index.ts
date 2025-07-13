export interface WalletData {
  address: string;
  chain: 'Ethereum' | 'Polygon' | 'Aptos';
  activity: { transactionCount: number; lastActive: string; recentTransactions: { timestamp: string; value: number }[] };
  diversification: { tokenCount: number; assetTypes: string[]; nftCollections?: string[]; rarityScore?: number };
  profitability: { totalProfit: number; roi: number };
  security: { suspiciousActivity: boolean; multiSig: boolean };
  deFi?: { protocols: string[]; stakedValue: number };
}

export interface HealthScore {
  overallScore: number;
  activityScore: number;
  diversificationScore: number;
  profitabilityScore: number;
  securityScore: number;
  riskScore: number;
  explanations: {
    activity: string;
    diversification: string;
    profitability: string;
    security: string;
    risk: string;
    mcpInsights: string;
  };
}
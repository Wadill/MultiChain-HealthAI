export interface WalletData {
  address: string;
  chain: 'Ethereum' | 'Polygon' | 'Aptos';
  activity: {
    transactionCount: number;
    lastActive: string;
  };
  diversification: {
    tokenCount: number;
    assetTypes: string[];
  };
  profitability: {
    totalProfit: number;
    roi: number;
  };
  security: {
    suspiciousActivity: boolean;
    multiSig: boolean;
  };
}

export interface HealthScore {
  overallScore: number;
  activityScore: number;
  diversificationScore: number;
  profitabilityScore: number;
  securityScore: number;
  explanations: {
    activity: string;
    diversification: string;
    profitability: string;
    security: string;
  };
}
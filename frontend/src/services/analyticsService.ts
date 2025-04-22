interface AnalyticsData {
  spending: Array<{
    date: string;
    amount: number;
  }>;
  investment: Array<{
    date: string;
    value: number;
  }>;
}

interface MarketInsights {
  marketTrends: Array<{
    category: string;
    trend: string;
    impact: 'positive' | 'negative' | 'neutral';
  }>;
  investmentOpportunities: Array<{
    name: string;
    type: string;
    potential: number;
    risk: 'low' | 'medium' | 'high';
  }>;
}

// Mock data for testing
const mockAnalyticsData: AnalyticsData = {
  spending: [
    { date: '2024-01', amount: 5000 },
    { date: '2024-02', amount: 5500 },
    { date: '2024-03', amount: 4800 }
  ],
  investment: [
    { date: '2024-01', value: 10000 },
    { date: '2024-02', value: 10500 },
    { date: '2024-03', value: 11000 }
  ]
};

const mockMarketInsights: MarketInsights = {
  marketTrends: [
    {
      category: 'Technology',
      trend: 'Growing demand for AI solutions',
      impact: 'positive'
    },
    {
      category: 'Real Estate',
      trend: 'Market cooling in urban areas',
      impact: 'negative'
    },
    {
      category: 'Healthcare',
      trend: 'Stable growth in telemedicine',
      impact: 'neutral'
    }
  ],
  investmentOpportunities: [
    {
      name: 'Tech Growth Fund',
      type: 'ETF',
      potential: 15,
      risk: 'medium'
    },
    {
      name: 'Green Energy Bonds',
      type: 'Fixed Income',
      potential: 8,
      risk: 'low'
    },
    {
      name: 'Emerging Markets',
      type: 'Equity',
      potential: 20,
      risk: 'high'
    }
  ]
};

const analyticsService = {
  async getPremiumAnalytics(): Promise<AnalyticsData> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockAnalyticsData;
  },

  async getMarketInsights(): Promise<MarketInsights> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockMarketInsights;
  },

  async export(data: AnalyticsData): Promise<void> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Exporting analytics data:', data);
  }
};

export default analyticsService; 
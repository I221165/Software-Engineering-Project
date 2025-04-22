"use client"

import React, { useState, useEffect } from 'react';
import integrationService from '@/services/integrationService';
import analyticsService from '@/services/analyticsService';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Link as LinkIcon, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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

export default function MarketInsightsPage() {
  const [linked, setLinked] = useState(false);
  const [data, setData] = useState<MarketInsights | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleLinkAccounts = async () => {
    try {
      setLoading(true);
      setError(null);
      await integrationService.fetchInvestments();
      setLinked(true);
      const insights = await analyticsService.getMarketInsights();
      setData(insights);
      toast({
        title: "Success",
        description: "Investment accounts linked successfully",
      });
    } catch (err) {
      setError('Failed to link investment accounts. Please try again later.');
      toast({
        title: "Error",
        description: "Failed to link investment accounts. Please try again.",
        variant: "destructive",
      });
      console.error('Error linking accounts:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    if (!linked) return;
    
    try {
      setLoading(true);
      setError(null);
      const insights = await analyticsService.getMarketInsights();
      setData(insights);
      toast({
        title: "Success",
        description: "Market insights refreshed",
      });
    } catch (err) {
      setError('Failed to refresh market insights. Please try again later.');
      toast({
        title: "Error",
        description: "Failed to refresh market insights. Please try again.",
        variant: "destructive",
      });
      console.error('Error refreshing insights:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Market Insights</h1>
        {linked && (
          <Button
            variant="outline"
            onClick={handleRefresh}
            disabled={loading}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        )}
      </div>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {!linked ? (
        <Card>
          <CardHeader>
            <CardTitle>Link Investment Accounts</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Connect your investment accounts to get personalized market insights and recommendations.
            </p>
            <Button
              onClick={handleLinkAccounts}
              disabled={loading}
              className="w-full"
            >
              <LinkIcon className="mr-2 h-4 w-4" />
              {loading ? 'Linking...' : 'Link Accounts'}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Market Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data?.marketTrends.map((trend, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{trend.category}</p>
                      <p className="text-sm text-gray-600">{trend.trend}</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-sm ${
                      trend.impact === 'positive' ? 'bg-green-100 text-green-800' :
                      trend.impact === 'negative' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {trend.impact}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Investment Opportunities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data?.investmentOpportunities.map((opportunity, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{opportunity.name}</p>
                      <p className="text-sm text-gray-600">{opportunity.type}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">+{opportunity.potential}%</p>
                      <span className={`text-sm ${
                        opportunity.risk === 'low' ? 'text-green-600' :
                        opportunity.risk === 'high' ? 'text-red-600' :
                        'text-yellow-600'
                      }`}>
                        {opportunity.risk} risk
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
} 
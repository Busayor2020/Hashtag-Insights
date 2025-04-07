import { useMemo } from 'react';
import useSWR from 'swr';
import { TrendData } from '../mocks/trendData';

const fetcher = (url: string) => fetch(url).then(res => {
  if (!res.ok) throw new Error('Failed to fetch data');
  return res.json();
});

// Define a type for the trend direction
export type TrendDirection = 'up' | 'down' | 'neutral';

export function useHashtagTrend(hashtag: string) {
  const { data, error, isLoading } = useSWR<TrendData>(
    hashtag ? `/api/trends/${hashtag}` : null,
    fetcher
  );

  // Calculate trend direction with explicit type
  const trendDirection = useMemo<TrendDirection>(() => {
    if (!data?.trend || data.trend.length < 2) return 'neutral';
    
    const firstSentiment = data.trend[0].sentiment;
    const lastSentiment = data.trend[data.trend.length - 1].sentiment;
    
    return lastSentiment > firstSentiment ? 'up' : lastSentiment < firstSentiment ? 'down' : 'neutral';
  }, [data?.trend]);

  return {
    data,
    trendDirection,
    isLoading,
    isError: error,
  };
}
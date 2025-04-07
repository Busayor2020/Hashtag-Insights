// /pages/api/trends/[hashtag].ts
import { NextApiRequest, NextApiResponse } from 'next';
import { mockTrendData } from '../../../mocks/trendData';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { hashtag } = req.query;
  
  // Simulate a slight delay to show loading state
  setTimeout(() => {
    // Check if hashtag exists in our mock data
    if (typeof hashtag === 'string' && hashtag in mockTrendData) {
      res.status(200).json(mockTrendData[hashtag]);
    } else {
      res.status(404).json({ error: 'Hashtag not found' });
    }
  }, 800);
}
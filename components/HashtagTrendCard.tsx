/* eslint-disable react/no-unescaped-entities */
import React, { useCallback } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Skeleton,
  Button,
  Chip,
  useTheme
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import RefreshIcon from '@mui/icons-material/Refresh';
import SentimentChart from './SentimentChart';
import { TrendData } from '../mocks/trendData';
import { TrendDirection } from '../hooks/useHashtagTrend';

interface HashtagTrendCardProps {
  data?: TrendData;
  trendDirection: TrendDirection;
  isLoading: boolean;
  isError: Error | null;
  onRetry: () => void;
}

const HashtagTrendCard: React.FC<HashtagTrendCardProps> = React.memo(({
  data,
  trendDirection,
  isLoading,
  isError,
  onRetry
}) => {
  const theme = useTheme();

  // Render trend direction icon and color
  const renderTrendIndicator = useCallback(() => {
    let icon;
    let color;
    let label;

    switch (trendDirection) {
      case 'up':
        icon = <TrendingUpIcon />;
        color = theme.palette.success.main;
        label = 'Positive Trend';
        break;
      case 'down':
        icon = <TrendingDownIcon />;
        color = theme.palette.error.main;
        label = 'Negative Trend';
        break;
      default:
        icon = <TrendingFlatIcon />;
        color = theme.palette.info.main;
        label = 'Neutral Trend';
    }

    return (
      <Chip
        icon={icon}
        label={label}
        sx={{
          backgroundColor: `${color}20`,
          color: color,
          fontWeight: 'medium'
        }}
      />
    );
  }, [trendDirection, theme.palette]);

  // Loading state
  if (isLoading) {
    return (
      <Card elevation={3} sx={{ borderRadius: 2 }}>
        <CardContent>
          <Skeleton variant="text" width="60%" height={40} />
          <Skeleton variant="text" width="40%" height={24} />
          <Box sx={{ mt: 2, mb: 2 }}>
            <Skeleton variant="rounded" width="100%" height={300} />
          </Box>
          <Skeleton variant="rectangular" width={120} height={36} />
        </CardContent>
      </Card>
    );
  }

  // Error state
  if (isError || !data) {
    return (
      <Card elevation={3} sx={{ borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom color="error">
            Error Loading Data
          </Typography>
          <Typography variant="body1" paragraph>
            We couldn't load the sentiment data for this hashtag.
          </Typography>
          <Button
            variant="contained"
            startIcon={<RefreshIcon />}
            onClick={onRetry}
            sx={{ mt: 2 }}
          >
            Retry
          </Button>
        </CardContent>
      </Card>
    );
  }

  // Successful data load
  return (
    <Card elevation={3} sx={{ borderRadius: 2, overflow: 'visible' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1, flexWrap: 'wrap' }}>
          <Typography variant="h5" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            {data.hashtag}
          </Typography>
          {renderTrendIndicator()}
        </Box>

        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2 }}>
          {data.range}
        </Typography>

        <Box sx={{ mt: 3, mb: 1 }}>
          <SentimentChart data={data.trend} trendDirection={trendDirection} />
        </Box>
      </CardContent>
    </Card>
  );
});

HashtagTrendCard.displayName = 'HashtagTrendCard';

export default HashtagTrendCard;
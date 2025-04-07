import React, { useMemo } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { TrendDataPoint } from '../mocks/trendData';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import { TrendDirection } from '../hooks/useHashtagTrend';

interface SentimentChartProps {
  data: TrendDataPoint[];
  trendDirection: TrendDirection;
}

const SentimentChart: React.FC<SentimentChartProps> = React.memo(({ data, trendDirection }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Process data for the chart
  const { xAxisData, sentimentData, minSentiment, maxSentiment } = useMemo(() => {
    const xAxisData = data.map(point => new Date(point.date));
    const sentimentData = data.map(point => point.sentiment);
    const minSentiment = Math.min(...sentimentData);
    const maxSentiment = Math.max(...sentimentData);

    return { xAxisData, sentimentData, minSentiment, maxSentiment };
  }, [data]);

  // Determine chart color based on trend direction
  const chartColor = useMemo(() => {
    switch (trendDirection) {
      case 'up':
        return theme.palette.success.main;
      case 'down':
        return theme.palette.error.main;
      default:
        return theme.palette.info.main;
    }
  }, [trendDirection, theme.palette]);

  return (
    <Box sx={{ width: '100%', height: isMobile ? 200 : 300 }}>
      <LineChart
        xAxis={[
          {
            data: xAxisData,
            scaleType: 'time',
            valueFormatter: (date) =>
              date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            tickLabelStyle: {
              fill: theme.palette.text.primary,
            },
          },
        ]}
        yAxis={[
          {
            min: Math.floor(minSentiment * 10) / 10 - 0.1,
            max: Math.ceil(maxSentiment * 10) / 10 + 0.1,
            valueFormatter: (value) => value.toFixed(1),
            tickLabelStyle: {
              fill: theme.palette.text.primary,
            },
          },
        ]}
        series={[
          {
            data: sentimentData,
            label: 'Sentiment',
            color: chartColor,
            showMark: !isMobile,
            area: true,
            curve: 'monotoneX',
          },
        ]}
        height={isMobile ? 200 : 300}
        margin={{ top: 20, right: 20, bottom: 30, left: 40 }}
        slotProps={{
          legend: {
            labelStyle: {
              fill: theme.palette.text.primary,
            },
          },
        }}
        sx={{
          '.MuiChartsAxis-tickLabel': {
            fill: theme.palette.text.secondary
          },
          '.MuiChartsAxis-line': {
            stroke: theme.palette.divider
          },
          '.MuiChartsAxis-tick': {
            stroke: theme.palette.divider
          },
          '.MuiChartsGrid-line': {
            stroke: theme.palette.divider,
            opacity: 0.2
          },
        }}
      />
    </Box>
  );
});

SentimentChart.displayName = 'SentimentChart';

export default SentimentChart; 
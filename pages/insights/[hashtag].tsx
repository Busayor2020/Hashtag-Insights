import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import {
  Container,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  AppBar,
  Toolbar
} from '@mui/material';
import { useHashtagTrend } from '../../hooks/useHashtagTrend';
import HashtagTrendCard from '../../components/HashtagTrendCard';
import ThemeToggleButton from '../../components/ThemeToggleButton';
import Head from 'next/head';

const availableHashtags = ['uri', 'nextjs', 'react'];

export default function HashtagInsightPage() {
  const router = useRouter();
  const { hashtag } = router.query;
  const currentHashtag = typeof hashtag === 'string' ? hashtag : '';

  // Fetch data using our custom hook
  const { data, trendDirection, isLoading, isError } = useHashtagTrend(currentHashtag);

  // Retry handler when error occurs
  const handleRetry = useCallback(() => {
    router.reload();
  }, [router]);

  // Handle hashtag change (bonus feature)
  const handleHashtagChange = useCallback((event: SelectChangeEvent) => {
    const value = event.target.value;
    router.push(`/insights/${value}`);
  }, [router]);

  return (
    <>
      <Head>
        <title>{currentHashtag ? `${currentHashtag} Sentiment Insights` : 'Hashtag Insights'}</title>
        <meta name="description" content={`Sentiment analysis for ${currentHashtag}`} />
      </Head>

      <AppBar position="static" color="transparent" elevation={0} sx={{ mb: 2 }}>
        <Toolbar sx={{ justifyContent: 'flex-end' }}>
          <ThemeToggleButton />
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Hashtag Sentiment Insights
          </Typography>

          {/* Bonus: Hashtag selector dropdown */}
          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel id="hashtag-select-label">Hashtag</InputLabel>
            <Select
              labelId="hashtag-select-label"
              id="hashtag-select"
              value={currentHashtag}
              label="Hashtag"
              onChange={handleHashtagChange}
              disabled={isLoading}
            >
              {availableHashtags.map((tag) => (
                <MenuItem key={tag} value={tag}>#{tag}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <HashtagTrendCard
          data={data}
          trendDirection={trendDirection}
          isLoading={isLoading}
          isError={isError}
          onRetry={handleRetry}
        />

        <Box sx={{ mt: 4 }}>
          <Typography variant="body2" color="text.secondary">
            Data shows sentiment analysis from {data?.range || 'the selected period'}.
            Positive values indicate favorable sentiment.
          </Typography>
        </Box>
      </Container>
    </>
  );
} 
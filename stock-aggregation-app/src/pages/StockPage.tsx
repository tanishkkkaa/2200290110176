  import { useEffect, useState } from 'react';
  import { fetchStocks, fetchStockHistory } from '../api/stocks';
  import { Line } from 'react-chartjs-2';
  import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Typography,
    Box,
    CircularProgress,
  } from '@mui/material';
  import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { average } from '../utils/calculation';

  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

  const StockPage = () => {
    const [tickers, setTickers] = useState<{ [name: string]: string }>({});
    const [selectedTicker, setSelectedTicker] = useState('NVDA');
    const [minutes, setMinutes] = useState(30);
    const [prices, setPrices] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      fetchStocks().then(data => setTickers(data.stocks));
    }, []);

    useEffect(() => {
      if (selectedTicker) {
        setLoading(true);
        fetchStockHistory(selectedTicker, minutes)
          .then(data => setPrices(data))
          .finally(() => setLoading(false));
      }
    }, [selectedTicker, minutes]);

    const labels = prices.map(p => new Date(p.lastUpdatedAt).toLocaleTimeString());
    const dataPoints = prices.map(p => p.price);
    const avg = average(dataPoints);

    const chartData = {
      labels,
      datasets: [
        {
          label: `${selectedTicker} Price`,
          data: dataPoints,
          borderColor: 'blue',
          fill: false,
        },
        {
          label: 'Average',
          data: dataPoints.map(() => avg),
          borderColor: 'red',
          borderDash: [5, 5],
          fill: false,
        },
      ],
    };

    return (
      <Box>
        <Typography variant="h5" gutterBottom>Stock Page</Typography>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Stock</InputLabel>
          <Select value={selectedTicker} onChange={e => setSelectedTicker(e.target.value)}>
            {Object.entries(tickers).map(([name, symbol]) => (
              <MenuItem key={symbol} value={symbol}>{name} ({symbol})</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Minutes</InputLabel>
          <Select value={minutes} onChange={e => setMinutes(Number(e.target.value))}>
            {[10, 30, 50, 60].map(m => (
              <MenuItem key={m} value={m}>{m} minutes</MenuItem>
            ))}
          </Select>
        </FormControl>
        {loading ? (
          <CircularProgress />
        ) : (
          <Line data={chartData} />
        )}
      </Box>
    );
  };

  export default StockPage;

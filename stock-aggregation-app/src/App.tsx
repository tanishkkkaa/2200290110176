import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import StockPage from './pages/StockPage';
import HeatmapPage from './pages/HeatmapPage';
import { AppBar, Toolbar, Button, Box } from '@mui/material';

function App() {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/">Stock Page</Button>
          <Button color="inherit" component={Link} to="/heatmap">Heatmap</Button>
        </Toolbar>
      </AppBar>
      <Box p={2}>
        <Routes>
          <Route path="/" element={<StockPage />} />
          <Route path="/heatmap" element={<HeatmapPage />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;

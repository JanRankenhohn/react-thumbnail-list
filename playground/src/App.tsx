import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ExtendedDemo from './demoPages/ExtendedDemo';
import './App.css';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import HugeDataDemo from './demoPages/HugeData';
import SimpleDemo from './demoPages/SimpleDemo';

function App() {
  return (
    <>
      <Router>
        <Box sx={{ flexGrow: 1, mb: 2 }}>
          <AppBar position="static" color="default">
            <Toolbar>
              <Typography variant="h6" flexGrow={1}>
                ThumbnailList Demo
              </Typography>
              <Link to="/react-thumbnail-list">
                <Button>Simple</Button>
              </Link>
              <Link to="/react-thumbnail-list/extended">
                <Button>Extended</Button>
              </Link>
              <Link to="/react-thumbnail-list/hugedata">
                <Button>Huge Data</Button>
              </Link>
            </Toolbar>
          </AppBar>
        </Box>
        <Routes>
          <Route path="/react-thumbnail-list" element={<SimpleDemo />} />
          <Route path="/react-thumbnail-list/extended" element={<ExtendedDemo />} />
          <Route path="/react-thumbnail-list/hugedata" element={<HugeDataDemo />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

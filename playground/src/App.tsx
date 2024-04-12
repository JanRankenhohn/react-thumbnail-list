import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SimpleDemo from './demoPages/SimpleDemo';
import ExtendedDemo from './demoPages/ExtendedDemo';
import './App.css';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';

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
              <Link to="/">
                <Button>Simple</Button>
              </Link>
              <Link to="/extended">
                <Button>Extended</Button>
              </Link>
            </Toolbar>
          </AppBar>
        </Box>
        <Routes>
          <Route path="/" element={<SimpleDemo />} />
          <Route path="/extended" element={<ExtendedDemo />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

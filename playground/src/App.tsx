import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ListDemo from './ListDemo';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ListDemo />} />
      </Routes>
    </Router>
  );
}

export default App;

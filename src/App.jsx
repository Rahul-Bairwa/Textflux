import LandingPage from './LandingPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { createRoot } from 'react-dom/client';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

createRoot(document.getElementById('root')).render(
  <App />
);

export default App;

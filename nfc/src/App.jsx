// App.js
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Users from './components/Users';
import MatchMaking from './pages/MatchMaking';
import PlaytimeDashboard from './components/PlaytimeDashboard';
import GameSessionManagement from './components/GameSessionManagement';
import Dashboard from './components/Dashboard';
import TrackerInfo from './components/TrackerInfo';
import TournamentPage from './pages/TournamentPage';
import FAQ from './pages/FAQ';
import Navbar from './components/Navbar';

function App() {

  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/users" element={<Users />} />
        <Route path="/match" element={<MatchMaking />} />
        <Route path="/charts" element={<PlaytimeDashboard />} />
        <Route path="/session" element={<GameSessionManagement />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tracker" element={<TrackerInfo />} />
        <Route path="/tournament" element={<TournamentPage />} />
        <Route path="/faq" element={<FAQ />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

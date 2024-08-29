// App.js
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Users from './components/Users';
import Fortnite from './pages/Fortnite';
import MatchMaking from './pages/MatchMaking';
import PlaytimeDashboard from './components/PlaytimeDashboard';
import GameSessionManagement from './components/GameSessionManagement';
import Dashboard from './components/Dashboard';
import GamingPage from './components/GamingPage';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/users" element={<Users />} />
        <Route path="/match" element={<MatchMaking />} />
        <Route path="/charts" element={<PlaytimeDashboard />} />
        <Route path="/session" element={<GameSessionManagement />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

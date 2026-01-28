import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import { Login, Signup } from './pages/Auth';
import DashboardLayout from './pages/DashboardLayout';
import DashboardHome from './pages/DashboardHome';
import Transactions from './pages/Transactions';
import Analytics from './pages/Analytics';
import Trends from './pages/Trends';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="trends" element={<Trends />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
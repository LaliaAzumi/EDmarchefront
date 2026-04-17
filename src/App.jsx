import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import Register from './pages/Register'
import VerifyEmail from './pages/VerifyEmail'
import EmailVerified from './pages/EmailVerified'
import CitizenDashboard from './pages/CitizenDashboard'
import Profile from './pages/Profile'
import Services from './pages/Services'
import Appointments from './pages/Appointments'
import Carte from './pages/Carte'
import AdminDashboard from './pages/AdminDashboard'
import AgentDemandes from './pages/AgentDemandes'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/email-verified" element={<EmailVerified />} />
        <Route path="/citizen" element={<CitizenDashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/services" element={<Services />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/carte" element={<Carte />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/agent/demandes" element={<AgentDemandes />} />
      </Routes>
    </Router>
  )
}

export default App


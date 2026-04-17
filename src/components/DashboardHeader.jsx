import { useNavigate } from 'react-router-dom'
import { Bell, User, Settings, LogOut, ChevronDown } from 'lucide-react'
import { useState, useEffect } from 'react'
import { authAPI } from '../services/api'

export default function DashboardHeader({ userType = 'citizen' }) {
  const navigate = useNavigate()
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (stored) {
      setUser(JSON.parse(stored))
    }
  }, [])

  const handleLogout = async () => {
    await authAPI.logout()
    navigate('/login')
  }

  const displayName = user
    ? (user.prenom ? `${user.prenom} ${user.nom || ''}`.trim() : user.nom || 'Utilisateur')
    : 'Utilisateur'
  const displayEmail = user?.email || ''
  const initials = displayName
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div
            onClick={() => navigate('/')}
            className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition"
          >
            <div className="text-2xl font-bold text-teal-600">e-Démarches</div>
            <div className="text-sm text-gray-600">🇲🇬</div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-8">
            {userType === 'citizen' ? (
              <>
                <button onClick={() => navigate('/citizen')} className="text-teal-600 border-b-2 border-teal-600 font-semibold text-sm pb-2 cursor-pointer">Tableau de bord</button>
                <button onClick={() => navigate('/services')} className="text-gray-700 hover:text-teal-600 transition font-medium text-sm cursor-pointer">Services</button>
                <button onClick={() => navigate('/appointments')} className="text-gray-700 hover:text-teal-600 transition font-medium text-sm cursor-pointer">Rendez-vous</button>
                <button onClick={() => navigate('/carte')} className="text-gray-700 hover:text-teal-600 transition font-medium text-sm cursor-pointer">Carte</button>
              </>
            ) : (
              <>
                <button onClick={() => navigate('/admin')} className="text-teal-600 border-b-2 border-teal-600 font-semibold text-sm pb-2 cursor-pointer">Tableau de bord</button>
                <button onClick={() => navigate('/agent/demandes')} className="text-gray-700 hover:text-teal-600 transition font-medium text-sm cursor-pointer">Demandes</button>
                <button onClick={() => navigate('/appointments')} className="text-gray-700 hover:text-teal-600 transition font-medium text-sm cursor-pointer">Rendez-vous</button>
              </>
            )}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition relative">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-600 to-teal-400 flex items-center justify-center text-white text-sm font-bold">
                  {initials || 'U'}
                </div>
                <ChevronDown className="w-4 h-4 text-gray-600" />
              </button>

              {/* Profile Dropdown */}
              {isProfileOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-50">
                  <div className="px-4 py-3 border-b border-gray-200">
                    <p className="text-sm font-semibold text-gray-900">{displayName}</p>
                    <p className="text-xs text-gray-600">{displayEmail}</p>
                  </div>
                  <div className="py-2">
                    <button
                      onClick={() => { navigate('/profile'); setIsProfileOpen(false) }}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition flex items-center gap-2"
                    >
                      <User className="w-4 h-4" />
                      Mon profil
                    </button>
                    <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition flex items-center gap-2">
                      <Settings className="w-4 h-4" />
                      Paramètres
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition flex items-center gap-2 border-t border-gray-200 mt-2 pt-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Déconnexion
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}


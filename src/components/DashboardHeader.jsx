import { useNavigate } from 'react-router-dom'
import { Bell, User, Settings, LogOut, Search, ChevronDown } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function DashboardHeader({ userType = 'citizen' }) {
  const navigate = useNavigate()
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [userInfo, setUserInfo] = useState({ nom: '', email: '', prenom: '' })

  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (stored) {
      try {
        const user = JSON.parse(stored)
        setUserInfo({
          nom: user.nom || '',
          email: user.email || '',
          prenom: user.prenom || '',
        })
      } catch {}
    }
  }, [])

  const initials = ((userInfo.prenom ? userInfo.prenom[0] : '') + (userInfo.nom ? userInfo.nom[0] : '')).toUpperCase() || 'U'
  const displayName = userInfo.prenom ? `${userInfo.prenom} ${userInfo.nom}` : userInfo.nom || 'Utilisateur'

  const handleLogout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition"
          >
            <div className="text-2xl font-bold text-primary">e-Démarches</div>
            <div className="text-sm text-gray-600">🇲🇬</div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-8">
            {userType === 'citizen' ? (
              <>
                <button onClick={() => navigate('/citizen')} className="text-primary border-b-2 border-primary font-semibold text-sm pb-2 cursor-pointer">Tableau de bord</button>
                <button onClick={() => navigate('/services')} className="text-gray-700 hover:text-primary transition font-medium text-sm cursor-pointer">Services</button>
                <button onClick={() => navigate('/appointments')} className="text-gray-700 hover:text-primary transition font-medium text-sm cursor-pointer">Rendez-vous</button>
              </>
            ) : (
              <>
                <button onClick={() => navigate('/admin')} className="text-primary border-b-2 border-primary font-semibold text-sm pb-2 cursor-pointer">Tableau de bord</button>
                <button onClick={() => navigate('/admin')} className="text-gray-700 hover:text-primary transition font-medium text-sm cursor-pointer">Demandes</button>
                <button onClick={() => navigate('/appointments')} className="text-gray-700 hover:text-primary transition font-medium text-sm cursor-pointer">Rendez-vous</button>
                <a href="#" className="text-gray-700 hover:text-primary transition font-medium text-sm">Statistiques</a>
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
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-white text-sm font-bold">
                  {initials}
                </div>
                <ChevronDown className="w-4 h-4 text-gray-600" />
              </button>

              {/* Profile Dropdown */}
              {isProfileOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-50">
                  <div className="px-4 py-3 border-b border-gray-200">
                    <p className="text-sm font-semibold text-gray-900">{displayName}</p>
                    <p className="text-xs text-gray-600">{userInfo.email}</p>
                  </div>
                  <div className="py-2">
                    <button 
                      onClick={() => { setIsProfileOpen(false); navigate('/profile') }}
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

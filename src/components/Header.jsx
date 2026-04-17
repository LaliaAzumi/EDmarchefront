import { useNavigate } from 'react-router-dom'
import { Search, ChevronDown, Map } from 'lucide-react'
import { useState } from 'react'

export default function Header() {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)

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

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button onClick={() => navigate('/')} className="text-gray-700 hover:text-primary transition font-medium text-sm cursor-pointer">Accueil</button>
            <button onClick={() => navigate('/services')} className="text-gray-700 hover:text-primary transition font-medium text-sm cursor-pointer">Services</button>
            <button onClick={() => navigate('/appointments')} className="text-gray-700 hover:text-primary transition font-medium text-sm cursor-pointer">Rendez-vous</button>
            <button onClick={() => navigate('/carte')} className="text-gray-700 hover:text-primary transition font-medium text-sm cursor-pointer flex items-center gap-1"><Map className="w-4 h-4" />Carte</button>
            <a href="#" className="text-gray-700 hover:text-primary transition font-medium text-sm">Centre d'aide</a>
            <a href="#" className="text-gray-700 hover:text-primary transition font-medium text-sm">À propos</a>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition">
              <Search className="w-5 h-5 text-gray-600" />
            </button>
            
            <button className="p-2 hover:bg-gray-100 rounded-lg transition">
              <ChevronDown className="w-5 h-5 text-gray-600" />
            </button>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <nav className="md:hidden mt-4 flex flex-col gap-3 border-t border-gray-200 pt-4">
            <button onClick={() => navigate('/')} className="text-gray-700 hover:text-primary transition font-medium text-sm text-left cursor-pointer">Accueil</button>
            <button onClick={() => navigate('/services')} className="text-gray-700 hover:text-primary transition font-medium text-sm text-left cursor-pointer">Services</button>
            <button onClick={() => navigate('/appointments')} className="text-gray-700 hover:text-primary transition font-medium text-sm text-left cursor-pointer">Rendez-vous</button>
            <button onClick={() => navigate('/carte')} className="text-gray-700 hover:text-primary transition font-medium text-sm text-left cursor-pointer flex items-center gap-1"><Map className="w-4 h-4" />Carte</button>
            <a href="#" className="text-gray-700 hover:text-primary transition font-medium text-sm">Centre d'aide</a>
            <a href="#" className="text-gray-700 hover:text-primary transition font-medium text-sm">À propos</a>
          </nav>
        )}
      </div>
    </header>
  )
}

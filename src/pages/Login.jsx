import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Lock, Mail } from 'lucide-react'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [userType, setUserType] = useState('citizen')

  const handleLogin = (e) => {
    e.preventDefault()
    // Mock login - in real app would authenticate
    if (userType === 'citizen') {
      navigate('/citizen')
    } else {
      navigate('/admin')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
      <div className="flex">
        {/* Left side - Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
          <div className="w-full max-w-md">
            {/* Logo */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-teal-600 mb-4">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">e-Démarches</h1>
              <p className="text-gray-600 mt-2">Connexion sécurisée</p>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-6">
              {/* User Type Selection */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">Type de compte</label>
                <div className="grid grid-cols-2 gap-3">
                  <label className="flex items-center p-3 border-2 rounded-lg cursor-pointer transition-all"
                    style={{ borderColor: userType === 'citizen' ? '#2D6A5F' : '#E5E7EB', backgroundColor: userType === 'citizen' ? '#F0F9F7' : 'white' }}>
                    <input
                      type="radio"
                      name="userType"
                      value="citizen"
                      checked={userType === 'citizen'}
                      onChange={(e) => setUserType(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-900">Citoyen</span>
                  </label>
                  <label className="flex items-center p-3 border-2 rounded-lg cursor-pointer transition-all"
                    style={{ borderColor: userType === 'admin' ? '#2D6A5F' : '#E5E7EB', backgroundColor: userType === 'admin' ? '#F0F9F7' : 'white' }}>
                    <input
                      type="radio"
                      name="userType"
                      value="admin"
                      checked={userType === 'admin'}
                      onChange={(e) => setUserType(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-900">Administrateur</span>
                  </label>
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Adresse e-mail</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="exemple@email.com"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mot de passe</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Remember me & Forgot password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" className="w-4 h-4 rounded" />
                  <span className="ml-2 text-sm text-gray-600">Se souvenir de moi</span>
                </label>
                <a href="#" className="text-sm text-teal-600 hover:text-teal-700 font-medium">Mot de passe oublié?</a>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 rounded-lg transition-colors duration-200"
              >
                Se connecter
              </button>

              {/* Demo credentials */}
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
                <p className="font-medium mb-1">Démonstration :</p>
                <p>Email: demo@example.com</p>
                <p>Mot de passe: demo123</p>
              </div>
            </form>

            {/* Sign up link */}
            <p className="mt-6 text-center text-gray-600">
              Pas encore de compte?{' '}
              <button onClick={() => navigate('/register')} className="text-teal-600 hover:text-teal-700 font-medium">
                Créer un compte
              </button>
            </p>
          </div>
        </div>

        {/* Right side - Illustration */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-teal-600 to-teal-700 items-center justify-center p-8">
          <div className="text-center">
            <div className="bg-white bg-opacity-10 rounded-3xl p-12 backdrop-blur-sm">
              <Lock className="w-24 h-24 text-white mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-white mb-4">Sécurité & Confiance</h2>
              <p className="text-teal-100 text-lg">
                Vos données sont protégées par les standards de sécurité les plus élevés. Accès sécurisé par authentification forte.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

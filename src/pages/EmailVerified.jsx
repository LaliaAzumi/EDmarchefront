import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'

export default function EmailVerified() {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login')
    }, 5000)
    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-white flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Email confirmé !
          </h1>
          <p className="text-gray-600 mb-6">
            Votre compte est maintenant activé. Vous pouvez vous connecter.
          </p>

          <button
            onClick={() => navigate('/login')}
            className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg transition"
          >
            Se connecter maintenant
          </button>

          <p className="text-sm text-gray-400 mt-4">
            Redirection automatique dans 5 secondes...
          </p>
        </div>
      </div>
    </div>
  )
}

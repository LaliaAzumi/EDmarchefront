import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Mail, RefreshCw, ArrowLeft } from 'lucide-react'
import { authAPI } from '../services/api'

export default function VerifyEmail() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const email = searchParams.get('email') || localStorage.getItem('pending_email') || ''
  const [resending, setResending] = useState(false)
  const [message, setMessage] = useState('')
  const [checking, setChecking] = useState(false)

  useEffect(() => {
    if (email) {
      localStorage.setItem('pending_email', email)
    }
  }, [email])

  const handleResend = async () => {
    setResending(true)
    setMessage('')
    try {
      await authAPI.resendVerificationEmail(email)
      setMessage('Un nouvel email de confirmation a été envoyé.')
    } catch (err) {
      setMessage("Erreur lors de l'envoi. Veuillez réessayer.")
    } finally {
      setResending(false)
    }
  }

  const handleCheckVerified = async () => {
    setChecking(true)
    setMessage('')
    try {
      const result = await authAPI.checkEmailVerified(email)
      if (result.verified) {
        localStorage.removeItem('pending_email')
        navigate('/login')
      } else {
        setMessage("Votre email n'est pas encore vérifié. Veuillez cliquer sur le lien dans l'email.")
      }
    } catch (err) {
      setMessage('Erreur lors de la vérification.')
    } finally {
      setChecking(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-white flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-teal-600" />
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Vérifiez votre email
          </h1>
          <p className="text-gray-600 mb-2">
            Un lien de confirmation a été envoyé à :
          </p>
          <p className="text-teal-700 font-semibold mb-6 break-all">
            {email}
          </p>
          <p className="text-sm text-gray-500 mb-8">
            Cliquez sur le lien dans l'email pour activer votre compte. Sans cette étape, vous ne pourrez pas accéder à la plateforme.
          </p>

          {message && (
            <div className={`p-3 rounded-lg mb-6 text-sm ${
              message.includes('Erreur') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'
            }`}>
              {message}
            </div>
          )}

          <div className="space-y-3">
            <button
              onClick={handleCheckVerified}
              disabled={checking}
              className="w-full py-3 bg-teal-600 hover:bg-teal-700 disabled:bg-teal-400 text-white font-semibold rounded-lg transition"
            >
              {checking ? 'Vérification...' : "J'ai cliqué sur le lien"}
            </button>

            <button
              onClick={handleResend}
              disabled={resending}
              className="w-full py-3 bg-white border border-teal-600 text-teal-600 hover:bg-teal-50 disabled:opacity-50 font-semibold rounded-lg transition flex items-center justify-center gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${resending ? 'animate-spin' : ''}`} />
              {resending ? 'Envoi en cours...' : "Renvoyer l'email"}
            </button>
          </div>

          <button
            onClick={() => navigate('/login')}
            className="mt-6 flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mx-auto transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à la connexion
          </button>
        </div>
      </div>
    </div>
  )
}

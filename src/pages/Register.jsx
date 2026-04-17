import { useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { Eye, EyeOff, Lock, Mail, User, Phone, MapPin, FileText, AlertCircle } from 'lucide-react'

import { GoogleLogin } from '@react-oauth/google'

import { authAPI } from '../services/api'



export default function Register() {

  const navigate = useNavigate()

  const [step, setStep] = useState(1)

  const [formData, setFormData] = useState({

    firstName: '',

    lastName: '',

    email: '',

    phone: '',

    cin: '',

    address: '',

    password: '',

    confirmPassword: '',

    agreeTerms: false

  })

  const [showPassword, setShowPassword] = useState(false)

  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [loading, setLoading] = useState(false)

  const [error, setError] = useState('')

  const [success, setSuccess] = useState(false)



  const handleChange = (e) => {

    const { name, value, type, checked } = e.target

    setFormData(prev => ({

      ...prev,

      [name]: type === 'checkbox' ? checked : value

    }))

  }



  const handleNext = () => {

    if (step < 3) setStep(step + 1)

  }



  const handlePrev = () => {

    if (step > 1) setStep(step - 1)

  }



  const handleSubmit = async (e) => {

    e.preventDefault()

    setError('')

    

    if (formData.password !== formData.confirmPassword) {

      setError('Les mots de passe ne correspondent pas')

      return

    }

    

    if (formData.password.length < 8) {

      setError('Le mot de passe doit contenir au moins 8 caractères')

      return

    }

    

    setLoading(true)

    

    try {

      const response = await authAPI.register({

        email: formData.email,

        firstName: formData.firstName,

        lastName: formData.lastName,

        password: formData.password,

      })

      

      setSuccess(true)

      // Redirection après 3 secondes

      setTimeout(() => {

        navigate(`/verify-email?email=${encodeURIComponent(formData.email)}`)

      }, 3000)

    } catch (err) {

      setError(err.message || 'Erreur lors de l\'inscription')

    } finally {

      setLoading(false)

    }

  }



  const handleGoogleRegister = (credentialResponse) => {

    console.log('Google Register Credential:', credentialResponse)

    // Rediriger vers le backend Django allauth

    window.location.href = 'http://localhost:8000/accounts/google/login/'

  }



  return (

    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 py-12 px-4 sm:px-6 lg:px-8">

      <div className="max-w-2xl mx-auto">

        {/* Logo */}

        <div className="text-center mb-8">

          <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-teal-600 mb-4">

            <User className="w-6 h-6 text-white" />

          </div>

          <h1 className="text-2xl font-bold text-gray-900">e-Démarches</h1>

          <p className="text-gray-600 mt-2">Créer un nouveau compte</p>

        </div>



        {/* Progress indicator */}

        <div className="flex justify-between items-center mb-8">

          {[1, 2, 3].map((num) => (

            <div key={num} className="flex items-center">

              <div

                className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white transition-colors"

                style={{ backgroundColor: step >= num ? '#2D6A5F' : '#D1D5DB' }}

              >

                {num}

              </div>

              {num < 3 && (

                <div

                  className="w-12 h-1 mx-2 transition-colors"

                  style={{ backgroundColor: step > num ? '#2D6A5F' : '#D1D5DB' }}

                />

              )}

            </div>

          ))}

        </div>



        {/* Google Sign Up - Step 1 only */}

        {step === 1 && (

          <div className="bg-white rounded-xl shadow-lg p-8 mb-6">

            <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Inscription rapide</h3>

            <div className="flex justify-center">

              <GoogleLogin

                onSuccess={handleGoogleRegister}

                onError={() => console.log('Register Failed')}

                text="signup_with"

                shape="rectangular"

                theme="outline"

                size="large"

                width="100%"

              />

            </div>



            <div className="relative mt-6">

              <div className="absolute inset-0 flex items-center">

                <div className="w-full border-t border-gray-300"></div>

              </div>

              <div className="relative flex justify-center text-sm">

                <span className="px-2 bg-white text-gray-500">ou inscrivez-vous manuellement</span>

              </div>

            </div>

          </div>

        )}



        {/* Step titles */}

        <div className="text-center mb-6">

          {step === 1 && <h2 className="text-xl font-bold text-gray-900">Informations personnelles</h2>}

          {step === 2 && <h2 className="text-xl font-bold text-gray-900">Détails du compte</h2>}

          {step === 3 && <h2 className="text-xl font-bold text-gray-900">Confirmer et créer</h2>}

        </div>



        {/* Form */}

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8">

          {/* Error Message */}

          {error && (

            <div className="p-3 mb-6 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2 text-red-800">

              <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />

              <p className="text-sm">{error}</p>

            </div>

          )}



          {/* Success Message */}

          {success && (

            <div className="p-3 mb-6 bg-green-50 border border-green-200 rounded-lg text-green-800">

              <p className="text-sm font-medium">Inscription réussie !</p>

              <p className="text-sm mt-1">Un email de confirmation a été envoyé. Vérifiez votre boîte mail...</p>

            </div>

          )}



          {/* Step 1: Personal Info */}

          {step === 1 && (

            <div className="space-y-6">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div>

                  <label className="block text-sm font-medium text-gray-700 mb-2">Prénom</label>

                  <div className="relative">

                    <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />

                    <input

                      type="text"

                      name="firstName"

                      value={formData.firstName}

                      onChange={handleChange}

                      placeholder="Jean"

                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"

                      required

                    />

                  </div>

                </div>

                <div>

                  <label className="block text-sm font-medium text-gray-700 mb-2">Nom</label>

                  <div className="relative">

                    <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />

                    <input

                      type="text"

                      name="lastName"

                      value={formData.lastName}

                      onChange={handleChange}

                      placeholder="Dupont"

                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"

                      required

                    />

                  </div>

                </div>

              </div>



              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">Numéro CIN</label>

                <div className="relative">

                  <FileText className="absolute left-3 top-3 w-5 h-5 text-gray-400" />

                  <input

                    type="text"

                    name="cin"

                    value={formData.cin}

                    onChange={handleChange}

                    placeholder="101123456789"

                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"

                    required

                  />

                </div>

              </div>



              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">Adresse</label>

                <div className="relative">

                  <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />

                  <input

                    type="text"

                    name="address"

                    value={formData.address}

                    onChange={handleChange}

                    placeholder="123 Rue de la Paix, Antananarivo"

                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"

                    required

                  />

                </div>

              </div>

            </div>

          )}



          {/* Step 2: Contact Info */}

          {step === 2 && (

            <div className="space-y-6">

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">Adresse e-mail</label>

                <div className="relative">

                  <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />

                  <input

                    type="email"

                    name="email"

                    value={formData.email}

                    onChange={handleChange}

                    placeholder="exemple@email.com"

                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"

                    required

                  />

                </div>

              </div>



              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">Numéro de téléphone</label>

                <div className="relative">

                  <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />

                  <input

                    type="tel"

                    name="phone"

                    value={formData.phone}

                    onChange={handleChange}

                    placeholder="+261 XX XXX XXXX"

                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"

                    required

                  />

                </div>

              </div>



              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">Mot de passe</label>

                <div className="relative">

                  <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />

                  <input

                    type={showPassword ? 'text' : 'password'}

                    name="password"

                    value={formData.password}

                    onChange={handleChange}

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



              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">Confirmer le mot de passe</label>

                <div className="relative">

                  <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />

                  <input

                    type={showConfirmPassword ? 'text' : 'password'}

                    name="confirmPassword"

                    value={formData.confirmPassword}

                    onChange={handleChange}

                    placeholder="••••••••"

                    className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"

                    required

                  />

                  <button

                    type="button"

                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}

                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"

                  >

                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}

                  </button>

                </div>

              </div>

            </div>

          )}



          {/* Step 3: Confirmation */}

          {step === 3 && (

            <div className="space-y-6">

              <div className="bg-gray-50 rounded-lg p-6 space-y-3">

                <h3 className="font-bold text-gray-900">Résumé de votre inscription</h3>

                <div className="space-y-2 text-sm">

                  <p><span className="text-gray-600">Nom:</span> <span className="font-medium">{formData.firstName} {formData.lastName}</span></p>

                  <p><span className="text-gray-600">E-mail:</span> <span className="font-medium">{formData.email}</span></p>

                  <p><span className="text-gray-600">Téléphone:</span> <span className="font-medium">{formData.phone}</span></p>

                  <p><span className="text-gray-600">CIN:</span> <span className="font-medium">{formData.cin}</span></p>

                  <p><span className="text-gray-600">Adresse:</span> <span className="font-medium">{formData.address}</span></p>

                </div>

              </div>



              <label className="flex items-start cursor-pointer">

                <input

                  type="checkbox"

                  name="agreeTerms"

                  checked={formData.agreeTerms}

                  onChange={handleChange}

                  className="w-4 h-4 mt-1 rounded"

                  required

                />

                <span className="ml-3 text-sm text-gray-600">

                  J&apos;accepte les <a href="#" className="text-teal-600 hover:text-teal-700 font-medium">conditions d&apos;utilisation</a> et la <a href="#" className="text-teal-600 hover:text-teal-700 font-medium">politique de confidentialité</a>

                </span>

              </label>

            </div>

          )}



          {/* Buttons */}

          <div className="flex gap-4 mt-8">

            {step > 1 && (

              <button

                type="button"

                onClick={handlePrev}

                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 font-medium py-2 rounded-lg transition-colors duration-200"

              >

                Précédent

              </button>

            )}

            {step < 3 ? (

              <button

                type="button"

                onClick={handleNext}

                disabled={loading || success}

                className="flex-1 bg-teal-600 hover:bg-teal-700 disabled:bg-teal-400 text-white font-medium py-2 rounded-lg transition-colors duration-200"

              >

                Suivant

              </button>

            ) : (

              <button

                type="submit"

                disabled={loading || success}

                className="flex-1 bg-teal-600 hover:bg-teal-700 disabled:bg-teal-400 text-white font-medium py-2 rounded-lg transition-colors duration-200"

              >

                {loading ? 'Création...' : success ? 'Compte créé !' : 'Créer le compte'}

              </button>

            )}

          </div>



          {/* Login link */}

          <p className="text-center text-gray-600 mt-6">

            Déjà inscrit?{' '}

            <button onClick={() => navigate('/login')} className="text-teal-600 hover:text-teal-700 font-medium">

              Se connecter

            </button>

          </p>

        </form>

      </div>

    </div>

  )

}


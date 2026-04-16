import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, Mail, MapPin, Calendar, CreditCard, Save, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react'
import DashboardHeader from '../components/DashboardHeader'
import Footer from '../components/Footer'
import { authAPI } from '../services/api'

export default function Profile() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [isEditing, setIsEditing] = useState(false)

  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    date_naissance: '',
    cin: '',
    adresse: '',
  })

  const [originalData, setOriginalData] = useState({})

  useEffect(() => {
    loadProfile()
  }, [])

  const loadProfile = async () => {
    try {
      const data = await authAPI.getMe()
      const user = data.user || {}
      const citoyen = data.citoyen || {}

      const profileData = {
        nom: user.nom || '',
        prenom: citoyen.prenom || '',
        email: user.email || '',
        date_naissance: citoyen.date_naissance || '',
        cin: citoyen.cin || '',
        adresse: citoyen.adresse || '',
      }
      setFormData(profileData)
      setOriginalData(profileData)
    } catch (err) {
      setMessage('Erreur lors du chargement du profil.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = async () => {
    setSaving(true)
    setMessage('')
    try {
      const data = await authAPI.updateProfile({
        nom: formData.nom,
        prenom: formData.prenom,
        date_naissance: formData.date_naissance || null,
        cin: formData.cin || null,
        adresse: formData.adresse || null,
      })

      // Update localStorage user
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user))
      }

      setOriginalData(formData)
      setIsEditing(false)
      setMessage('Profil mis à jour avec succès.')
    } catch (err) {
      setMessage('Erreur lors de la mise à jour du profil.')
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = () => {
    setFormData(originalData)
    setIsEditing(false)
    setMessage('')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <DashboardHeader userType="citizen" />
        <div className="flex items-center justify-center py-20">
          <div className="text-gray-500">Chargement du profil...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader userType="citizen" />

      <div className="max-w-3xl mx-auto px-4 md:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/citizen')} className="p-2 hover:bg-gray-200 rounded-lg transition">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Mon Profil</h1>
          </div>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg transition text-sm"
            >
              Modifier
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition text-sm"
              >
                Annuler
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-4 py-2 bg-teal-600 hover:bg-teal-700 disabled:bg-teal-400 text-white font-semibold rounded-lg transition text-sm flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                {saving ? 'Enregistrement...' : 'Enregistrer'}
              </button>
            </div>
          )}
        </div>

        {message && (
          <div className={`p-3 rounded-lg mb-6 flex items-center gap-2 text-sm ${
            message.includes('Erreur') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'
          }`}>
            {message.includes('Erreur') ? <AlertCircle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
            {message}
          </div>
        )}

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          {/* Avatar Section */}
          <div className="bg-gradient-to-r from-teal-600 to-teal-700 px-6 py-8 text-center">
            <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3 text-white text-2xl font-bold">
              {(formData.prenom ? formData.prenom[0] : '') + (formData.nom ? formData.nom[0] : '')}
            </div>
            <h2 className="text-xl font-bold text-white">
              {formData.prenom} {formData.nom}
            </h2>
            <p className="text-teal-100 text-sm mt-1">{formData.email}</p>
          </div>

          {/* Form Fields */}
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nom */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <User className="w-4 h-4 text-gray-400" />
                  Nom
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
                  />
                ) : (
                  <p className="px-4 py-2 bg-gray-50 rounded-lg text-gray-900">{formData.nom || '—'}</p>
                )}
              </div>

              {/* Prénom */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <User className="w-4 h-4 text-gray-400" />
                  Prénom
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="prenom"
                    value={formData.prenom}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
                  />
                ) : (
                  <p className="px-4 py-2 bg-gray-50 rounded-lg text-gray-900">{formData.prenom || '—'}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  Email
                </label>
                <p className="px-4 py-2 bg-gray-50 rounded-lg text-gray-500">{formData.email}</p>
                <p className="text-xs text-gray-400 mt-1">L'email ne peut pas être modifié ici.</p>
              </div>

              {/* Date de naissance */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  Date de naissance
                </label>
                {isEditing ? (
                  <input
                    type="date"
                    name="date_naissance"
                    value={formData.date_naissance}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
                  />
                ) : (
                  <p className="px-4 py-2 bg-gray-50 rounded-lg text-gray-900">
                    {formData.date_naissance ? new Date(formData.date_naissance).toLocaleDateString('fr-FR') : '—'}
                  </p>
                )}
              </div>

              {/* CIN */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <CreditCard className="w-4 h-4 text-gray-400" />
                  CIN <span className="text-gray-400 font-normal">(optionnel)</span>
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="cin"
                    value={formData.cin}
                    onChange={handleChange}
                    placeholder="Numéro CIN"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
                  />
                ) : (
                  <p className="px-4 py-2 bg-gray-50 rounded-lg text-gray-900">{formData.cin || '—'}</p>
                )}
              </div>

              {/* Adresse */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  Adresse
                </label>
                {isEditing ? (
                  <textarea
                    name="adresse"
                    value={formData.adresse}
                    onChange={handleChange}
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
                  />
                ) : (
                  <p className="px-4 py-2 bg-gray-50 rounded-lg text-gray-900">{formData.adresse || '—'}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

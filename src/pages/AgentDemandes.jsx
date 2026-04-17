import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardHeader from '../components/DashboardHeader'
import Footer from '../components/Footer'
import { demandesAPI } from '../services/api'

function formatDate(value) {
  if (!value) return '-'
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return String(value)
  return d.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

function getStatusBadgeClass(status) {
  const s = String(status || '').toLowerCase()

  if (s.includes('attente') || s.includes('pending')) {
    return 'bg-yellow-100 text-yellow-700'
  }
  if (s.includes('appr') || s.includes('valid') || s.includes('accept')) {
    return 'bg-green-100 text-green-700'
  }
  if (s.includes('rej') || s.includes('refus') || s.includes('reject')) {
    return 'bg-red-100 text-red-700'
  }

  return 'bg-gray-100 text-gray-700'
}

function normalizeDemandes(payload) {
  if (Array.isArray(payload)) return payload
  if (payload && Array.isArray(payload.results)) return payload.results
  return []
}

function getDisplayValue(obj, paths, fallback = '-') {
  for (const p of paths) {
    const value = p.split('.').reduce((acc, key) => (acc ? acc[key] : undefined), obj)
    if (value !== undefined && value !== null && String(value).trim() !== '') return value
  }
  return fallback
}

export default function AgentDemandes() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [demandes, setDemandes] = useState([])

  const userName = useMemo(() => {
    const stored = localStorage.getItem('user')
    if (stored) {
      const user = JSON.parse(stored)
      return user.prenom ? `${user.prenom} ${user.nom || ''}`.trim() : (user.nom || 'Agent')
    }
    return 'Agent'
  }, [])

  const loadDemandes = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await demandesAPI.getDemandes()
      setDemandes(normalizeDemandes(data))
    } catch (e) {
      setError(e?.message || 'Une erreur est survenue')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadDemandes()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader userType="admin" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">👋 Bonjour, {userName}</p>
              <h1 className="text-3xl font-bold text-gray-900">Demandes <span className="text-teal-600">Citoyens</span></h1>
            </div>

            <button
              onClick={() => navigate('/admin')}
              className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg transition text-sm font-semibold"
            >
              ← Retour
            </button>
          </div>

          <p className="text-gray-600 text-sm">Liste des demandes des citoyens.</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between gap-4 mb-6">
            <h2 className="text-xl font-bold text-gray-900">Tableau des demandes</h2>
            <button
              onClick={loadDemandes}
              className="px-4 py-2 text-teal-600 border border-teal-600 rounded-lg hover:bg-teal-50 transition text-sm font-semibold"
              disabled={loading}
            >
              Rafraîchir
            </button>
          </div>

          {loading ? (
            <div className="py-10 text-center">
              <div className="inline-flex items-center gap-3 text-gray-700 font-semibold">
                <span className="w-4 h-4 rounded-full border-2 border-teal-600 border-t-transparent animate-spin"></span>
                Chargement des demandes...
              </div>
            </div>
          ) : error ? (
            <div className="py-10 text-center">
              <p className="text-red-600 font-semibold mb-3">{error}</p>
              <button
                onClick={loadDemandes}
                className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition text-sm font-semibold"
              >
                Réessayer
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-gray-200">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700 whitespace-nowrap">ID</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700 whitespace-nowrap">Type de demande</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700 whitespace-nowrap">Nom du citoyen</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700 whitespace-nowrap">Date</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700 whitespace-nowrap">Statut</th>
                  </tr>
                </thead>

                <tbody>
                  {demandes.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-10 px-4 text-center text-gray-600">
                        Aucune demande à afficher.
                      </td>
                    </tr>
                  ) : (
                    demandes.map((d) => {
                      const id = getDisplayValue(d, ['id', 'pk'])
                      const type = getDisplayValue(d, ['type', 'type_demande', 'service', 'categorie', 'demarche'])
                      const citoyen = getDisplayValue(d, ['citoyen.nom', 'citoyen_name', 'citoyen', 'demandeur', 'user.nom', 'user.email', 'email'])
                      const date = getDisplayValue(d, ['date', 'created_at', 'createdAt', 'date_creation', 'submitted_at'])
                      const status = getDisplayValue(d, ['statut', 'status', 'etat'])

                      return (
                        <tr key={String(id)} className="border-b border-gray-100 hover:bg-gray-50 transition">
                          <td className="py-3 px-4 text-gray-900 font-semibold whitespace-nowrap">{id}</td>
                          <td className="py-3 px-4 text-gray-600 min-w-[14rem]">{type}</td>
                          <td className="py-3 px-4 text-gray-600 min-w-[14rem]">{citoyen}</td>
                          <td className="py-3 px-4 text-gray-600 whitespace-nowrap">{formatDate(date)}</td>
                          <td className="py-3 px-4 whitespace-nowrap">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadgeClass(status)}`}>
                              {status}
                            </span>
                          </td>
                        </tr>
                      )
                    })
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ChevronDown, Download, Search, Calendar, Clock } from 'lucide-react'
import DashboardHeader from '../components/DashboardHeader'
import Footer from '../components/Footer'

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [adminName] = useState('Marc Admin')
  const [timeFilter, setTimeFilter] = useState('Derniers 30 jours')

  const stats = [
    { label: 'Demandes en attente', value: '50+', color: 'bg-yellow-100', textColor: 'text-yellow-700' },
    { label: 'Démarches traitées', value: '50 000+', color: 'bg-blue-100', textColor: 'text-blue-700' },
    { label: 'Taux de rejet', value: '48%', color: 'bg-red-100', textColor: 'text-red-700' },
    { label: 'Satisfaction', value: '98%', color: 'bg-green-100', textColor: 'text-green-700' }
  ]

  const requestsData = [
    { id: 1, name: 'Andre Rasoalaniaiavo', type: 'Carte d\'identité', status: 'En attente', date: '24 Avril 2024', agent: 'Thomas', estimatedArrival: '26 Avril 2024, 10:00' },
    { id: 2, name: 'Épovir Rakoto', type: 'Passeport', status: 'En attente', date: '24 Avril 2024', agent: 'Marc', estimatedArrival: '29 Avril 2024, 14:00' },
    { id: 3, name: 'Bema Andriathiana', type: 'Certificat de Residence', status: 'En attente', date: '24 Avril 2024', agent: 'Adriana', estimatedArrival: '25 Avril 2024, 16:00' },
    { id: 4, name: 'Sitraka Randriambelo', type: 'Acte de Naissance', status: 'En attente', date: '25 Avril 2024', agent: 'Thomas', estimatedArrival: '26 Avril 2024, 09:00' },
    { id: 5, name: 'Thomas Rakoto', type: 'Passeport', status: 'En attente', date: '28 Avril 2024', agent: 'Marc', estimatedArrival: '02 Mai 2024, 11:00' },
    { id: 6, name: 'Fernant Avotra', type: 'Permis de conduire', status: 'En attente', date: '23 Avril 2024', agent: 'Marc', estimatedArrival: '30 Avril 2024, 15:00' },
    { id: 7, name: 'Nelly Ravolavitra', type: 'Acte de Mariage', status: 'En attente', date: '27 Avril 2024', agent: 'Thomas', estimatedArrival: '03 Mai 2024, 10:30' },
    { id: 8, name: 'Soa Andrianary', type: 'Carte Grise', status: 'En attente', date: '25 Avril 2024', agent: 'Marc', estimatedArrival: '02 Mai 2024, 09:00' }
  ]

  // Calculate estimated arrival time based on request type
  const calculateEstimatedArrival = (requestDate, type) => {
    const processingDays = {
      'Carte d\'identité': 2,
      'Passeport': 5,
      'Certificat de Residence': 1,
      'Acte de Naissance': 1,
      'Acte de Mariage': 3,
      'Permis de conduire': 7,
      'Carte Grise': 5
    }
    const days = processingDays[type] || 3
    const arrival = new Date(requestDate)
    arrival.setDate(arrival.getDate() + days)
    return arrival.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'En attente':
        return 'bg-yellow-100 text-yellow-700'
      case 'Approuvé':
        return 'bg-green-100 text-green-700'
      case 'Rejeté':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader userType="admin" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">👋 Bonjour, {adminName}</p>
              <h1 className="text-3xl font-bold text-gray-900">Tableau de bord <span className="text-primary">Administrateur</span></h1>
            </div>
            <button 
              onClick={() => navigate('/')}
              className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg transition text-sm font-semibold"
            >
              ← Retour
            </button>
          </div>
          <p className="text-gray-600 text-sm">Bonjour, {adminName}. Bienvenue sur votre tableau de bord. Gérez et suivez efficacement les démarches administratives.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, idx) => (
            <div key={idx} className={`${stat.color} rounded-lg p-6`}>
              <p className={`${stat.textColor} text-2xl font-bold mb-1`}>{stat.value}</p>
              <p className="text-gray-700 text-sm font-semibold">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Charts and Requests Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Charts Section */}
          <div className="lg:col-span-2">
            {/* Requests Statistics */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Statistiques des Demandes</h2>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">{timeFilter}</span>
                  <ChevronDown className="w-4 h-4 text-gray-600" />
                </div>
              </div>

              {/* Chart Placeholder */}
              <div className="h-80 bg-gradient-to-br from-primary/5 to-secondary rounded-lg flex items-center justify-center mb-6">
                <div className="text-center">
                  <p className="text-gray-500 mb-2">📊 Graphique des statistiques</p>
                  <p className="text-xs text-gray-400">Acceptées | Demandes reçues | Demandes reçues</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center text-sm">
                <div>
                  <div className="inline-block w-3 h-3 rounded-full bg-primary mr-2"></div>
                  <span className="text-gray-600">Acceptées</span>
                </div>
                <div>
                  <div className="inline-block w-3 h-3 rounded-full bg-blue-400 mr-2"></div>
                  <span className="text-gray-600">Demandes reçues</span>
                </div>
                <div>
                  <div className="inline-block w-3 h-3 rounded-full bg-gray-300 mr-2"></div>
                  <span className="text-gray-600">Demandes reçues</span>
                </div>
              </div>
            </div>

            {/* Requests Management */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Gestion des Demandes</h2>
                <button className="flex items-center gap-2 px-4 py-2 text-primary border border-primary rounded-lg hover:bg-primary/5 transition text-sm font-semibold">
                  <Download className="w-4 h-4" />
                  Exporter CSV
                </button>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-3 mb-6">
                <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-4 py-2">
                  <span className="text-sm text-gray-600">Type de demande</span>
                  <ChevronDown className="w-4 h-4 text-gray-600" />
                </div>
                <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-4 py-2">
                  <span className="text-sm text-gray-600">Statut</span>
                  <ChevronDown className="w-4 h-4 text-gray-600" />
                </div>
                <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-4 py-2">
                  <span className="text-sm text-gray-600">En attente</span>
                  <ChevronDown className="w-4 h-4 text-gray-600" />
                </div>
                <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-4 py-2">
                  <span className="text-sm text-gray-600">Date</span>
                  <ChevronDown className="w-4 h-4 text-gray-600" />
                </div>
                <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-4 py-2">
                  <span className="text-sm text-gray-600">Derniers 30 jours</span>
                  <ChevronDown className="w-4 h-4 text-gray-600" />
                </div>
                <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-4 py-2">
                  <Search className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-600">Rechercher...</span>
                </div>
              </div>

              {/* Requests Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-gray-200">
                    <tr>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Demandeur</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Type</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Statut</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Date de demande</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Heure d'arrivée estimée</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Agent</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requestsData.map((request) => (
                      <tr key={request.id} className="border-b border-gray-100 hover:bg-gray-50 transition cursor-pointer">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-white text-xs font-bold">
                              {request.name.charAt(0)}
                            </div>
                            <span className="font-semibold text-gray-900">{request.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-gray-600">{request.type}</td>
                        <td className="py-3 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(request.status)}`}>
                            {request.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-600">{request.date}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-teal-600" />
                            <span className="text-gray-700 font-medium">{request.estimatedArrival}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-gray-600">{request.agent}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between mt-6 text-sm">
                <span className="text-gray-600">1 de 12</span>
                <div className="flex gap-2">
                  <button className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-100 transition">&lt;</button>
                  <button className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-100 transition">&gt;</button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-8">
            {/* Activity History */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Historique des Activités</h3>
              
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {[
                  { icon: '✓', title: 'Valider la demande de Carte d\'identité', user: 'Andre Rasoalaniaiavo', time: 'E Marc, 13/25' },
                  { icon: '✗', title: 'Rejeter la demande de Passeport', user: 'Épovir Rakoto', time: 'O Thomas, 13:34' },
                  { icon: '📅', title: 'Nouveau rendez-vous programmé', user: 'Carte Grise de Narialá', time: 'O Marc, 0666' },
                  { icon: '📋', title: 'Nouvelle demande de permis', user: 'Fernant', time: 'O Thomas, A10:7a' }
                ].map((activity, idx) => (
                  <div key={idx} className="pb-4 border-b border-gray-100 last:border-0">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm flex-shrink-0">
                        {activity.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm text-gray-900 mb-1">{activity.title}</p>
                        <p className="text-xs text-gray-600 mb-1">{activity.user}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Report */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Rapport Rapide</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">48h</p>
                    <p className="text-xs text-gray-600">Délai moyen de traitement</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
                    <div className="w-6 h-6 rounded-full border-2 border-success"></div>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">2h</p>
                    <p className="text-xs text-gray-600">Temps moyen de réponse</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-danger/10 flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-danger"></div>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">23%</p>
                    <p className="text-xs text-gray-600">Taux denejet actuel</p>
                  </div>
                </div>
              </div>

              <button className="w-full mt-6 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition text-sm">
                Générer un rapport
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

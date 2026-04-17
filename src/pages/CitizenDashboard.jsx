import { useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { Bell, User, Settings, LogOut, Clock, CheckCircle2, AlertCircle, MapPin } from 'lucide-react'

import DashboardHeader from '../components/DashboardHeader'

import Footer from '../components/Footer'



export default function CitizenDashboard() {

  const navigate = useNavigate()

  const [activeTab, setActiveTab] = useState('overview')

  const [userName] = useState(() => {
    const stored = localStorage.getItem('user')
    if (stored) {
      const user = JSON.parse(stored)
      return user.prenom ? `${user.prenom} ${user.nom || ''}`.trim() : (user.nom || 'Citoyen')
    }
    return 'Citoyen'
  })



  const myRequests = [

    {

      id: 1,

      type: 'Carte d\'identité',

      status: 'En attente',

      date: '24 Avril 2024',

      agent: 'Thomas',

      progress: 45

    },

    {

      id: 2,

      type: 'Passeport',

      status: 'En attente',

      date: '24 Avril 2024',

      agent: 'Marc',

      progress: 60

    },

    {

      id: 3,

      type: 'Certificat de Résidence',

      status: 'En attente',

      date: '24 Avril 2024',

      agent: 'Adriana',

      progress: 75

    }

  ]



  const announcements = [

    {

      id: 1,

      type: 'decision',

      title: 'Valider la demande de Carte d\'identité de Andre',

      user: 'Andre Rasoalaniaiavo',

      date: 'Marc, 13/25',

      icon: '✓'

    },

    {

      id: 2,

      type: 'rejection',

      title: 'Rejeter la demande de Passeport de 14dza Andriani',

      user: 'Épovir Rakoto',

      date: 'O Thomas, 13:34',

      icon: '✗'

    },

    {

      id: 3,

      type: 'meeting',

      title: 'Nouveau rendez-vous programmé. Vend. Carte Grise de Narialá',

      user: 'Épovir Rakoto',

      date: 'O Marc, 0666',

      icon: '📅'

    },

    {

      id: 4,

      type: 'new_request',

      title: 'Nouvelle demande de permit de conduire: Fernant',

      user: 'Épovir Rakoto',

      date: 'O Thomas, A10:7a',

      icon: '📋'

    }

  ]



  const services = [

    { icon: '📋', title: 'Mes Démarches', count: '12 actives', color: 'bg-blue-100' },

    { icon: '🔔', title: 'Rendez-vous', count: '2 à venir', color: 'bg-pink-100' },

    { icon: '👤', title: 'Notifications', count: '3 à consulter', color: 'bg-green-100' },

    { icon: '📋', title: 'Profil', count: 'Mon compte', color: 'bg-yellow-100' }

  ]



  return (

    <div className="min-h-screen bg-gray-50">

      <DashboardHeader userType="citizen" />



      {/* Main Content */}

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">

        {/* Welcome Section */}

        <div className="mb-8">

          <div className="flex items-center justify-between mb-6">

            <div>

              <p className="text-sm text-gray-600 mb-1">Bonjour, <span className="font-bold text-primary">{userName}</span> 👋</p>

              <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>

            </div>

            <button 

              onClick={() => navigate('/')}

              className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg transition text-sm font-semibold"

            >

              ← Retour

            </button>

          </div>

        </div>



        {/* Quick Stats */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

          {services.map((service, idx) => (

            <div key={idx} className={`${service.color} rounded-lg p-6 cursor-pointer hover:shadow-lg transition`}>

              <div className="text-3xl mb-3">{service.icon}</div>

              <p className="text-gray-700 font-semibold mb-1">{service.title}</p>

              <p className="text-sm text-gray-600">{service.count}</p>

            </div>

          ))}

        </div>



        {/* Main Content Grid */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">

          {/* Requests Section */}

          <div className="lg:col-span-2">

            <div className="bg-white rounded-lg border border-gray-200 p-6">

              <div className="flex items-center justify-between mb-6">

                <h2 className="text-xl font-bold text-gray-900">Mes Démarches</h2>

                <a href="#" className="text-primary text-sm font-semibold hover:underline">Voir tous</a>

              </div>



              <div className="space-y-4">

                {myRequests.map((request) => (

                  <div key={request.id} className="border border-gray-200 rounded-lg p-4 hover:border-primary transition">

                    <div className="flex items-start justify-between mb-3">

                      <div className="flex-1">

                        <h4 className="font-bold text-gray-900">{request.type}</h4>

                        <div className="flex flex-wrap gap-3 mt-2 text-xs text-gray-600">

                          <span className="flex items-center gap-1">

                            <span className={`px-2 py-1 rounded text-white font-semibold ${

                              request.status === 'En attente' ? 'bg-yellow-500' : 'bg-green-500'

                            }`}>

                              {request.status}

                            </span>

                          </span>

                          <span>{request.date}</span>

                          <span>Agent: {request.agent}</span>

                        </div>

                      </div>

                    </div>

                    

                    {/* Progress Bar */}

                    <div className="w-full bg-gray-200 rounded-full h-2 mt-3">

                      <div 

                        className="bg-primary h-2 rounded-full transition-all" 

                        style={{ width: `${request.progress}%` }}

                      ></div>

                    </div>

                  </div>

                ))}

              </div>



              <button className="w-full mt-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition">

                + Nouvelle Demande

              </button>

            </div>

          </div>



          {/* Activity Section */}

          <div className="bg-white rounded-lg border border-gray-200 p-6">

            <h2 className="text-xl font-bold text-gray-900 mb-6">Historique des Activités</h2>

            

            <div className="space-y-3 max-h-96 overflow-y-auto">

              {announcements.map((announcement) => (

                <div key={announcement.id} className="pb-3 border-b border-gray-100 last:border-0">

                  <div className="flex gap-3">

                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm flex-shrink-0">

                      {announcement.icon}

                    </div>

                    <div className="flex-1 min-w-0">

                      <p className="font-semibold text-sm text-gray-900 mb-1">

                        {announcement.title}

                      </p>

                      <p className="text-xs text-gray-600 mb-1">{announcement.user}</p>

                      <p className="text-xs text-gray-500">{announcement.date}</p>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>



        {/* Call to Action */}

        <div className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-lg p-8 flex items-center justify-between">

          <div>

            <h3 className="text-lg font-bold text-gray-900 mb-2">Besoin d'aide?</h3>

            <p className="text-gray-600">Notre équipe est disponible pour répondre à vos questions</p>

          </div>

          <div className="flex gap-3">

            <button className="px-6 py-2 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition border border-primary">

              Nous contacter

            </button>

            <button className="px-6 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition">

              Chat Support

            </button>

          </div>

        </div>

      </div>



      <Footer />

    </div>

  )

}


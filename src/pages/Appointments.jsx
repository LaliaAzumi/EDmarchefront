import { useState } from 'react'
import DashboardHeader from '../components/DashboardHeader'
import Footer from '../components/Footer'
import { Calendar, Clock, MapPin, Users, ChevronRight, Plus } from 'lucide-react'

export default function Appointments() {
  const [appointments] = useState([
    {
      id: 1,
      type: 'Carte d\'identité',
      date: '2024-05-15',
      time: '10:30',
      location: 'Centre Administratif d\'Antananarivo',
      status: 'confirmé',
      agent: 'Marie Dupont',
      notes: 'Apporter l\'original du CIN'
    },
    {
      id: 2,
      type: 'Passeport',
      date: '2024-05-20',
      time: '14:00',
      location: 'Bureau des Passeports',
      status: 'confirmé',
      agent: 'Jean Martin',
      notes: '2 photos d\'identité requises'
    },
    {
      id: 3,
      type: 'Acte de Naissance',
      date: '2024-05-25',
      time: '09:00',
      location: 'Mairie d\'Antananarivo',
      status: 'en attente',
      agent: 'Pas encore assigné',
      notes: ''
    }
  ])

  const [showForm, setShowForm] = useState(false)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedService, setSelectedService] = useState('')
  const [selectedTime, setSelectedTime] = useState('')

  const services = [
    'Carte d\'identité',
    'Passeport',
    'Acte de Naissance',
    'Certificat de Résidence',
    'Permis de Conduire',
    'Carte Grise'
  ]

  const times = ['09:00', '09:30', '10:00', '10:30', '11:00', '14:00', '14:30', '15:00', '15:30', '16:00']

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmé':
        return 'bg-green-100 text-green-800'
      case 'en attente':
        return 'bg-yellow-100 text-yellow-800'
      case 'annulé':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Rendez-vous</h1>
            <p className="text-gray-600 mt-1">Gérez vos rendez-vous administratifs</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            <Plus className="w-5 h-5" />
            Nouveau rendez-vous
          </button>
        </div>

        {/* Booking Form */}
        {showForm && (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Programmer un rendez-vous</h2>
            <form className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Service demandé</label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                >
                  <option value="">Sélectionner un service...</option>
                  {services.map(service => (
                    <option key={service} value={service}>{service}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Heure</label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                >
                  <option value="">Sélectionner une heure...</option>
                  {times.map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
            </form>

            <div className="flex gap-4">
              <button
                onClick={() => {
                  setShowForm(false)
                  alert('Rendez-vous programmé avec succès!')
                }}
                className="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 rounded-lg transition-colors"
              >
                Confirmer le rendez-vous
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 font-medium py-2 rounded-lg transition-colors"
              >
                Annuler
              </button>
            </div>
          </div>
        )}

        {/* Appointments List */}
        <div className="grid grid-cols-1 gap-6">
          {appointments.map(appointment => (
            <div key={appointment.id} className="bg-white rounded-xl shadow hover:shadow-lg transition-shadow p-6">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                {/* Left content */}
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-teal-100 rounded-lg p-3">
                      <Calendar className="w-6 h-6 text-teal-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{appointment.type}</h3>
                      <span className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                      </span>
                    </div>
                  </div>

                  {/* Details grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-16">
                    <div className="flex items-center gap-3 text-gray-700">
                      <Calendar className="w-5 h-5 text-teal-600" />
                      <div>
                        <p className="text-xs text-gray-600">Date</p>
                        <p className="font-medium">{new Date(appointment.date).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-gray-700">
                      <Clock className="w-5 h-5 text-teal-600" />
                      <div>
                        <p className="text-xs text-gray-600">Heure</p>
                        <p className="font-medium">{appointment.time}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-gray-700">
                      <MapPin className="w-5 h-5 text-teal-600" />
                      <div>
                        <p className="text-xs text-gray-600">Lieu</p>
                        <p className="font-medium">{appointment.location}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-gray-700">
                      <Users className="w-5 h-5 text-teal-600" />
                      <div>
                        <p className="text-xs text-gray-600">Agent assigné</p>
                        <p className="font-medium">{appointment.agent}</p>
                      </div>
                    </div>
                  </div>

                  {appointment.notes && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-sm text-blue-800"><span className="font-medium">Note:</span> {appointment.notes}</p>
                    </div>
                  )}
                </div>

                {/* Right actions */}
                <div className="flex flex-col gap-2">
                  <button className="flex items-center justify-center gap-2 bg-teal-50 hover:bg-teal-100 text-teal-700 px-4 py-2 rounded-lg font-medium transition-colors">
                    Détails
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  {appointment.status === 'confirmé' && (
                    <button className="flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-700 px-4 py-2 rounded-lg font-medium transition-colors">
                      Annuler
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state hint */}
        {appointments.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun rendez-vous</h3>
            <p className="text-gray-600 mb-6">Programmez votre premier rendez-vous pour accélérer vos démarches.</p>
            <button
              onClick={() => setShowForm(true)}
              className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Programmer un rendez-vous
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}

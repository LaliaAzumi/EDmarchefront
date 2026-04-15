import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardHeader from '../components/DashboardHeader'
import Footer from '../components/Footer'
import { FileText, Clock, DollarSign, CheckCircle, ArrowRight, Filter } from 'lucide-react'

export default function Services() {
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const services = [
    {
      id: 1,
      name: 'Carte d\'identité',
      category: 'documents',
      description: 'Renouvellement ou obtention de votre carte d\'identité nationale',
      processingTime: '5-7 jours',
      fee: 'Gratuit',
      requirements: ['Extrait de naissance', 'Photo d\'identité', '2 témoins'],
      steps: ['Remplir le formulaire', 'Soumettre les documents', 'Programmer RDV', 'Récupérer le document'],
      popularity: 'Très demandé'
    },
    {
      id: 2,
      name: 'Acte de Naissance',
      category: 'documents',
      description: 'Obtenir un acte de naissance ou un duplicata',
      processingTime: '3-5 jours',
      fee: '15 000 Ar',
      requirements: ['Demande écrite', 'Pièce d\'identité'],
      steps: ['Faire la demande', 'Payer les frais', 'Programmer RDV', 'Récupérer l\'acte'],
      popularity: 'Très demandé'
    },
    {
      id: 3,
      name: 'Passeport',
      category: 'documents',
      description: 'Demande ou renouvellement de passeport',
      processingTime: '10-15 jours',
      fee: '150 000 Ar',
      requirements: ['Carte d\'identité', 'Acte de naissance', '4 photos', 'Certificat de résidence'],
      steps: ['Remplir la demande', 'Soumettre les documents', 'Programmer RDV', 'Récupérer le passeport'],
      popularity: 'Très demandé'
    },
    {
      id: 4,
      name: 'Certificat de Résidence',
      category: 'certificats',
      description: 'Obtenir un certificat de résidence pour votre adresse',
      processingTime: '1-2 jours',
      fee: '5 000 Ar',
      requirements: ['Pièce d\'identité', 'Quittance de loyer ou facture'],
      steps: ['Faire la demande', 'Payer les frais', 'Récupérer le certificat'],
      popularity: 'Régulièrement demandé'
    },
    {
      id: 5,
      name: 'Permis de Conduire',
      category: 'permis',
      description: 'Demande ou renouvellement de permis de conduire',
      processingTime: '7-10 jours',
      fee: '50 000 Ar',
      requirements: ['Carte d\'identité', 'Certificat médical', '4 photos', 'Certificat d\'immatriculation'],
      steps: ['Passer l\'examen médical', 'Faire la demande', 'Programmer RDV', 'Récupérer le permis'],
      popularity: 'Régulièrement demandé'
    },
    {
      id: 6,
      name: 'Carte Grise',
      category: 'vehicules',
      description: 'Obtenir ou renouveler votre carte grise automobile',
      processingTime: '5-7 jours',
      fee: '80 000 Ar',
      requirements: ['Titre de propriété', 'Certificat de conformité', 'Pièce d\'identité', 'Justificatif de résidence'],
      steps: ['Soumettre les documents', 'Payer les frais', 'Programmer RDV', 'Récupérer la carte grise'],
      popularity: 'Régulièrement demandé'
    },
    {
      id: 7,
      name: 'Acte de Mariage',
      category: 'documents',
      description: 'Obtenir un acte de mariage ou un duplicata',
      processingTime: '2-3 jours',
      fee: '10 000 Ar',
      requirements: ['Demande écrite', 'Pièce d\'identité'],
      steps: ['Faire la demande', 'Payer les frais', 'Récupérer l\'acte'],
      popularity: 'Peu demandé'
    },
    {
      id: 8,
      name: 'Acte de Décès',
      category: 'documents',
      description: 'Obtenir un acte de décès ou un duplicata',
      processingTime: '2-3 jours',
      fee: '10 000 Ar',
      requirements: ['Demande écrite', 'Pièce d\'identité'],
      steps: ['Faire la demande', 'Payer les frais', 'Récupérer l\'acte'],
      popularity: 'Peu demandé'
    }
  ]

  const categories = [
    { id: 'all', label: 'Tous les services' },
    { id: 'documents', label: 'Documents' },
    { id: 'certificats', label: 'Certificats' },
    { id: 'permis', label: 'Permis' },
    { id: 'vehicules', label: 'Véhicules' }
  ]

  const filteredServices = services.filter(service => {
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Services et Démarches</h1>
          <p className="text-gray-600 mt-1">Découvrez tous les services administratifs disponibles</p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Rechercher un service..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
            />
            <div className="flex items-center gap-2 text-gray-600">
              <Filter className="w-5 h-5" />
              <span className="text-sm font-medium">Filtrer par catégorie</span>
            </div>
          </div>

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map(service => (
            <div key={service.id} className="bg-white rounded-xl shadow hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col">
              {/* Header */}
              <div className="bg-gradient-to-r from-teal-50 to-teal-100 p-6 border-l-4 border-teal-600">
                <div className="flex items-start justify-between mb-2">
                  <FileText className="w-8 h-8 text-teal-600" />
                  <span className="text-xs font-bold text-teal-700 bg-teal-200 px-2 py-1 rounded-full">
                    {service.popularity}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900">{service.name}</h3>
              </div>

              {/* Content */}
              <div className="flex-1 p-6">
                <p className="text-gray-600 text-sm mb-6">{service.description}</p>

                {/* Key Info */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-teal-600 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-600">Délai de traitement</p>
                      <p className="font-medium text-gray-900">{service.processingTime}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-5 h-5 text-teal-600 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-600">Frais</p>
                      <p className="font-medium text-gray-900">{service.fee}</p>
                    </div>
                  </div>
                </div>

                {/* Requirements */}
                <div className="mb-6">
                  <h4 className="text-sm font-bold text-gray-900 mb-2">Documents requis:</h4>
                  <ul className="space-y-1">
                    {service.requirements.map((req, idx) => (
                      <li key={idx} className="text-sm text-gray-600 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-teal-600 flex-shrink-0" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Steps Preview */}
                <div className="mb-6">
                  <h4 className="text-sm font-bold text-gray-900 mb-2">Étapes de la demande:</h4>
                  <div className="space-y-1">
                    {service.steps.slice(0, 2).map((step, idx) => (
                      <p key={idx} className="text-sm text-gray-600">
                        <span className="font-medium">{idx + 1}.</span> {step}
                      </p>
                    ))}
                    <p className="text-sm text-gray-500 italic">+ {service.steps.length - 2} étapes supplémentaires</p>
                  </div>
                </div>
              </div>

              {/* Footer Button */}
              <div className="border-t border-gray-200 p-6">
                <button
                  onClick={() => navigate('/citizen')}
                  className="w-full flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 rounded-lg transition-colors"
                >
                  Faire une demande
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun service trouvé</h3>
            <p className="text-gray-600">Essayez avec d&apos;autres mots-clés ou catégories</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}

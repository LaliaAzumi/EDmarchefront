import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle2, Shield, Clock, Users, MapPin, Users2, Phone, Lock } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function LandingPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')

  const services = [
    {
      icon: '🪪',
      title: 'Carte d\'identité',
      description: 'Renouvellement ou demande de carte d\'identité',
      action: 'Demander'
    },
    {
      icon: '👶',
      title: 'Acte de Naissance',
      description: 'Demande de copie intégrale ou extrait',
      action: 'Demander'
    },
    {
      icon: '🏠',
      title: 'Certificat de Résidence',
      description: 'Demande de certificat de résidence',
      action: 'Demander'
    },
    {
      icon: '🛂',
      title: 'Passeport',
      description: 'Demande de nouveau passeport ou renouvellement',
      action: 'Demander'
    },
    {
      icon: '🚗',
      title: 'Permis de Conduire',
      description: 'Renouvellement ou duplicata de permis',
      action: 'Demander'
    },
    {
      icon: '📋',
      title: 'Carte Grise',
      description: 'Changement d\'adresse ou duplicata de carte',
      action: 'Demander'
    }
  ]

  const benefits = [
    {
      icon: Clock,
      title: 'Gain de temps',
      description: 'Traitement rapide et suivi en temps réel.'
    },
    {
      icon: CheckCircle2,
      title: 'Suivi Transparent',
      description: 'Historique détaillé de l\'avancement.'
    },
    {
      icon: MapPin,
      title: 'Géolocalisation',
      description: 'Trouvez le centre administratif le plus proche sans internet'
    },
    {
      icon: Lock,
      title: 'Mode Hors Ligne',
      description: 'Accédez aux démarches même sans internet'
    }
  ]

  const stats = [
    { icon: '📊', number: '50 000+', text: 'Démarches effectuées' },
    { icon: '😊', number: '98%', text: 'Utilisateurs satisfaits' },
    { icon: '⚙️', number: '50+', text: 'Services disponibles' },
    { icon: '🏛️', number: '100+', text: 'Centres partenaires' },
    { icon: '🛡️', number: '100+', text: 'Centres partenaires' }
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div>
                <p className="text-primary text-sm font-semibold mb-2">Bienvenue sur e-Démarches</p>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight">
                  Vos démarches administratives, <span className="text-primary">simplement en ligne.</span>
                </h1>
              </div>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                Effectuez vos demandes en quelques clics, suivez leur avancement en temps réel, recevez vos documents sans vous déplacer.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                {['Simple', 'Rapide', 'Sécurisé'].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span className="font-semibold text-gray-800">{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button 
                  onClick={() => navigate('/register')}
                  className="px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition"
                >
                  Créer un compte gratuit
                </button>
                <button 
                  onClick={() => navigate('/login')}
                  className="px-8 py-3 text-primary font-semibold border-2 border-primary rounded-lg hover:bg-primary hover:text-white transition flex items-center justify-center gap-2"
                >
                  Se connecter
                </button>
              </div>

              {/* Social Proof */}
              <div className="flex items-center gap-4 pt-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-white text-xs font-bold border-2 border-white">
                      {i}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Dès 10 000+</span> citoyens nous font confiance ⭐⭐⭐⭐⭐
                </p>
              </div>
            </div>

            {/* Right - Phone Mockup */}
            <div className="hidden lg:flex justify-center">
              <div className="relative w-72 h-96 bg-gray-900 rounded-3xl p-3 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-3xl"></div>
                <div className="relative w-full h-full bg-white rounded-2xl overflow-hidden shadow-inner">
                  <div className="bg-gradient-to-r from-primary to-primary-light text-white p-4 h-16 flex items-center justify-between">
                    <span className="font-bold">e-Démarches</span>
                    <span className="text-2xl">📱</span>
                  </div>
                  <div className="p-4 space-y-3 h-80 overflow-y-auto">
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <p className="text-xs font-semibold text-primary mb-2">Bonjour, Adriana 👋</p>
                      <p className="text-xs text-gray-600">Bienvenue sur votre tableau de bord.</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-secondary rounded-lg p-3 text-center">
                        <p className="text-lg">📋</p>
                        <p className="text-xs font-semibold text-gray-700 mt-1">Mes Démarches</p>
                        <p className="text-xs text-gray-500">12 actives</p>
                      </div>
                      <div className="bg-secondary rounded-lg p-3 text-center">
                        <p className="text-lg">🔔</p>
                        <p className="text-xs font-semibold text-gray-700 mt-1">Rendez-vous</p>
                        <p className="text-xs text-gray-500">2 à venir</p>
                      </div>
                    </div>
                    <div className="bg-green-100 border-l-4 border-primary rounded p-2">
                      <p className="text-xs text-green-800">✓ Demande validée avec succès</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Features */}
      <section className="py-12 px-4 md:px-8 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: '🔒', title: 'CONNEXION SÉCURISÉE', desc: 'Vos données sont protégées' },
              { icon: '🔐', title: 'AUTHENTIFICATION FORTE', desc: 'Code OTP envoyé par SMS' },
              { icon: '🛡️', title: 'PROTECTION DES DONNÉES', desc: 'Conforme aux normes de sécurité' },
              { icon: '✓', title: '100% Sécurisé', desc: '' }
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <p className="font-bold text-sm text-gray-800">{item.title}</p>
                  {item.desc && <p className="text-xs text-gray-600 mt-1">{item.desc}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Nos services les plus demandés</h2>
            <p className="text-gray-600">Accédez facilement à tous les services administratifs</p>
            <a href="#" className="text-primary font-semibold text-sm mt-2 inline-block hover:underline">Voir tous les services →</a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {services.map((service, idx) => (
              <div key={idx} className="group bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-lg hover:border-primary transition cursor-pointer">
                <div className="text-4xl mb-3">{service.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2 text-sm">{service.title}</h3>
                <p className="text-xs text-gray-600 mb-4 leading-tight">{service.description}</p>
                <button className="w-full py-2 bg-primary text-white text-sm font-semibold rounded hover:bg-primary-dark transition">
                  {service.action}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-20 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">Pourquoi choisir e-Démarches?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {benefits.map((benefit, idx) => {
              const Icon = benefit.icon
              return (
                <div key={idx} className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </div>
              )
            })}
          </div>

          {/* Stats */}
          <div className="bg-secondary rounded-lg p-12">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
              {stats.map((stat, idx) => (
                <div key={idx} className="text-center">
                  <p className="text-2xl mb-2">{stat.icon}</p>
                  <p className="text-2xl font-bold text-primary mb-1">{stat.number}</p>
                  <p className="text-xs text-gray-600">{stat.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">Fonctionnalités essentielles</h2>
              
              {[
                { icon: '📱', title: 'Notifications SMS', desc: 'Recevez des messages à chaque étape importante.' },
                { icon: '🔐', title: 'Authentification sécurisée', desc: 'Transparence locale et protection assurée.' },
                { icon: '💬', title: 'Assistance Disponible', desc: 'Robert prosée nous vos questions' },
                { icon: '📧', title: 'Frontinform hors ligne', desc: 'Acessibilité aux démarches' }
              ].map((feature, idx) => (
                <div key={idx} className="flex gap-4">
                  <span className="text-3xl flex-shrink-0">{feature.icon}</span>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">{feature.title}</h4>
                    <p className="text-gray-600 text-sm">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg h-80 flex items-center justify-center">
              <p className="text-gray-500 text-center">Illustration des fonctionnalités</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 md:px-8 bg-gradient-to-r from-primary to-primary-light">
        <div className="max-w-4xl mx-auto text-center text-white">
          <div className="flex justify-center mb-4">
            <div className="text-4xl">📱</div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Prêt à simplifier vos démarches?</h2>
          <p className="text-lg mb-8 opacity-95">Créez votre compte gratuit et rejoignez les milliers de citoyens qui utilisent déjà e-Démarches au quotidien.</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate('/register')}
              className="px-8 py-3 bg-white text-primary font-bold rounded-lg hover:bg-gray-100 transition"
            >
              Créer un compte gratuit
            </button>
            <button 
              onClick={() => navigate('/login')}
              className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary transition"
            >
              Se connecter
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

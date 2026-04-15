export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">e-Démarches</h3>
            <p className="text-sm text-gray-400">Simplifier vos démarches administratives</p>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Plateforme</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition">Accueil</a></li>
              <li><a href="#" className="hover:text-white transition">Services</a></li>
              <li><a href="#" className="hover:text-white transition">Demandes</a></li>
              <li><a href="#" className="hover:text-white transition">Suivi</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Ressources</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition">Documentation</a></li>
              <li><a href="#" className="hover:text-white transition">FAQ</a></li>
              <li><a href="#" className="hover:text-white transition">Blog</a></li>
              <li><a href="#" className="hover:text-white transition">Support</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Légal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition">Mentions légales</a></li>
              <li><a href="#" className="hover:text-white transition">Confidentialité</a></li>
              <li><a href="#" className="hover:text-white transition">Conditions</a></li>
              <li><a href="#" className="hover:text-white transition">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Nous Suivre</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition">Facebook</a></li>
              <li><a href="#" className="hover:text-white transition">Twitter</a></li>
              <li><a href="#" className="hover:text-white transition">LinkedIn</a></li>
              <li><a href="#" className="hover:text-white transition">Instagram</a></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-sm text-gray-400 mb-4 md:mb-0">
              © 2024 e-Démarches Madagascar. Tous droits réservés.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <span>Disponible 24x/24 de 8-7</span>
              <a href="#" className="text-primary hover:text-primary-light transition">Disponible 24x/24</a>
              <span>Votre données sécurisé</span>
            </div>
          </div>
        </div>

        {/* Chat Widget Placeholder */}
        <div className="fixed bottom-6 right-6 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center cursor-pointer hover:bg-primary-dark transition shadow-lg">
          <span className="text-xl">💬</span>
        </div>
      </div>
    </footer>
  )
}

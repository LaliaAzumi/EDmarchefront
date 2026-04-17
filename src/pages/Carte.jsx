import { useState, useMemo, useEffect, useCallback } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Polyline, Polygon, useMap } from 'react-leaflet'
import { MapPin, Search, Navigation, Navigation2, Filter, Info, X, Building2, Trees, Stethoscope, GraduationCap, ShoppingBag, Clock, Car, Footprints, ChevronRight } from 'lucide-react'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import Header from '../components/Header'
import Footer from '../components/Footer'

// Fix icônes Leaflet
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

// Icône personnalisée pour les communes
const createCustomIcon = (color, num) => new L.DivIcon({
  className: 'custom-marker',
  html: `<div style="background-color:${color};width:32px;height:32px;border-radius:50%;border:3px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center;color:white;font-weight:bold;font-size:14px;">${num}</div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
})

// Icônes départ / arrivée
const userIcon = new L.DivIcon({
  className: 'custom-marker',
  html: '<div style="background-color:#3b82f6;width:20px;height:20px;border-radius:50%;border:3px solid white;box-shadow:0 0 0 3px rgba(59,130,246,0.3),0 2px 6px rgba(0,0,0,0.3);"></div>',
  iconSize: [20, 20], iconAnchor: [10, 10], popupAnchor: [0, -10]
})
const destIcon = new L.DivIcon({
  className: 'custom-marker',
  html: '<div style="background-color:#dc2626;width:28px;height:28px;border-radius:50%;border:3px solid white;box-shadow:0 2px 8px rgba(220,38,38,0.5);display:flex;align-items:center;justify-content:center;color:white;font-weight:bold;font-size:12px;">B</div>',
  iconSize: [28, 28], iconAnchor: [14, 28], popupAnchor: [0, -28]
})

// Composant pour contrôler la carte (flyTo)
function MapController({ center }) {
  const map = useMap()
  useEffect(() => {
    if (center) {
      map.flyTo(center, 14, { duration: 1.2 })
    }
  }, [center, map])
  return null
}

// Composant pour définir sa position en cliquant sur la carte
function MapClickHandler({ onMapClick, active }) {
  const map = useMap()
  useEffect(() => {
    if (!active) return
    const handler = (e) => onMapClick(e.latlng)
    map.on('click', handler)
    return () => map.off('click', handler)
  }, [map, onMapClick, active])
  return null
}

// Données des 6 arrondissements d'Antananarivo
const communesData = [
  {
    id: 1,
    name: 'Tana I — Analakely',
    description: "1er arrondissement étiré d'Est en Ouest. Inclut le Centre Administratif (Analakely, Tsaralalàna), la Ville Haute (Faravohitra, Isoraka) et la zone Ouest (67Ha, Andohatapenaka, Andavamamba/Anjezika).",
    position: [-18.916, 47.510],
    color: '#0d9488',
    population: '~310 000',
    superficie: '18.5 km²',
    fokontany: ['Analakely', 'Tsaralalàna', 'Ambondrona', 'Soarano', 'Andohalo', 'Isoraka', 'Faravohitra', 'Ambohitsorohitra', '67Ha Nord', '67Ha Sud', 'Ambalavao Isotry', 'Andavamamba', 'Anjezika', 'Andohatapenaka I', 'Andohatapenaka II', 'Andohatapenaka III'],
    services: [
      { type: 'admin', name: 'Hôtel de Ville — Mairie Centrale' },
      { type: 'admin', name: "Palais d'Andohalo" },
      { type: 'transport', name: 'Gare Soarano' },
      { type: 'commerce', name: 'Marché Analakely' },
      { type: 'commerce', name: 'Marché 67Ha' },
      { type: 'sante', name: 'CHU HJRA' },
      { type: 'sante', name: 'Centre Andohatapenaka' },
      { type: 'loisir', name: 'Parc de la Reine' },
    ]
  },
  {
    id: 2,
    name: 'Tana II — Ambanidia',
    description: "2e arrondissement. Zone vaste de l'Est incluant Ankatso (campus universitaire), Ambohipo, Andrainarivo (Palais Présidentiel), Mahazoarivo, Ambohitrakely, Manjakaray et Mandroseza. Superficie réelle ~24.6 km².",
    position: [-18.910, 47.555],
    color: '#0891b2',
    population: '~350 000',
    superficie: '24.6 km²',
    fokontany: ['Ambanidia', 'Ankatso', 'Ambohipo', 'Antsakaviro', 'Mahazoarivo', 'Andrainarivo', 'Ankadifotsy', 'Manjakaray', 'Ambohitrakely', 'Mandroseza'],
    services: [
      { type: 'education', name: "Université d'Antananarivo (Ankatso)" },
      { type: 'admin', name: 'Palais Présidentiel (Iavoloha)' },
      { type: 'admin', name: 'Bureau arrondissement II' },
      { type: 'commerce', name: 'Marché Ambanidia' },
      { type: 'sante', name: 'Hôpital Andohatapenaka' },
    ]
  },
  {
    id: 3,
    name: 'Tana III — Antaninandro',
    description: "3e arrondissement en forme de L, charnière entre centre-ville et Nord. Inclut Antaninandro, Ampandrana, Besarety, Avaradoha, Andravoahangy (marché), Ankorondrano (bureaux Galaxy/Explorer), Behoririka (lac), Tsiazotafo et Ambodivona (gares routières).",
    position: [-18.885, 47.545],
    color: '#7c3aed',
    population: '~280 000',
    superficie: '15.2 km²',
    fokontany: ['Antaninandro', 'Ampandrana', 'Ankorondrano', 'Andravoahangy', 'Behoririka', 'Tsiazotafo', 'Besarety', 'Avaradoha', 'Ampandrianomby', 'Antaninarenina', 'Ambodivona', '67 Ha Nord', 'Anosy', 'Antanambao'],
    services: [
      { type: 'admin', name: 'Bureau arrondissement III (Antaninandro)' },
      { type: 'commerce', name: 'Marché Andravoahangy' },
      { type: 'commerce', name: 'Immeubles Galaxy & Explorer (Ankorondrano)' },
      { type: 'commerce', name: 'Zone commerciale Behoririka' },
      { type: 'transport', name: 'Gares routières Tsiazotafo & Ambodivona' },
      { type: 'sante', name: 'Clinique Antaninarenina' },
      { type: 'loisir', name: 'Lac Anosy' },
    ]
  },
  {
    id: 4,
    name: 'Tana IV — Isotry / Anosizato',
    description: "4e arrondissement du Sud-Ouest, très étiré le long de l'Ikopa. Zone dense, industrielle et résidentielle incluant Isotry (Sud), Anosizato Est (entrée RN1/RN7), Soanierana (industriel), Namontana (marché), Ilanivato, Anosipatrana (canaux) et la digue d'Anosizato.",
    position: [-18.935, 47.495],
    color: '#dc2626',
    population: '~380 000',
    superficie: '22.8 km²',
    fokontany: ['Isotry Sud', 'Anosizato Est', 'Namontana', 'Soanierana', 'Fiadanana', 'Angarangarana', 'Ilanivato', 'Anosipatrana', 'Anosizato Ouest', 'Ankadimbahoaka', 'Manjakamiadana', 'Anosibe Analamanga'],
    services: [
      { type: 'admin', name: 'Bureau arrondissement IV (Isotry/Anosipatrana)' },
      { type: 'commerce', name: 'Marché Anosizato' },
      { type: 'commerce', name: 'Marché Namontana' },
      { type: 'commerce', name: 'Zone industrielle Soanierana' },
      { type: 'transport', name: 'Pont d\'Anosizato (RN1/RN7)' },
      { type: 'transport', name: 'Gare routière Sud-Ouest' },
      { type: 'sante', name: 'CSB Anosizato' },
      { type: 'education', name: 'Lycée Anosizato' },
    ]
  },
  {
    id: 5,
    name: 'Tana V — Ambatomainty',
    description: "5e arrondissement 'vert' et résidentiel du Nord-Est, très vaste. Inclut Ivandry & Alarobia (ambassades, centres d'affaires), Analamahitsy & Nanisana (résidentiel dense), Ambatobe (Lycée Français), Soavimasoandro (en développement) et Ambohitrarahaba. Limite nord jusqu'à Ambohimangakely.",
    position: [-18.870, 47.575],
    color: '#ea580c',
    population: '~330 000',
    superficie: '28.5 km²',
    fokontany: ['Ambatomainty', 'Ivandry', 'Alarobia', 'Nanisana', 'Ambatobe', 'Morarano', 'Analamahitsy', 'Manjakaray', 'Ambohijatovo', 'Mahamasina', 'Tsimbazaza', 'Anosibe', 'Ankorondrano', 'Andranomena', 'Soavimasoandro', 'Ambohitrarahaba', 'Ampasampito'],
    services: [
      { type: 'admin', name: 'Bureau arrondissement V (Ambatomainty)' },
      { type: 'sport', name: 'Stade Mahamasina' },
      { type: 'loisir', name: 'Parc Botanique Tsimbazaza' },
      { type: 'education', name: 'Lycée Français (Ambatobe)' },
      { type: 'commerce', name: 'Zone ambassades Ivandry/Alarobia' },
      { type: 'commerce', name: 'Centres d\'affaires Alarobia' },
      { type: 'commerce', name: 'Marché Anosibe' },
      { type: 'sante', name: 'CHU Befelatanana' },
      { type: 'sante', name: 'Cliniques privées Ivandry' },
    ]
  },
  {
    id: 6,
    name: 'Tana VI — Ambohimanarina',
    description: "6e arrondissement du Nord-Ouest. Zone de contrastes mêlant plaines de rizières, résidentiel populaire et grande zone industrielle. Inclut Ambohimanarina (centre administratif), Andraharo (zone industrielle, banques, télécoms), Ambodimita (carrefour RN4), Ankazomanga, Ankasina, Antanetikely, Ambohimaditika. Limite nord jusqu'à Ambohibao-Antehiroka, limite ouest le long de l'Ikopa et la RN4.",
    position: [-18.855, 47.535],
    color: '#059669',
    population: '~250 000',
    superficie: '19.7 km²',
    fokontany: ['Ambohimanarina', 'Ambodimita', 'Ankasina', 'Ankazomanga', 'Andraharo', 'Antanetikely', 'Ambohimaditika', 'Ambohipo', 'Andavamamba', 'Anosibe Andrefana'],
    services: [
      { type: 'admin', name: 'Bureau arrondissement VI (Rue Dr. J. Raseta)' },
      { type: 'commerce', name: 'Zone industrielle Andraharo' },
      { type: 'commerce', name: 'Sièges banques & télécoms (Andraharo)' },
      { type: 'transport', name: 'Carrefour stratégique Ambodimita (RN4)' },
      { type: 'transport', name: 'Route de la Digue vers Ivato/Majunga' },
      { type: 'sante', name: 'Centre médical Ambohipo' },
      { type: 'commerce', name: 'Marché Ambohimanarina' },
    ]
  },
]

// OSRM routing API (gratuit, pas de clé)
const OSRM_URL = 'https://router.project-osrm.org/route/v1/driving'

// Limites des 6 arrondissements d'Antananarivo (coordonnées GPS précises)
const arrondissementBoundaries = {
  1: [ // Tana I - Analakely (étiré d'Est en Ouest)
    // Nord-Est: Collines de Faravohitra
    [-18.890, 47.530], [-18.892, 47.538],
    // Centre-ville: Analakely, Tsaralalàna
    [-18.900, 47.532], [-18.906, 47.528],
    // Ouest: Ambondrona, Soarano (Gare)
    [-18.910, 47.520], [-18.914, 47.512],
    // Sud-Ouest: 67Ha Nord et Sud, Ambalavao Isotry
    [-18.920, 47.505], [-18.928, 47.500],
    // Ouest extrême: Andavamamba (Anjezika), Andohatapenaka I, II, III
    [-18.935, 47.495], [-18.942, 47.490],
    // Sud: Retour vers l'est
    [-18.940, 47.505], [-18.932, 47.515],
    // Est: Isoraka, Ambohitsorohitra
    [-18.922, 47.525], [-18.912, 47.532], [-18.890, 47.530]
  ],
  2: [ // Tana II - Ambanidia (est, université, palais présidentiel)
    // Départ: limite ouest vers centre-ville
    [-18.908, 47.530], [-18.902, 47.534], [-18.900, 47.540],
    // Vers nord-est: Ambohitrakely, Manjakaray
    [-18.892, 47.548], [-18.888, 47.556], [-18.882, 47.562],
    // Vers est extrême: Ankatso campus universitaire complet
    [-18.890, 47.570], [-18.898, 47.575], [-18.910, 47.578],
    // Vers sud-est: Mahazoarivo, Andrainarivo (palais présidentiel)
    [-18.922, 47.572], [-18.930, 47.565], [-18.935, 47.555],
    // Vers sud: Mandroseza, Ambohipo
    [-18.932, 47.545], [-18.925, 47.538], [-18.918, 47.532],
    // Retour vers ouest
    [-18.912, 47.528], [-18.908, 47.530]
  ],
  3: [ // Tana III - Antaninandro (forme en L étirée vers le Nord)
    // Sud-Est: Besarety, Avaradoha (limite avec Tana I)
    [-18.910, 47.530], [-18.915, 47.535],
    // Centre: Antaninandro, Ampandrana (bureau arrondissement)
    [-18.905, 47.540], [-18.898, 47.545],
    // Nord-Est: Andravoahangy (marché)
    [-18.890, 47.550], [-18.885, 47.555],
    // Nord: Ankorondrano (zone bureaux, Galaxy, Explorer)
    [-18.880, 47.560], [-18.875, 47.565], [-18.870, 47.560],
    // Nord-Ouest: Behoririka (lac et commercial)
    [-18.865, 47.550], [-18.868, 47.540],
    // Ouest: Tsiazotafo, Ambodivona (gares routières)
    [-18.875, 47.530], [-18.885, 47.525],
    // Retour Sud-Est
    [-18.895, 47.528], [-18.910, 47.530]
  ],
  4: [ // Tana IV - Isotry/Anosizato (étiré le long de l'Ikopa)
    // Nord-Est: Limite avec Tana I (67Ha, Isotry)
    [-18.910, 47.526], [-18.918, 47.528],
    // Est: Descente vers Manjakamiadana
    [-18.930, 47.520], [-18.938, 47.512],
    // Sud-Est: Ankadimbahoaka, début RN7
    [-18.945, 47.505], [-18.952, 47.500],
    // Sud: Zone industrielle Soanierana, Namontana
    [-18.958, 47.495], [-18.962, 47.485],
    // Sud-Ouest: Ilanivato, Anosipatrana (près canaux)
    [-18.965, 47.475], [-18.960, 47.465],
    // Ouest: Anosizato Est, pont d'Anosizato (limite Ikopa)
    [-18.950, 47.460], [-18.938, 47.465],
    // Nord-Ouest: Remontée le long digue
    [-18.925, 47.475], [-18.915, 47.485],
    // Retour Nord-Est
    [-18.908, 47.495], [-18.905, 47.510], [-18.910, 47.526]
  ],
  5: [ // Tana V - Ambatomainty (étiré vers Nord-Est, zone ambassades)
    // Sud-Ouest: Limite avec Tana III (Manjakaray, Ampasampito)
    [-18.895, 47.530], [-18.890, 47.540],
    // Ouest: Route d'Ankorondrano/Alarobia
    [-18.885, 47.550], [-18.878, 47.560],
    // Nord-Ouest: Alarobia (zone ambassades, centres d'affaires)
    [-18.870, 47.570], [-18.862, 47.580],
    // Nord: Ivandry, Analamahitsy, Nanisana (résidentiel haut standing)
    [-18.855, 47.590], [-18.850, 47.600], [-18.855, 47.610],
    // Nord-Est extrême: Ambatobe (Lycée Français), Ambohitrarahaba
    [-18.865, 47.620], [-18.875, 47.625], [-18.885, 47.620],
    // Est: Soavimasoandro (zone en développement)
    [-18.890, 47.610], [-18.895, 47.595],
    // Sud-Est: Retour vers Ambatomainty
    [-18.898, 47.575], [-18.900, 47.560],
    // Retour Sud-Ouest
    [-18.898, 47.545], [-18.895, 47.530]
  ],
  6: [ // Tana VI - Ambohimanarina (Nord-Ouest, le long RN4 et Ikopa)
    // Sud-Est: Limite avec Tana III (Ankorondrano)
    [-18.875, 47.530], [-18.870, 47.540],
    // Nord-Est: Limite avec Tana V (Alarobia, route d'Alarobia)
    [-18.865, 47.550], [-18.858, 47.560],
    // Nord: Antanetikely, Ambohimaditika (vers Ambohibao)
    [-18.850, 47.570], [-18.845, 47.580], [-18.840, 47.575],
    // Nord-Ouest: Limite commune Ambohibao-Antehiroka
    [-18.835, 47.565], [-18.830, 47.550],
    // Ouest: Route de la Digue (RN4), bord Ikopa vers Ivato
    [-18.835, 47.530], [-18.840, 47.510], [-18.845, 47.495],
    // Sud-Ouest: Andraharo (zone industrielle), Ankazomanga
    [-18.855, 47.485], [-18.865, 47.480],
    // Sud: Ambodimita (carrefour stratégique), Ankasina
    [-18.872, 47.485], [-18.878, 47.495],
    // Retour Sud-Est
    [-18.880, 47.510], [-18.875, 47.530]
  ]
}

const serviceTypes = [
  { id: 'admin', label: 'Administration', icon: Building2, color: '#0d9488' },
  { id: 'commerce', label: 'Commerce', icon: ShoppingBag, color: '#0891b2' },
  { id: 'sante', label: 'Santé', icon: Stethoscope, color: '#dc2626' },
  { id: 'education', label: 'Éducation', icon: GraduationCap, color: '#7c3aed' },
  { id: 'loisir', label: 'Loisirs', icon: Trees, color: '#059669' },
  { id: 'transport', label: 'Transport', icon: Navigation, color: '#ea580c' },
]

export default function Carte() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCommune, setSelectedCommune] = useState(null)
  const [userPosition, setUserPosition] = useState(null) // [lat, lng]
  const [geoLoading, setGeoLoading] = useState(false)
  const [geoError, setGeoError] = useState('')
  const [routeDestination, setRouteDestination] = useState(null) // commune object
  const [showRoute, setShowRoute] = useState(false)
  const [activeFilters, setActiveFilters] = useState([])
  const [activeTab, setActiveTab] = useState('carte')
  const [routeData, setRouteData] = useState(null) // { coords, distance, duration, steps }
  const [routeLoading, setRouteLoading] = useState(false)
  const [travelMode, setTravelMode] = useState('driving') // driving | walking
  const [mapCenter, setMapCenter] = useState(null)
  const [showSteps, setShowSteps] = useState(false)
  const [clickToSetPosition, setClickToSetPosition] = useState(false)

  // Obtenir la position GPS de l'utilisateur
  const getUserLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setGeoError('Géolocalisation non supportée par votre navigateur. Cliquez sur la carte pour définir votre position.')
      return
    }
    setGeoLoading(true)
    setGeoError('')
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserPosition([pos.coords.latitude, pos.coords.longitude])
        setGeoLoading(false)
      },
      (err) => {
        setGeoLoading(false)
        if (err.code === 1) {
          setGeoError('Permission refusée. Autorisez la géolocalisation ou cliquez sur la carte.')
        } else if (err.code === 2) {
          setGeoError('Position indisponible. Cliquez sur la carte pour définir votre position.')
        } else if (err.code === 3) {
          setGeoError('Délai expiré. Cliquez sur la carte pour définir votre position.')
        } else {
          setGeoError('Erreur de géolocalisation. Cliquez sur la carte pour définir votre position.')
        }
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 60000 }
    )
  }, [])

  const filteredCommunes = useMemo(() => {
    return communesData.filter(commune => {
      const matchesSearch = commune.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        commune.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        commune.services.some(s => s.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (commune.fokontany && commune.fokontany.some(fk => fk.toLowerCase().includes(searchQuery.toLowerCase())))
      const matchesFilter = activeFilters.length === 0 ||
        commune.services.some(s => activeFilters.includes(s.type))
      return matchesSearch && matchesFilter
    })
  }, [searchQuery, activeFilters])

  // Fetch route OSRM : départ = position utilisateur, arrivée = arrondissement
  useEffect(() => {
    if (!userPosition || !routeDestination || !showRoute) {
      setRouteData(null)
      return
    }
    let cancelled = false
    setRouteLoading(true)
    const modeUrl = travelMode === 'walking'
      ? 'https://router.project-osrm.org/route/v1/foot'
      : OSRM_URL
    const url = `${modeUrl}/${userPosition[1]},${userPosition[0]};${routeDestination.position[1]},${routeDestination.position[0]}?overview=full&geometries=geojson&steps=true`
    fetch(url)
      .then(r => r.json())
      .then(data => {
        if (cancelled) return
        if (data.code === 'Ok' && data.routes?.length) {
          const route = data.routes[0]
          const coords = route.geometry.coordinates.map(([lon, lat]) => [lat, lon])
          const steps = route.legs[0].steps.map(s => ({
            name: s.name || 'Route',
            distance: s.distance,
            duration: s.duration,
            maneuver: s.maneuver.type,
            modifier: s.maneuver.modifier || '',
          }))
          setRouteData({ coords, distance: route.distance, duration: route.duration, steps })
        } else {
          setRouteData(null)
        }
        setRouteLoading(false)
      })
      .catch(() => { if (!cancelled) { setRouteData(null); setRouteLoading(false) } })
    return () => { cancelled = true }
  }, [userPosition, routeDestination, showRoute, travelMode])

  // FlyTo quand on sélectionne un arrondissement
  const handleSelectCommune = useCallback((commune) => {
    setSelectedCommune(commune)
    setMapCenter(commune.position)
  }, [])

  // Définir sa position en cliquant sur la carte
  const handleMapClick = useCallback((latlng) => {
    setUserPosition([latlng.lat, latlng.lng])
    setClickToSetPosition(false)
    setGeoError('')
  }, [])

  const toggleFilter = (filterId) => {
    setActiveFilters(prev =>
      prev.includes(filterId)
        ? prev.filter(f => f !== filterId)
        : [...prev, filterId]
    )
  }

  // Calculer l'itinéraire vers un arrondissement depuis la position utilisateur
  const navigateToCommune = useCallback((commune) => {
    if (!userPosition) {
      // Demander la géolocalisation d'abord
      setRouteDestination(commune)
      getUserLocation()
      return
    }
    setRouteDestination(commune)
    setShowRoute(true)
  }, [userPosition, getUserLocation])

  // Quand la position arrive après avoir demandé la navigation
  useEffect(() => {
    if (userPosition && routeDestination && !showRoute) {
      setShowRoute(true)
    }
  }, [userPosition, routeDestination, showRoute])

  const clearRoute = useCallback(() => {
    setRouteDestination(null)
    setShowRoute(false)
    setRouteData(null)
    setShowSteps(false)
  }, [])

  const formatDuration = (seconds) => {
    if (seconds < 60) return `${Math.round(seconds)} s`
    if (seconds < 3600) return `${Math.ceil(seconds / 60)} min`
    const h = Math.floor(seconds / 3600)
    const m = Math.ceil((seconds % 3600) / 60)
    if (m === 60) return `${h + 1}h`
    return `${h}h ${m}min`
  }

  const getArrivalTime = (seconds) => {
    const arrival = new Date(Date.now() + seconds * 1000)
    return arrival.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
  }

  const formatDistance = (meters) => {
    if (meters < 1000) return `${Math.round(meters)} m`
    return `${(meters / 1000).toFixed(1)} km`
  }

  const getManeuverIcon = (maneuver) => {
    if (maneuver.includes('turn') || maneuver.includes('end')) return '↪'
    if (maneuver.includes('arrive')) return '📍'
    if (maneuver.includes('depart')) return '🚀'
    if (maneuver.includes('roundabout')) return '🔄'
    if (maneuver.includes('fork')) return '⑂'
    return '→'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero */}
      <div className="bg-gradient-to-r from-teal-600 to-cyan-600 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <MapPin className="w-8 h-8 text-white" />
            <div>
              <h1 className="text-2xl font-bold text-white">Carte Interactive d'Antananarivo</h1>
              <p className="text-teal-100 text-sm">Commune Urbaine d'Antananarivo — 6 arrondissements, 192 fokontany</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Barre d'outils */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6 space-y-4">
          {/* Recherche */}
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un arrondissement, un service, un fokontany..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-3 top-3 text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Filtres */}
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center gap-2 mr-3">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Filtrer:</span>
            </div>
            {serviceTypes.map(service => {
              const Icon = service.icon
              const isActive = activeFilters.includes(service.id)
              return (
                <button
                  key={service.id}
                  onClick={() => toggleFilter(service.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition ${
                    isActive ? 'text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  style={{ backgroundColor: isActive ? service.color : undefined }}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {service.label}
                </button>
              )
            })}
            {activeFilters.length > 0 && (
              <button onClick={() => setActiveFilters([])} className="text-sm text-gray-500 hover:text-gray-700 underline ml-2">
                Réinitialiser
              </button>
            )}
          </div>

          {/* Itinéraire */}
          {routeDestination && (
            <div className="p-3 bg-blue-50 rounded-lg space-y-3">
              <div className="flex items-center gap-3">
                <Navigation2 className="w-5 h-5 text-blue-600" />
                <div className="flex-1 flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-medium text-gray-700">Itinéraire:</span>
                  <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-700">
                    📍 Ma position
                  </span>
                  <Navigation className="w-4 h-4 text-gray-400" />
                  <span className="px-2 py-1 rounded text-xs font-medium text-white" style={{ backgroundColor: routeDestination.color }}>
                    {routeDestination.name.split(' — ')[1] || routeDestination.name.split(' ').pop()}
                  </span>
                </div>
                <button onClick={clearRoute} className="text-sm text-red-600 hover:text-red-700 underline">Effacer</button>
              </div>
              {/* Géolocalisation status */}
              {geoError && (
                <p className="text-xs text-red-600">⚠️ {geoError}</p>
              )}
              {geoLoading && (
                <div className="flex items-center gap-2 text-xs text-blue-600">
                  <div className="w-3 h-3 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                  Localisation en cours...
                </div>
              )}
              {/* Mode de transport */}
              <div className="flex gap-2">
                <button
                  onClick={() => setTravelMode('driving')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition ${travelMode === 'driving' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
                >
                  <Car className="w-3.5 h-3.5" />Voiture
                </button>
                <button
                  onClick={() => setTravelMode('walking')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition ${travelMode === 'walking' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
                >
                  <Footprints className="w-3.5 h-3.5" />À pied
                </button>
              </div>
              {/* Infos route */}
              {routeLoading && (
                <div className="flex items-center gap-2 text-sm text-blue-600">
                  <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                  Calcul de l'itinéraire...
                </div>
              )}
              {routeData && !routeLoading && (
                <div className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1 text-blue-700 font-semibold">
                    {travelMode === 'walking' ? <Footprints className="w-4 h-4" /> : <Car className="w-4 h-4" />}
                    {formatDistance(routeData.distance)}
                  </span>
                  <span className="flex items-center gap-1 text-blue-700 font-semibold">
                    <Clock className="w-4 h-4" />
                    {formatDuration(routeData.duration)}
                  </span>
                  <span className="text-xs text-gray-500">
                    Arrivée: {getArrivalTime(routeData.duration)}
                  </span>
                  <button
                    onClick={() => setShowSteps(!showSteps)}
                    className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 underline ml-auto"
                  >
                    {showSteps ? 'Masquer' : 'Voir'} étapes
                    <ChevronRight className={`w-3 h-3 transition ${showSteps ? 'rotate-90' : ''}`} />
                  </button>
                </div>
              )}
              {/* Étapes détaillées */}
              {showSteps && routeData?.steps && (
                <div className="max-h-40 overflow-y-auto space-y-1 pr-1">
                  {routeData.steps.filter(s => s.distance > 10).map((step, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs bg-white rounded p-2">
                      <span className="text-base flex-shrink-0">{getManeuverIcon(step.maneuver)}</span>
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">{step.name}</p>
                        <p className="text-gray-400">{formatDistance(step.distance)} · {formatDuration(step.duration)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="flex gap-4 border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab('carte')}
            className={`pb-3 px-2 font-medium transition ${activeTab === 'carte' ? 'text-teal-600 border-b-2 border-teal-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            🗺️ Carte
          </button>
          <button
            onClick={() => setActiveTab('liste')}
            className={`pb-3 px-2 font-medium transition ${activeTab === 'liste' ? 'text-teal-600 border-b-2 border-teal-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            📋 Liste ({filteredCommunes.length} arrondissements)
          </button>
        </div>

        {activeTab === 'carte' ? (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Carte */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="h-[600px] relative">
                  <MapContainer
                    center={[-18.9333, 47.5167]}
                    zoom={13}
                    scrollWheelZoom={true}
                    className="h-full w-full"
                  >
                    <MapController center={mapCenter} />
                    <MapClickHandler onMapClick={handleMapClick} active={clickToSetPosition} />
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {/* Route OSRM */}
                    {showRoute && routeData?.coords && (
                      <Polyline positions={routeData.coords} color="#2563eb" weight={5} opacity={0.8} />
                    )}
                    {/* Polygones des limites des arrondissements */}
                    {filteredCommunes.map((commune) => (
                      <Polygon
                        key={`boundary-${commune.id}`}
                        positions={arrondissementBoundaries[commune.id] || []}
                        pathOptions={{
                          color: commune.color,
                          fillColor: commune.color,
                          fillOpacity: selectedCommune?.id === commune.id ? 0.3 : 0.1,
                          weight: selectedCommune?.id === commune.id ? 3 : 2,
                          opacity: 0.8,
                          dashArray: selectedCommune?.id === commune.id ? null : '5, 5'
                        }}
                        eventHandlers={{
                          click: () => handleSelectCommune(commune)
                        }}
                      />
                    ))}
                    {/* Marqueur position utilisateur */}
                    {userPosition && (
                      <Marker position={userPosition} icon={userIcon}>
                        <Popup><strong>📍 Ma position</strong></Popup>
                      </Marker>
                    )}
                    {/* Marqueur destination */}
                    {routeDestination && showRoute && (
                      <Marker position={routeDestination.position} icon={destIcon}>
                        <Popup><strong>Arrivée :</strong> {routeDestination.name}</Popup>
                      </Marker>
                    )}
                    {filteredCommunes.map((commune) => (
                      <Marker
                        key={commune.id}
                        position={commune.position}
                        icon={createCustomIcon(commune.color, commune.id)}
                        eventHandlers={{ click: () => handleSelectCommune(commune) }}
                      >
                        <Popup>
                          <div className="p-2 min-w-[220px]">
                            <h3 className="font-bold text-gray-900 mb-1">{commune.name}</h3>
                            <p className="text-xs text-gray-500 mb-2">Pop: {commune.population} • {commune.superficie}</p>
                            <p className="text-sm text-gray-600 mb-3">{commune.description.slice(0, 80)}...</p>
                            <div className="flex gap-2">
                              <button
                                onClick={() => navigateToCommune(commune)}
                                className={`text-xs px-3 py-1 rounded ${routeDestination?.id === commune.id ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-700 hover:bg-blue-200'}`}
                              >
                                <Navigation2 className="w-3 h-3 inline mr-1" />Y aller
                              </button>
                            </div>
                          </div>
                        </Popup>
                      </Marker>
                    ))}
                  </MapContainer>

                  {/* Légende */}
                  <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur rounded-xl shadow-lg p-4 z-[1000]">
                    <h4 className="font-semibold text-gray-800 mb-3 text-sm">Arrondissements</h4>
                    <div className="space-y-2">
                      {filteredCommunes.map((commune) => (
                        <div
                          key={commune.id}
                          className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded"
                          onClick={() => handleSelectCommune(commune)}
                        >
                          <div className="w-4 h-4 rounded-full border-2 border-white shadow" style={{ backgroundColor: commune.color }} />
                          <span className="text-xs text-gray-700">{commune.name.split(' — ')[1] || commune.name.split(' ').pop()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {selectedCommune ? (
                <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4" style={{ borderColor: selectedCommune.color }}>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{selectedCommune.name}</h3>
                      <div className="flex items-center gap-3 mt-2 text-sm text-gray-500">
                        <span>👥 {selectedCommune.population}</span>
                        <span>📐 {selectedCommune.superficie}</span>
                        <span>🏘️ {selectedCommune.fokontany?.length || 0} fokontany</span>
                      </div>
                    </div>
                    <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg" style={{ backgroundColor: selectedCommune.color }}>
                      {selectedCommune.id}
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">{selectedCommune.description}</p>

                  {/* Fokontany */}
                  {selectedCommune.fokontany && selectedCommune.fokontany.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2 text-sm">
                        <Building2 className="w-4 h-4" />Fokontany ({selectedCommune.fokontany.length})
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedCommune.fokontany.map((fk, i) => (
                          <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">{fk}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions itinéraire */}
                  <div className="space-y-2 mb-4">
                    <button
                      onClick={() => navigateToCommune(selectedCommune)}
                      className={`w-full py-2.5 rounded-lg text-sm font-semibold transition ${routeDestination?.id === selectedCommune.id ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-700 hover:bg-blue-100'}`}
                    >
                      <Navigation2 className="w-4 h-4 inline mr-1" />Y aller depuis ma position
                    </button>
                    {!userPosition && !geoLoading && (
                      <div className="space-y-2">
                        <button
                          onClick={getUserLocation}
                          className="w-full py-2 rounded-lg text-xs font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition"
                        >
                          📍 Activer ma géolocalisation
                        </button>
                        <button
                          onClick={() => setClickToSetPosition(true)}
                          className={`w-full py-2 rounded-lg text-xs font-medium transition ${clickToSetPosition ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                        >
                          🗺️ Cliquez sur la carte pour définir ma position
                        </button>
                      </div>
                    )}
                    {geoLoading && (
                      <p className="text-xs text-blue-600 text-center flex items-center justify-center gap-1">
                        <span className="w-3 h-3 border-2 border-blue-600 border-t-transparent rounded-full animate-spin inline-block" />
                        Localisation...
                      </p>
                    )}
                    {clickToSetPosition && (
                      <p className="text-xs text-blue-600 text-center font-medium animate-pulse">
                        👆 Cliquez sur la carte pour placer votre position...
                      </p>
                    )}
                  </div>

                  {/* Services */}
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2 text-sm">
                      <Info className="w-4 h-4" />Services disponibles
                    </h4>
                    <div className="space-y-2">
                      {selectedCommune.services.map((service, idx) => {
                        const st = serviceTypes.find(s => s.id === service.type)
                        const Icon = st?.icon || Building2
                        return (
                          <div key={idx} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white" style={{ backgroundColor: st?.color || '#6b7280' }}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-800">{service.name}</p>
                              <p className="text-xs text-gray-500 capitalize">{service.type}</p>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100 mt-4">
                    <p className="text-xs text-gray-400 flex items-center gap-1">
                      <Navigation className="w-3 h-3" />
                      {selectedCommune.position[0].toFixed(4)}, {selectedCommune.position[1].toFixed(4)}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-lg p-8 text-center text-gray-500">
                  <MapPin className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p className="mb-2">Cliquez sur un marqueur</p>
                  <p className="text-sm">pour voir les détails et créer un itinéraire</p>
                </div>
              )}

              <div className="bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl shadow-lg p-6 text-white">
                <h4 className="font-semibold mb-4">Antananarivo</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 rounded-lg p-3 text-center">
                    <p className="text-3xl font-bold">6</p>
                    <p className="text-xs text-teal-100 mt-1">Arrondissements</p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3 text-center">
                    <p className="text-3xl font-bold">192</p>
                    <p className="text-xs text-teal-100 mt-1">Fokontany</p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3 text-center">
                    <p className="text-3xl font-bold">~1.9M</p>
                    <p className="text-xs text-teal-100 mt-1">Habitants</p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3 text-center">
                    <p className="text-3xl font-bold">56</p>
                    <p className="text-xs text-teal-100 mt-1">km² total</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Vue Liste */
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCommunes.map((commune) => (
              <div
                key={commune.id}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition cursor-pointer border-t-4"
                style={{ borderColor: commune.color }}
                onClick={() => handleSelectCommune(commune)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg" style={{ backgroundColor: commune.color }}>
                    {commune.id}
                  </div>
                  <div className="text-right text-xs text-gray-500">
                    <p>👥 {commune.population}</p>
                    <p>📐 {commune.superficie}</p>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{commune.name}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{commune.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {commune.services.slice(0, 4).map((service, idx) => (
                    <span key={idx} className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                      {service.name.length > 15 ? service.name.slice(0, 15) + '...' : service.name}
                    </span>
                  ))}
                  {commune.services.length > 4 && (
                    <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-400">+{commune.services.length - 4}</span>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={(e) => { e.stopPropagation(); navigateToCommune(commune) }}
                    className="flex-1 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-100"
                  >
                    <Navigation2 className="w-3.5 h-3.5 inline mr-1" />Y aller
                  </button>
                </div>
              </div>
            ))}
            {filteredCommunes.length === 0 && (
              <div className="col-span-full text-center py-12 text-gray-500">
                <Search className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>Aucun arrondissement ne correspond à votre recherche</p>
              </div>
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}

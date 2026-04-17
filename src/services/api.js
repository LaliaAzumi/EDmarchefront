// Service API pour communiquer avec le backend Django
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

// Fonction utilitaire pour les requêtes fetch
async function fetchWithAuth(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`
  const token = localStorage.getItem('access_token')
  const skipAuth = options.skipAuth || false

  const config = {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(!skipAuth && token && { 'Authorization': `Bearer ${token}` }),
      ...options.headers,
    },
  }
  delete config.skipAuth

  const response = await fetch(url, config)

  // Gérer les erreurs 401 (token expiré) seulement si pas skipAuth
  if (response.status === 401 && !skipAuth) {
    const refreshToken = localStorage.getItem('refresh_token')
    if (refreshToken) {
      try {
        const newToken = await refreshAccessToken(refreshToken)
        localStorage.setItem('access_token', newToken)
        config.headers['Authorization'] = `Bearer ${newToken}`
        const retryResponse = await fetch(url, config)
        if (!retryResponse.ok) {
          const error = await retryResponse.json()
          throw new Error(error.error || error.message || 'Une erreur est survenue')
        }
        return retryResponse.json()
      } catch (error) {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        localStorage.removeItem('user')
        window.location.href = '/login'
        throw error
      }
    }
  }

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || error.message || 'Une erreur est survenue')
  }

  return response.json()
}

// Rafraîchir le token d'accès
async function refreshAccessToken(refreshToken) {
  const response = await fetch(`${API_BASE_URL}/users/token/refresh/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh: refreshToken }),
  })
  
  if (!response.ok) {
    throw new Error('Impossible de rafraîchir le token')
  }
  
  const data = await response.json()
  localStorage.setItem('refresh_token', data.refresh)
  return data.access
}

// ===== AUTHENTIFICATION =====

export const authAPI = {
  // Inscription
  register: async (userData) => {
    const response = await fetchWithAuth('/users/register/', {
      method: 'POST',
      skipAuth: true,
      body: JSON.stringify({
        email: userData.email,
        nom: `${userData.firstName} ${userData.lastName}`,
        prenom: userData.firstName || '',
        date_naissance: userData.dateOfBirth || null,
        cin: userData.cin || null,
        adresse: userData.address || '',
        password: userData.password,
        role: 'citoyen',
      }),
    })

    if (response.tokens) {
      localStorage.setItem('access_token', response.tokens.access)
      localStorage.setItem('refresh_token', response.tokens.refresh)
    }

    return response
  },

  // Connexion
  login: async (email, password) => {
    const response = await fetchWithAuth('/users/login/', {
      method: 'POST',
      skipAuth: true,
      body: JSON.stringify({ email, password }),
    })

    if (response.tokens) {
      localStorage.setItem('access_token', response.tokens.access)
      localStorage.setItem('refresh_token', response.tokens.refresh)
      const userData = { ...response.user }
      if (response.citoyen) {
        userData.prenom = response.citoyen.prenom || ''
        userData.date_naissance = response.citoyen.date_naissance || ''
        userData.cin = response.citoyen.cin || ''
        userData.adresse = response.citoyen.adresse || ''
      }
      localStorage.setItem('user', JSON.stringify(userData))
    }

    return response
  },
  
  // Déconnexion
  logout: async () => {
    const refreshToken = localStorage.getItem('refresh_token')
    if (refreshToken) {
      try {
        await fetchWithAuth('/users/logout/', {
          method: 'POST',
          body: JSON.stringify({ refresh: refreshToken }),
        })
      } catch (error) {
        console.error('Erreur lors de la déconnexion:', error)
      }
    }
    
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('user')
  },
  
  // Récupérer l'utilisateur connecté
  getMe: async () => {
    return fetchWithAuth('/users/utilisateurs/me/')
  },

  // Mettre à jour le profil
  updateProfile: async (data) => {
    return fetchWithAuth('/users/utilisateurs/update_profile/', {
      method: 'PATCH',
      body: JSON.stringify(data),
    })
  },

  // Vérifier si l'email est vérifié
  checkEmailVerified: async (email) => {
    return fetchWithAuth(`/users/utilisateurs/check_email_verified/?email=${encodeURIComponent(email)}`, {
      skipAuth: true,
    })
  },

  // Renvoyer l'email de vérification
  resendVerificationEmail: async (email) => {
    return fetchWithAuth('/users/utilisateurs/resend_verification_email/', {
      method: 'POST',
      skipAuth: true,
      body: JSON.stringify({ email }),
    })
  },

  // Demande de réinitialisation de mot de passe
  requestPasswordReset: async (email) => {
    return fetchWithAuth('/users/password-reset-request/', {
      method: 'POST',
      body: JSON.stringify({ email }),
    })
  },

  // Confirmation de réinitialisation de mot de passe
  confirmPasswordReset: async (uid, token, newPassword) => {
    return fetchWithAuth('/users/password-reset-confirm/', {
      method: 'POST',
      body: JSON.stringify({
        uid,
        token,
        new_password: newPassword,
      }),
    })
  },
}

// ===== UTILISATEURS =====

export const userAPI = {
  getUsers: () => fetchWithAuth('/users/utilisateurs/'),
  getUser: (id) => fetchWithAuth(`/users/utilisateurs/${id}/`),
  updateUser: (id, data) => fetchWithAuth(`/users/utilisateurs/${id}/`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  }),
  deleteUser: (id) => fetchWithAuth(`/users/utilisateurs/${id}/`, {
    method: 'DELETE',
  }),
}

// ===== CITOYENS =====

export const citoyenAPI = {
  getCitoyens: () => fetchWithAuth('/users/citoyens/'),
  getCitoyen: (id) => fetchWithAuth(`/users/citoyens/${id}/`),
  createCitoyen: (data) => fetchWithAuth('/users/citoyens/', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  updateCitoyen: (id, data) => fetchWithAuth(`/users/citoyens/${id}/`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  }),
}

export const demandesAPI = {
  getDemandes: () => fetchWithAuth('/demandes/'),
}

// ===== GOOGLE OAUTH =====

export const googleAuthAPI = {
  googleLogin: async (credential) => {
    const response = await fetchWithAuth('/users/google-login/', {
      method: 'POST',
      skipAuth: true,
      body: JSON.stringify({ credential }),
    })

    if (response.tokens) {
      localStorage.setItem('access_token', response.tokens.access)
      localStorage.setItem('refresh_token', response.tokens.refresh)
      const userData = { ...response.user }
      if (response.citoyen) {
        userData.prenom = response.citoyen.prenom || ''
        userData.date_naissance = response.citoyen.date_naissance || ''
        userData.cin = response.citoyen.cin || ''
        userData.adresse = response.citoyen.adresse || ''
      }
      localStorage.setItem('user', JSON.stringify(userData))
    }

    return response
  },
}

// ===== UTILITAIRES =====

export const isAuthenticated = () => {
  return !!localStorage.getItem('access_token')
}

export const getCurrentUser = () => {
  const user = localStorage.getItem('user')
  return user ? JSON.parse(user) : null
}

export default {
  auth: authAPI,
  users: userAPI,
  citoyens: citoyenAPI,
  google: googleAuthAPI,
  isAuthenticated,
  getCurrentUser,
}

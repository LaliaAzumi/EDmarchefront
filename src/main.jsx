import React from 'react'

import ReactDOM from 'react-dom/client'

import { GoogleOAuthProvider } from '@react-oauth/google'

import App from './App.jsx'

import './index.css'



// Remplacez par votre Client ID Google OAuth

const GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID'



ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>

    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>

      <App />

    </GoogleOAuthProvider>

  </React.StrictMode>,

)


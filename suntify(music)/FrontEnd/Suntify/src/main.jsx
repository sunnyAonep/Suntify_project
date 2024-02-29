import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import UserProvider from './context/UserProvider.jsx'
import AudioProvider from './context/AudioProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
    <AudioProvider>
    <App />
    </AudioProvider>
    </UserProvider>
  </React.StrictMode>
)

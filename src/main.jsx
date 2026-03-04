import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './global.css'
import App from './App.jsx'

import './assets/fonts/tanker/tanker.css';
import './assets/fonts/boska/boska.css';
import './assets/fonts/general-sans/general-sans.css';
import './assets/fonts/poppins/poppins.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

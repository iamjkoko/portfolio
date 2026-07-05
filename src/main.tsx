import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './global.css'
import App from './App'

// Only the font families actually used by the site are imported.
// Unused families (tanker, poppins, satoshi) remain in src/assets/fonts for future use.
import './assets/fonts/boska/boska.css';
import './assets/fonts/general-sans/general-sans.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

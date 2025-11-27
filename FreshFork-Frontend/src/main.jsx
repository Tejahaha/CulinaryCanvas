import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './ThemeContext' // Import ThemeProvider

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <StrictMode>
    <ThemeProvider> {/* Wrap the App component */}
      <App />
    </ThemeProvider>
  </StrictMode>
  </BrowserRouter>,
)

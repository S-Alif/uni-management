import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import routes from './routes/routes'
import { ThemeProvider } from './components/ThemeSwitcher/ThemeProvider'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider defaultTheme='system' storageKey='vite-ui-theme'>
      <RouterProvider router={routes} />
    </ThemeProvider>
  </StrictMode>,
)

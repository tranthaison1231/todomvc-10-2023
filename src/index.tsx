import { createRoot } from 'react-dom/client'
import App from './App'

const theme = localStorage.getItem('theme')
if (theme === 'dark') {
  document.documentElement.classList.add('dark')
}

const root = createRoot(document.getElementById('root')!)
root.render(<App />)

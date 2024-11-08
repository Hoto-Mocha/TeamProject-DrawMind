import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Layout from './Layout.jsx'
import './css/Main.css'

createRoot(document.getElementById('root')).render(
  <Layout>
    <App />
  </Layout>
)

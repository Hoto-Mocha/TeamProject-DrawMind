import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App.jsx'
import Layout from './Layout.jsx'
import Login from './Login.jsx'
import Register from './Register.jsx'
import Write from './Write.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
    <Layout />
    <Routes>
      <Route path='/' element={<App />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/register' element={<Register />}></Route>
      <Route path='/write' element={<Write />}></Route>
    </Routes>
  </BrowserRouter >
)

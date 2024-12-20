import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App.jsx'
import Layout from './components/common/Layout.jsx'
import Login from './pages/login/Login.jsx'
import Register from './pages/register/Register.jsx'
import Write from './pages/write/Write.jsx'
import InfoEdit from './pages/infoEdit/InfoEdit.jsx'
import Edit from './pages/edit/Edit.jsx'
import ContentView from './pages/contentview/ContentView.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
    <Layout>
      <Routes>
        <Route path='/' element={<App />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/write' element={<Write />}></Route>
        <Route path='/edit' element={<Edit />}></Route>
        <Route path='/infoEdit' element={<InfoEdit />}></Route>
        <Route path='/contentview/:postSeq' element={<ContentView />}></Route>
      </Routes>
    </Layout>
  </BrowserRouter >
)

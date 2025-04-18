import {  Routes, Route } from 'react-router-dom'
import Home from './components/clients/home'
import Login from './components/auth/login'
import Dashboard from './components/admin/Dashboard'
import Users from './pages/Users'
import Notifie from './pages/Notifications'
import DashboardHome from './components/admin/DashboardHome'
import DocumentForm from './components/forms/DocumentForm'
import Confirmation from './components/clients/Confirmation'
import Profile from './pages/Profile'

export default function App() {
  return (
    <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/demande/:serviceType" element={<DocumentForm />} />
          <Route path="login" element = { <Login /> }/>
          
           {/*<Route path="*" element={<Navigate to="/" />} />*/}

          <Route path="admin" element={<Dashboard />}>
            <Route index element={<DashboardHome />} />
            <Route path="notifications" element={<Notifie />} />
            <Route path="utilisateurs" element={<Users />} />
            <Route path="profile" element={<Profile />} />
    
          </Route>

          <Route>
            <Route path='naissance' element={<DocumentForm serviceType="naissance"/>} />
            <Route path='mariage' element={<DocumentForm serviceType="mariage"/>} />
            <Route path='decès' element={<DocumentForm serviceType="decès"/>} />
            <Route path='copie' element={<DocumentForm serviceType="copie"/>} />
            <Route path='cin' element={<DocumentForm serviceType="cin"/>} />
            <Route path='divorce' element={<DocumentForm serviceType="divorce"/>} />
            <Route path='legalise' element={<DocumentForm serviceType="legalise"/>} />
          </Route>

          <Route path="/confirmation" element={<Confirmation />} />
      </Routes>
    </div>
  )
}

import React, { useEffect } from 'react'
import NavBar from './components/navBar.jsx'
import HomePage from './pages/HomePage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SettingsPage from './pages/SettingsPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import {Loader} from 'lucide-react'
import {Route, Routes, Navigate} from 'react-router-dom'
import { axiosInstance } from './lib/axios.js'
import { useAuthStore } from './store/useAuthStore.js'

const App = () => {
  axiosInstance
  const {authUser, checkAuth, isCheckingAuth} = useAuthStore()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  if(isCheckingAuth && authUser) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader className="size-10 animate-spin"/>
      </div>
    );
  }

  return (
      <div>
        <NavBar />
        <Routes>
          <Route path='/' element={ authUser ? <HomePage/> : <Navigate to="/login" />}/>
          <Route path='/signup' element={ !authUser ? <SignUpPage/> : <Navigate to="/"/>}/>
          <Route path='/login' element={ !authUser ? <LoginPage/> : <Navigate to="/"/>  }/>
          <Route path='/settings' element={<SettingsPage/>}/ >
          <Route path='/profile' element={  authUser ? <ProfilePage/> : <Navigate to="/login"/>}/>
        </Routes>
      </div>
  )
}

export default App
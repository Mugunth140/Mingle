import  { useEffect , React } from 'react'
import Navbar from './components/Navbar'
import  { Routes, Route, Navigate } from 'react-router-dom'
import HomePage  from './pages/HomePage'
import SignupPage from './pages/SignupPage'
import LoginPage  from './pages/LoginPage'
import SettingPage  from './pages/SettingPage'
import ProfilePage  from './pages/ProfilePage'

import { useAuthStore } from './store/useAuthStore'
import Loader from "react-js-loader";
import {Toaster} from "react-hot-toast";

const App = () => {
 
const { AuthCheck, isChecking, authUser} = useAuthStore()
useEffect(() => {
  AuthCheck()
},[AuthCheck])

if(isChecking && !authUser) return (
  <div className='flex justify-center items-center h-screen'>
     <Loader type="spinner-cub" size={30} className='bg-white'/>
  </div>
)

  return (
    <>
   <div>
    <Navbar />
    <Routes >
      <Route path='/' element={authUser ? <HomePage /> : <Navigate to="/login" />} />
      <Route path='/signup' element={!authUser ? <SignupPage/> : <Navigate to="/" />} />
      <Route path='/login' element={ !authUser ? <LoginPage /> : <Navigate to="/" />} />
      <Route path='/Settings' element={<SettingPage />} />
      <Route path='/Profile' element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
    </Routes>
    <Toaster />
   </div>
    </>
  )
}

export default App
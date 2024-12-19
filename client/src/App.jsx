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

const loaderStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform : "translate(-50%, -50%)",
}

if(isChecking && !authUser) return (
  <div style={loaderStyle}>
     <Loader type="spinner-cub" size={30} />
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
      <Route path='/settings' element={<SettingPage />} />
      <Route path='/profile' element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
    </Routes>
    <Toaster />
   </div>
    </>
  )
}

export default App
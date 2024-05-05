
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import VerifyEmail from './pages/VerifyEmail'
import Forgot from './pages/Forgot'
import Change from './pages/Change'
import OpenRoute from './component/openRoute'
import PrivateRoute from './component/privateRoute'
import Log from './pages/Login'
import Sign from './pages/Signup'


function App() {
 
  return (
    <>
     <Routes>
      <Route path="/" 
      element={
      <PrivateRoute>
      <Home/>
      </PrivateRoute>
      }/>
      <Route path="/login" element={
       <OpenRoute>
        <Log/>
      </OpenRoute>
       }/>
       <Route path="/sign-up" element={
       <OpenRoute>
        <Sign/>
       </OpenRoute>
       }/>
      <Route path="/verify-email" element={
      <OpenRoute>
      <VerifyEmail/>
      </OpenRoute>
      }/>
      <Route path="/forgot-password" element={
      <OpenRoute>
      <Forgot/>
      </OpenRoute>
      }/>
      <Route path="update-password/:token" element={
      <OpenRoute>
      <Change/>
     </OpenRoute>
      }/>
    </Routes>
    </>
  )
}

export default App

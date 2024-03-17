import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import ThankYou from '../pages/ThankYou'
import Home from './../pages/Home'
import Login from './../pages/Login'
import Register from './../pages/Register'
import SearchResultList from './../pages/SearchResultList'
import TourDetails from './../pages/TourDetails'
import Tours from './../pages/Tours'
import UpdateUser from './../pages/UpdateUser'
import About from '../pages/About'
import Bookings from '../pages/Bookings'
import AddTour from '../pages/AddTour'
import UpdateTour from '../pages/UpdateTour'
import AllUser from '../pages/AllUser'
import ResetPassword from '../pages/ResetPassword'
import ForgotPassword from '../pages/ForgotPasswords'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const AdminRoutes = () => {
    const { user, dispatch } = useContext(AuthContext)
   return (
      
         <Routes>
         <Route path='/AddTour' element={<AddTour/>} />
         <Route path='/UpdateTour' element={<UpdateTour/>} />
         <Route path='/AllUser' element={<AllUser/>} />
         </Routes>
      
  )
}

export default AdminRoutes
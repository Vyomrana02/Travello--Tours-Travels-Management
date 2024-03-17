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
import Unverified from '../pages/Unverified'

const NoLoginRoutes = () => {
    return (<Routes>
        <Route path='/' element={<Navigate to='/home' />} />
        <Route path='/home' element={<Home />} />
        <Route path='/tours' element={<Tours />} />
        <Route path='/tours/:id' element={<TourDetails />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/tours/search' element={<SearchResultList />} />
        <Route path='/About' element={<About />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password/:id/:token' element={<ResetPassword />} />
        <Route path='/link-notverify' element={<Unverified/>} />
    </Routes>
    )
}

export default NoLoginRoutes
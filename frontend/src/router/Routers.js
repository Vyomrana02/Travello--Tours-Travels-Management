import React from 'react'
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom'
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
import BounceLoader from 'react-spinners/BounceLoader'

const NoLoginRoutes = React.lazy(() => import("./NoLoginRoutes"));
const AdminRoutes = React.lazy(() => import("./AdminRoutes"));
const UserRoutes = React.lazy(() => import("./UserRoutes"));
const CommonRoutes = React.lazy(()=>import("./CommonRoutes"));

const Routers = () => {
   const { user, dispatch } = useContext(AuthContext)
   return (
      <>
       
            {user == null ? <>
               <NoLoginRoutes />
            </>
               : (user.roles === 'admin' ?
                  <>
                     <NoLoginRoutes />
                     <AdminRoutes />
                     <CommonRoutes/>
                     </>
                  :
                  <>
                     <NoLoginRoutes />
                     <UserRoutes />
                     <CommonRoutes/>
                  </>
               )}
         </>
   )
}

export default Routers

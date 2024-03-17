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
      //       <Routes>
      //          {user == null ? <>
      // <Route path='/' element={<Navigate to='/home'/>} />
      // <Route path='/home' element={<Home/>} />
      // <Route path='/tours' element={<Tours/>} />
      // <Route path='/tours/:id' element={<TourDetails/>} />
      // <Route path='/login' element={<Login/>} />
      // <Route path='/register' element={<Register/>} />
      // <Route path='/tours/search' element={<SearchResultList/>} />
      // <Route path='/About' element={<About/>} />
      // </>
      //          : (user.roles === 'admin' ? 
      //          <>
      //          <Route path='/AddTour' element={<AddTour/>} />
      //          <Route path='/UpdateTour' element={<UpdateTour/>} />
      //          <Route path='/AllUser' element={<AllUser/>} />
      //          <Route path='/bookings' element={<Bookings/>} />
      //          </>
      //          :
      //          <>
      //          <Route path='/thank-you' element={<ThankYou/>} />
      //          <Route path='/update-user' element={<UpdateUser/>} />
      //          <Route path='/forgot-password' element={<ForgotPassword/>} />
      //          <Route path='/reset-password/:id/:token' element={<ResetPassword/>} />
      //          </>
      //          )  }
      //       </Routes>

      // <BrowserRouter>
      <>
       {/* <React.Suspense fallback={<BounceLoader color="#faa935"  cssOverride={{
    textAlign: 'center',position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)"
  }}/>}>  */}
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
          {/* </React.Suspense> */}
         </>
   )
}

export default Routers

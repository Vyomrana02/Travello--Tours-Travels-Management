import React from 'react'
import Header from './../Header/Header'
import Routers from '../../router/Routers'
import Footer from './../Footer/Footer'
import { Suspense } from 'react'
import BounceLoader from 'react-spinners/BounceLoader'
const Layout = () => {
   return (
      <>
      <React.Suspense fallback={<BounceLoader color="#faa935"  cssOverride={{
    textAlign: 'center',position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)"
  }}/>}> 
         <Header />
         <Routers />
         <Footer />      
         </React.Suspense>
      </>
   )
}

export default Layout
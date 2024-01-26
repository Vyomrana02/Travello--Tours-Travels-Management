import React, { useState, useEffect, useContext } from 'react'
import CommonSection from '../shared/CommonSection'
// import tourData from '../assets/data/tours'
import '../styles/tour.css'
import TourCard from './../shared/TourCard'
import SearchBar from './../shared/SearchBar'
import Newsletter from './../shared/Newsletter'
import { Col, Container, Row } from 'reactstrap'
import useFetch from '../hooks/useFetch'
import { BASE_URL } from '../utils/config'
import { AuthContext } from '../context/AuthContext'
import {Button} from 'reactstrap'
import { Link, useNavigate } from 'react-router-dom'
const Tours = () => {
   const [pageCount, setPageCount] = useState(0)
   const [page, setPage] = useState(0)
   const { user, dispatch } = useContext(AuthContext)
   const { data: tours, loading, error } = useFetch(`${BASE_URL}/tours?page=${page}`)
   const { data: tourCount } = useFetch(`${BASE_URL}/tours/search/getTourCount`)

   useEffect(() => {
      const pages = Math.ceil(tourCount / 8)
      setPageCount(pages)
      window.scrollTo(0, 0)
   }, [page, tourCount, tours])

   const navigate = useNavigate();
   const AddTour = () => {
      navigate("/addTour");
   }
   return (
      <>
         <CommonSection title={"All Tours"} />

         <section>
         <Container>
            <Col>
               <Row>
                  <SearchBar />
         {user && user.roles === 'admin' ?
                  <Button onClick={AddTour}>Add Tour</Button>
                  : 
                  <></>}
               </Row>
            </Col>
         </Container>
      </section>
         
         <section className='pt-0'>
            <Container>
               {loading && <h4 className='text-center pt-5'>LOADING..........</h4>}
               {error && <h4 className='text-center pt-5'>{error}</h4>}
               {
                  !loading && !error &&
                  <Row>
                     {
                        tours?.map(tour => (<Col lg='3' md='6' sm='6' className='mb-4' key={tour._id}> <TourCard tour={tour} /> </Col>))
                     }

                     <Col lg='12'>
                        <div className="pagination d-flex align-items-center justify-content-center mt-4 gap-3">
                           {[...Array(pageCount).keys()].map(number => (
                              <span key={number} onClick={() => setPage(number)}
                                 className={page === number ? 'active__page' : ''}
                              >
                                 {number + 1}
                              </span>
                           ))}
                        </div>
                     </Col>
                  </Row>
               }
            </Container>
         </section>
         <Newsletter />
      </>
   )
}

export default Tours
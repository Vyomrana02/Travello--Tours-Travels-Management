// import React, { useState, useRef, useEffect, useContext } from 'react'
// import '../styles/tour-details.css'
// // import tourData from '../assets/data/tours'
// import { Container, Row, Col, Form, ListGroup } from 'reactstrap'
// import {  useNavigate, useParams } from 'react-router-dom'
// import calculateAvgRating from '../utils/avgRating'
// import avatar from '../assets/images/avatar.jpg'
// import Booking from '../components/Booking/Booking'
// import Newsletter from '../shared/Newsletter'
// import useFetch from '../hooks/useFetch'
// import { BASE_URL } from '../utils/config'
// import { AuthContext } from '../context/AuthContext'
// // import { Rating } from '@mui/material';
// import ReactStars from 'react-rating-stars-component'
// import {Button} from 'reactstrap'
// const TourDetails = () => {
//    const { id } = useParams()
//    const reviewMsgRef = useRef('')
//    const [tourRating, setTourRating] = useState(null)
//    const { user } = useContext(AuthContext)

//    // fetch data from database
//    const { data: tour, loading, error } = useFetch(`${BASE_URL}/tours/${id}`)

//    const { photo, title, desc, price, reviews, city, address, distance, maxGroupSize } = tour

//    const { avgRating } = calculateAvgRating(reviews)

//    const options = { day: 'numeric', month: 'long', year: 'numeric' }

//    const navigate = useNavigate();

//    const submitHandler = async e => {
//       e.preventDefault()
//       const reviewText = reviewMsgRef.current.value

//       try {
//          if (!user || user === undefined || user === null) {
//             alert('Please sign in')
//          }
//          const reviewObj = {
//             username: user?.username,
//             reviewText,
//             rating: tourRating
//          }

//          const res = await fetch(`${BASE_URL}/review/${id}`, {
//             method: 'post',
//             headers: {
//                'content-type': 'application/json'
//             },
//             credentials: 'include',
//             body: JSON.stringify(reviewObj)
//          })

//          const result = await res.json()
//          if (!res.ok) {
//             return alert(result.message)
//          }
//          window.location.reload();
//       } catch (error) {
//          alert(error.message)
//       }
//    }

//    const UpdateTour = () => {
//       localStorage.setItem("UpdatingTour",tour._id)
//       navigate(`/UpdateTour`,{state:tour})
//    }
//    useEffect(() => {
//       window.scrollTo(0, 0)
//    }, [tour])

//    const ratingChanged = (newRating) => {
//       console.log(newRating);
//       setTourRating(newRating)
//    };

//    const DeleteTour = async () =>{
//       try {
//          console.log(tour);
//          const res = await fetch(`${BASE_URL}/tours/${tour._id}`, {
//             method:'delete',
//             credentials:'include'
//          })

//          const result = res.json()
//          console.log(result)
//         //  if(!res.ok) alert(result.message)

//       //   setTour(result)
//          navigate('/tours')
//       } catch(err) {
//         console.log(err.message)
//          alert(err.message)
//       }
//    }
//    return (
//       <section>
//          <Container>
//             {loading && <h4 className='text-center pt-5'>LOADING.........</h4>}
//             {error && <h4 className='text-center pt-5'>{error}</h4>}
//             {
//                !loading && !error &&
//                <Row>
//                   <Col lg={user ? ((user.roles==='user')? 8 : 12 ): 12}>
//                      <div className="tour__content">
//                         <img src={photo} alt="" />
//                         {/* {user.roles === 'admin' ?
//                   <Button onClick={AddTour}>Add Tour</Button>
//                   : 
//                   <></>} */}
//                   {/* {(user && user.roles === 'admin' ?  <Button onClick={AddTour}>Add Tour</Button> : <></>)} */}
//                   {(user ? 
//                                     (user.roles==='admin'?
//                                        // <div className="review__input">
//                                        //    <input type="text" ref={reviewMsgRef} placeholder='share your thoughts' required />
//                                        //    <button className='btn primary__btn text-white' type='submit'>
//                                        //       Submit
//                                        //    </button>
//                                        // </div>
//                                        <>
//                                        <Container>
//                                        <p><Button onClick={UpdateTour}>Update Tour</Button>       <Button onClick={DeleteTour}>Delete Tour</Button>  
//                                        </p>
//                                        </Container></>:
//                                         <></>):
//                                        <></>)
//                                  }
//                         <div className="tour__info">
//                            <h2>{title}</h2>
//                            <div className="d-flex align-items-center gap-5">
//                               <span className="tour__rating d-flex align-items-center gap-1">
//                                  <i className='ri-star-fill' style={{ 'color': 'var(--secondary-color)' }}></i> {avgRating === 0 ? null : avgRating}
//                                  {avgRating === 0 ? ('Not rated') : (<span>({reviews?.length})</span>)}
//                               </span>

//                               <span><i className='ri-map-pin-fill'></i> {address}</span>
//                            </div>

//                            <div className="tour__extra-details">
//                               <span><i className='ri-map-pin-2-line'></i> {city}</span>
//                               <span> ₹{price}/ per person</span>

//                               <span><i className='ri-map-pin-time-line'></i> {distance} k/m</span>
//                               <span><i className='ri-group-line'></i> {maxGroupSize} people</span>
//                            </div>
//                            <h5>Description</h5>
//                            <p>{desc}</p>
//                         </div>

//                         {/* ============ TOUR REVIEWS SECTION START ============ */}
//                         <div className="tour__reviews mt-4">
//                            <h4>Reviews ({reviews?.length} reviews)</h4>

//                            <Form onSubmit={submitHandler}>
//                               <div className="d-flex align-items-center gap-3 mb-4 rating__group">
//                                  <ReactStars
//                                     count={5}
//                                     onChange={ratingChanged}
//                                     size={24}
//                                     activeColor="#ffd700"
//                                  />
//                               </div>
//                                  {(user ? 
//                                     (user.roles==='user'?
//                                        <div className="review__input">
//                                           <input type="text" ref={reviewMsgRef} placeholder='share your thoughts' required />
//                                           <button className='btn primary__btn text-white' type='submit'>
//                                              Submit
//                                           </button>
//                                        </div> :
//                                         <></>):
//                                        <></>)
//                                  }
//                            </Form>

//                            <ListGroup className='user__reviews'>
//                               {
//                                  reviews?.map(review => (
//                                     <div className="review__item">
//                                        <img src={avatar} alt="" />

//                                        <div className="w-100">
//                                           <div className="d-flex align-items-center justify-content-between">
//                                              <div>
//                                                 <h5>{review.username}</h5>
//                                                 <p>{new Date(review.createdAt).toLocaleDateString('en-US', options)}</p>
//                                              </div>

//                                              <span className='d-flex align-items-center'>
//                                                 {review.rating}<i className='ri-star-s-fill'></i>
//                                              </span>
//                                           </div>

//                                           <h6>{review.reviewText}</h6>
//                                        </div>
//                                     </div>
//                                  ))
//                               }
//                            </ListGroup>
//                         </div>
//                         {/* ============ TOUR REVIEWS SECTION END ============== */}
//                      </div>
//                   </Col>

//                   {(user ? ((user.roles ==='user')?
//                      <Col lg='4'>
//                         <Booking tour={tour} avgRating={avgRating} />
//                      </Col>
//                   :
//                   <></>)                 
//                   :
//                   <></>)}
//                </Row>
//             }
//          </Container>
//          <Newsletter />
//       </section>

//    )
//    // return (
//    //    <>Hello</>
//    // )
// }

// export default TourDetails

import React, { useState, useRef, useEffect, useContext } from 'react'
import '../styles/tour-details.css'
// import tourData from '../assets/data/tours'
import { Container, Row, Col, Form, ListGroup, Card, CardHeader, CardBody, Table } from 'reactstrap'
import { useNavigate, useParams } from 'react-router-dom'
import calculateAvgRating from '../utils/avgRating'
import avatar from '../assets/images/avatar.jpg'
import Booking from '../components/Booking/Booking'
import Newsletter from '../shared/Newsletter'
import useFetch from '../hooks/useFetch'
import { BASE_URL } from '../utils/config'
import { AuthContext } from '../context/AuthContext'
// import { Rating } from '@mui/material';
import ReactStars from 'react-rating-stars-component'
import { Button } from 'reactstrap'
import { ToastContainer, toast } from 'react-toastify';


const TourDetails = () => {
   const { id } = useParams()
   const reviewMsgRef = useRef('')
   const [tourRating, setTourRating] = useState(null)
   const { user } = useContext(AuthContext)

   // fetch data from database
   const { data: tour, loading, error } = useFetch(`${BASE_URL}/tours/${id}`)

   const { photo, title, desc, price, reviews, city, address, distance, maxGroupSize } = tour

   const { totalRating, avgRating } = calculateAvgRating(reviews)

   const options = { day: 'numeric', month: 'long', year: 'numeric' }
   let weather = {
      apiKey : "899775a68a9f80c7844d1b62fd302bec"
      // apiKey:"778113253df220e699096e92647c38be"
      // apiKey: "3bf45b9ce7d9a207528130a07aa6bf45"

  }
//   https://home.openweathermap.org/api_keys


  const [weatherData,setWeatherData] = useState([]);
  var aryDates = [];
  function GetDates(startDate, daysToAdd) {

   for (var i = 0; i <= daysToAdd; i++) {
       var currentDate = new Date();
       currentDate.setDate(startDate.getDate() + i);
       aryDates.push(DayAsString(currentDate.getDay()) + ", " + currentDate.getDate() + " " + MonthAsString(currentDate.getMonth()));
   }

   return aryDates;
}

function MonthAsString(monthIndex) {
   var d = new Date();
   var month = new Array();
   month[0] = "January";
   month[1] = "February";
   month[2] = "March";
   month[3] = "April";
   month[4] = "May";
   month[5] = "June";
   month[6] = "July";
   month[7] = "August";
   month[8] = "September";
   month[9] = "October";
   month[10] = "November";
   month[11] = "December";

   return month[monthIndex];
}

function DayAsString(dayIndex) {
   var weekdays = new Array(7);
   weekdays[0] = "Sunday";
   weekdays[1] = "Monday";
   weekdays[2] = "Tuesday";
   weekdays[3] = "Wednesday";
   weekdays[4] = "Thursday";
   weekdays[5] = "Friday";
   weekdays[6] = "Saturday";

   return weekdays[dayIndex];
}

  function getWeatherData(latitude, longitude, units, unitdeg, unitspeed){
      
   fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=${units}&appid=${weather.apiKey}`).then((rep)=>{
       return rep.json();
   }).then((rep)=>{
       const weatherdata = rep;
       setWeatherData(weatherdata.daily)
       console.log(weatherdata.daily)
      //  showweatherdata(weatherdata, unitdeg, unitspeed)
   }).catch(()=>{
       console.log("error")
   })
   
}

  useEffect(()=>{
   fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weather.apiKey}`).then((resp)=>{
        if(resp.ok){
            return resp.json();
        }        
    }).then((resp)=>{
      console.log(city)
        console.log(resp);

      //   cityName.textContent = resp.name;
        console.log(resp.coord.lat)
              getWeatherData(resp.coord.lat,resp.coord.lon,"metric","c","mt/s");
        
    }).catch((err)=>{
        console.log("something got error",err);
    })
    
  })
   const navigate = useNavigate();
   const submitHandler = async e => {
      e.preventDefault()
      const reviewText = reviewMsgRef.current.value

      try {
         if (!user || user === undefined || user === null) {
            alert('Please sign in')
         }
         
         const reviewObj = {
            userEmail: user.email,
            username: user?.username,
            reviewText,
            rating: tourRating
         }
         // var userbookings =  await fetch(`${BASE_URL}/booking/${user.email}`, {
         //       method: 'get',
         //       headers: {
         //          'content-type': 'application/json'
         //       },
         //       credentials: 'include',
         //    })
         //    const result = await userbookings.json()
         //    console.log(result)
         const res = await fetch(`${BASE_URL}/review/${id}`, {
            method: 'post',
            headers: {
               'content-type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(reviewObj)
         })

         const result = await res.json()

         if (!res.ok) {
            window.scroll({
               top: 0, 
               left: 0, 
               behavior: 'smooth' 
              });
            
            toast(result.message + ' 😊', {
               position: "top-center",
               autoClose: 3000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: false,
               draggable: true,
               progress: undefined,
               theme: "dark",
            });
            return 
         }
         window.scroll({
            top: 0, 
            left: 0, 
            behavior: 'smooth' 
           });
         
         toast('🙏🏼 We appreciate your review! 😊', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "dark",
         });
         
         const refresing = ()  => {
            window.location.reload();
         }
         setTimeout(refresing, 3000);
      } catch (error) {
         alert(error.message)
      }
   }

   const UpdateTour = () => {
      localStorage.setItem("UpdatingTour", tour._id)
      navigate(`/UpdateTour`, { state: tour })
   }
   useEffect(() => {
      window.scrollTo(0, 0)
   }, [tour])

   const ratingChanged = (newRating) => {
      console.log(newRating);
      setTourRating(newRating)
   };

   const DeleteTour = async () => {
      var answer = window.confirm("Are you sure you want to Delete Tour?");
      if (answer) {
         try {
            console.log(tour);
            const res = await fetch(`${BASE_URL}/tours/${tour._id}`, {
               method: 'delete',
               credentials: 'include'
            })

            const result = res.json()
            console.log(result)
            //  if(!res.ok) alert(result.message)

            //   setTour(result)
            navigate('/tours')
         } catch (err) {
            console.log(err.message)
            alert(err.message)
         }
      }
      else {
         
      }

   }
   
   aryDates = GetDates(new Date(), 7)
   return (
      <section>
          <ToastContainer
               position="top-center"
               autoClose={5000}
               hideProgressBar={false}
               newestOnTop
               closeOnClick
               rtl={false}
               pauseOnFocusLoss
               draggable
               pauseOnHover={false}
               theme="colored"
            />
         <Container>
            <Row>
               <Col>
            <div className="tour__info mb-4">
                  <p><b>Next 7 Days Weather Prediction</b><br></br></p>
                        {console.log(aryDates)}
                        <Row>
                        {aryDates.map((aryDate, i) => <Col>{aryDate}</Col>)}
                        </Row>
                        <br></br>
                        <Row>
                          
                          {/* </Row>{((weatherData && weatherData.length !== 0) ?
                           //<> */}
                           <Col>{weatherData[0]?.weather[0]?.description}</Col>
                           <Col>{weatherData[1]?.weather[0]?.description}</Col>
                           <Col>{weatherData[2]?.weather[0]?.description}</Col>
                           <Col>{weatherData[3]?.weather[0]?.description}</Col>
                           <Col>{weatherData[4]?.weather[0]?.description}</Col>
                           <Col>{weatherData[5]?.weather[0]?.description}</Col>
                           <Col>{weatherData[6]?.weather[0]?.description}</Col>
                           <Col>{weatherData[7]?.weather[0]?.description}</Col>
                           {/* </> :
                           <></>)
                        } */}
                        </Row>
                  </div>
                  </Col>
            </Row>
            {loading && <h4 className='text-center pt-5'>LOADING.........</h4>}
            {error && <h4 className='text-center pt-5'>{error}</h4>}
            {
               !loading && !error &&
               <Row>
                  <Col lg={user ? ((user.roles === 'user') ? 8 : 12) : 12}>
                     <div className="tour__content">
                        <img src={photo} alt="" />
                        {/* {user.roles === 'admin' ?
                  <Button onClick={AddTour}>Add Tour</Button>
                  : 
                  <></>} */}
                        {/* {(user && user.roles === 'admin' ?  <Button onClick={AddTour}>Add Tour</Button> : <></>)} */}
                        {(user ?
                           (user.roles === 'admin' ?
                              // <div className="review__input">
                              //    <input type="text" ref={reviewMsgRef} placeholder='share your thoughts' required />
                              //    <button className='btn primary__btn text-white' type='submit'>
                              //       Submit
                              //    </button>
                              // </div>
                              <>
                                 <Container>
                                    <p><Button onClick={UpdateTour}>Update Tour</Button>       <Button onClick={DeleteTour}>Delete Tour</Button>
                                    </p>
                                 </Container></> :
                              <></>) :
                           <></>)
                        }
                        <div className="tour__info">
                           <h2>{title}</h2>
                           <div className="d-flex align-items-center gap-5">
                              <span className="tour__rating d-flex align-items-center gap-1">
                                 <i class='ri-star-fill' style={{ 'color': 'var(--secondary-color)' }}></i> {avgRating === 0 ? null : avgRating}
                                 {avgRating === 0 ? ('Not rated') : (<span>({reviews?.length})</span>)}
                              </span>

                              <span><i class='ri-map-pin-fill'></i> {address}</span>
                           </div>

                           <div className="tour__extra-details">
                              <span><i class='ri-map-pin-2-line'></i> {city}</span>
                              <span> ₹{price}/ per person</span>

                              <span><i class='ri-map-pin-time-line'></i> {distance} k/m</span>
                              <span><i class='ri-group-line'></i> {maxGroupSize} people</span>
                           </div>
                           <h5>Description</h5>
                           <p>{desc}</p>
                        </div>

                        {/* ============ TOUR REVIEWS SECTION START ============ */}
                        <div className="tour__reviews mt-4">
                           <h4>Reviews ({reviews?.length} reviews)</h4>

                           <Form onSubmit={submitHandler}>
                              <div className="d-flex align-items-center gap-3 mb-4 rating__group">
                                 {/* <span onClick={() => setTourRating(1)}>1 <i class='ri-star-s-fill'></i></span>
         <span onClick={() => setTourRating(2)}>2 <i class='ri-star-s-fill'></i></span>
         <span onClick={() => setTourRating(3)}>3 <i class='ri-star-s-fill'></i></span>
         <span onClick={() => setTourRating(4)}>4 <i class='ri-star-s-fill'></i></span>
         <span onClick={() => setTourRating(5)}>5 <i class='ri-star-s-fill'></i></span> */}
                                 <ReactStars
                                    count={5}
                                    onChange={ratingChanged}
                                    size={24}
                                    activeColor="#ffd700"
                                 />
                              </div>
                              {(user ?
                                 (user.roles === 'user' ?
                                    <div className="review__input">
                                       <input type="text" ref={reviewMsgRef} placeholder='share your thoughts' required />
                                       <button className='btn primary__btn text-white' type='submit'>
                                          Submit
                                       </button>
                                    </div> :
                                    <></>) :
                                 <></>)
                              }
                           </Form>

                           <ListGroup className='user__reviews'>
                              {
                                 reviews?.map(review => (
                                    <div className="review__item">
                                       <img src={avatar} alt="" />

                                       <div className="w-100">
                                          <div className="d-flex align-items-center justify-content-between">
                                             <div>
                                                <h5>{review.username}</h5>
                                                <p>{new Date(review.createdAt).toLocaleDateString('en-US', options)}</p>
                                             </div>

                                             <span className='d-flex align-items-center'>
                                                {review.rating}<i class='ri-star-s-fill'></i>
                                             </span>
                                          </div>

                                          <h6>{review.reviewText}</h6>
                                       </div>
                                    </div>
                                 ))
                              }
                           </ListGroup>
                        </div>
                        {/* ============ TOUR REVIEWS SECTION END ============== */}
                     </div>
                  </Col>

                  {(user ? ((user.roles === 'user') ?
                     <Col lg='4'>
                        <Booking tour={tour} avgRating={avgRating} />
                     </Col>
                     :
                     <></>)
                     :
                     <></>)}
               </Row>
            }
         </Container>
         <Newsletter />
      </section>

   )
   // return (
   //    <section>
   //       <Container>
   //          {loading && <h4 className='text-center pt-5'>LOADING.........</h4>}
   //          {error && <h4 className='text-center pt-5'>{error}</h4>}
   //          {
   //             !loading && !error &&
   //             <Row>
   //                <Col lg={user ? ((user.roles === 'user') ? 8 : 12) : 12}>
   //                   <div className="tour__content">
   //                      <img src={photo} alt="" />
   //                      {(user ?
   //                         (user.roles === 'admin' ?
   //                            <Container>
   //                               <p><Button onClick={UpdateTour}>Update Tour</Button>       <Button onClick={DeleteTour}>Delete Tour</Button>
   //                               </p>
   //                            </Container> :
   //                            <></>) :
   //                         <></>)
   //                      }
   //                      <div className="tour__info">
   //                         <h2>{title}</h2>
   //                         <div className="d-flex align-items-center gap-5">
   //                            <span className="tour__rating d-flex align-items-center gap-1">
   //                               <i class='ri-star-fill' style={{ 'color': 'var(--secondary-color)' }}></i> {avgRating === 0 ? null : avgRating}
   //                               {avgRating === 0 ? ('Not rated') : (<span>({reviews?.length})</span>)}
   //                            </span>
   //                            <span><i class='ri-map-pin-fill'></i> {address}</span>
   //                         </div>
   //                      </div>
   //                      <div className="tour__extra-details">
   //                         <span><i class='ri-map-pin-2-line'></i> {city}</span>
   //                         <span> ₹{price}/ per person</span>

   //                         <span><i class='ri-map-pin-time-line'></i> {distance} k/m</span>
   //                         <span><i class='ri-group-line'></i> {maxGroupSize} people</span>
   //                      </div>
   //                      <h5>Description</h5>
   //                      <p>{desc}</p>
   //                   </div>


   //                   <div className="tour__reviews mt-4">
   //                      <h4>Reviews ({reviews?.length} reviews)</h4>

   //                      <Form onSubmit={submitHandler}>
   //                         <div className="d-flex align-items-center gap-3 mb-4 rating__group">
   //                            {/* <span onClick={() => setTourRating(1)}>1 <i class='ri-star-s-fill'></i></span>
   //                               <span onClick={() => setTourRating(2)}>2 <i class='ri-star-s-fill'></i></span>
   //                               <span onClick={() => setTourRating(3)}>3 <i class='ri-star-s-fill'></i></span>
   //                               <span onClick={() => setTourRating(4)}>4 <i class='ri-star-s-fill'></i></span>
   //                               <span onClick={() => setTourRating(5)}>5 <i class='ri-star-s-fill'></i></span> */}
   //                            <ReactStars
   //                               count={5}
   //                               onChange={ratingChanged}
   //                               size={24}
   //                               activeColor="#ffd700"
   //                            />
   //                         </div>
   //                         {(user ?
   //                            (user.roles === 'user' ?
   //                               <div className="review__input">
   //                                  <input type="text" ref={reviewMsgRef} placeholder='share your thoughts' required />
   //                                  <button className='btn primary__btn text-white' type='submit'>
   //                                     Submit
   //                                  </button>
   //                               </div> :
   //                               <></>) :
   //                            <></>)
   //                         }
   //                      </Form>


   //                      <ListGroup className='user__reviews'>
   //                            {
   //                               reviews?.map(review => (
   //                                  <div className="review__item">
   //                                     <img src={avatar} alt="" />

   //                                     <div className="w-100">
   //                                        <div className="d-flex align-items-center justify-content-between">
   //                                           <div>
   //                                              <h5>{review.username}</h5>
   //                                              <p>{new Date(review.createdAt).toLocaleDateString('en-US', options)}</p>
   //                                           </div>

   //                                           <span className='d-flex align-items-center'>
   //                                              {review.rating}<i class='ri-star-s-fill'></i>
   //                                           </span>
   //                                        </div>

   //                                        <h6>{review.reviewText}</h6>
   //                                     </div>
   //                                  </div>
   //                               ))
   //                            }
   //                         </ListGroup>
   //                   </div>
   //                </Col>
   //                {(user ? ((user.roles ==='user')?
   //                    <Col lg='4'>
   //                       <div><Booking tour={tour} avgRating={avgRating} /></div>
   //                    </Col>
   //                 :
   //                 <></>)                 
   //                 :
   //                 <></>)}

   //             </Row>
   //          }
   //       </Container>
   //       <Newsletter />
   //    </section>

   // )
}

export default TourDetails
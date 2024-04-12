import React, { useState, useContext } from 'react'
import './booking.css'
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from 'reactstrap'

import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { BASE_URL } from '../../utils/config'
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from "react-helmet";
const Booking = ({ tour, avgRating }) => {
   const { price, reviews, title ,pickUppoint} = tour
   const navigate = useNavigate()

   const { user } = useContext(AuthContext)

   const [booking, setBooking] = useState({
      userId: user && user._id,
      userEmail: user && user.email,
      tourName: title,
      fullName: '',
      phone: 8490066177,
      guestSize: 0,
      bookAt: '',
      totals: 0,
      isCancelled:false,
      pickUppoint:pickUppoint
   })

   const handleChange = e => {
      setBooking(prev => ({ ...prev, [e.target.id]: e.target.value }))
      setBooking(prev => ({ ...prev, totals: totalAmount }))
   }
   const handleBookAt = e => {
      var GivenDate = e.target.value;
      var CurrentDate = new Date();
      GivenDate = new Date(GivenDate);

      if (GivenDate > CurrentDate) {
         setBooking(prev => ({ ...prev, [e.target.id]: e.target.value }))
         setBooking(prev => ({ ...prev, totals: totalAmount }))

      } else {
         window.scrollTo(0, 0)
         toast.error('🦄 Booking date is should be greater than the current date.', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
         });
         e.target.value = '';
      }
   }

   const handleGuestSize = e => {
      if (e.target.value <= tour.maxGroupSize && e.target.value > 0) {
         setBooking(prev => ({ ...prev, [e.target.id]: e.target.value }))
         setBooking(prev => ({ ...prev, totals: totalAmount }))
      } else if (e.target.value <= 0) {
         // alert(`Min allowded Group Size is 1`);
         window.scrollTo(0, 0)
         toast.error('Min allowded Group Size is 1', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
         });
         e.target.value = 0;
         setBooking(prev => ({ ...prev, guestSize: 0 }))
      } else {

         // alert(`Max allowded Group Size is ${tour.maxGroupSize}`);
         toast.error(`Max allowded Group Size is ${tour.maxGroupSize}`, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
         });
         e.target.value = 0;
         setBooking(prev => ({ ...prev, guestSize: 0 }))
      }
   }
   const serviceFee = 10
   const totalAmount = Number(price) * Number(booking.guestSize) + Number(serviceFee)

   const handleClick = async e => {
      e.preventDefault()
      console.log(booking)

      try {
         if (!user || user === undefined || user === null) {
            toast.error('Please sign in', {
               position: "top-center",
               autoClose: 3000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: false,
               draggable: true,
               progress: undefined,
               theme: "colored",
            });
            return
         }

         console.log(booking)
         if (booking.fullName === '' || booking.bookAt === '' || booking.guestSize === 0) {
            toast.error('Please Complete all Fields', {
               position: "top-center",
               autoClose: 3000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: false,
               draggable: true,
               progress: undefined,
               theme: "colored",
            });
            return
         }

         const checkoverlapp = await fetch(`${BASE_URL}/booking/Check`, {
            method: 'post',
            headers: {
               'content-type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(booking)
         })

         const result = await checkoverlapp.json()

         if (!checkoverlapp.ok) {
            window.scroll({
               top: 0,
               left: 0,
               behavior: 'smooth'
            });
            toast.error(result.message, {
               position: "top-center",
               autoClose: 3000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: false,
               draggable: true,
               progress: undefined,
               theme: "colored",
            });
            return
         }

         const checkmaxGuestSize = await fetch(`${BASE_URL}/booking/CheckGuestSize`, {
            method: 'post',
            headers: {
               'content-type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(booking)
         })

         let resp = await checkmaxGuestSize.json();
         console.log(resp);
         if (resp.success == true) {
            let response = await fetch(`${BASE_URL}/booking/payment`, {
               method: "POST",
               headers: {
                  "content-type": "application/json",
               },
               credentials: 'include',
               body: JSON.stringify({ amount: totalAmount, }),
            });
            let orderData = await response.json();
            console.log(orderData);

            var options = {
               key: "rzp_test_WJRJTEH85W6Zn7",
               amount: totalAmount * 100,
               currency: "INR",
               order_id: orderData.userId,
               handler: async function (response) {
                  const mytempfunc = () => {
                     setBooking(prev => ({ ...prev, totalAmount: totalAmount }))
                  }
                  mytempfunc();
                  console.log(booking)

                  const res = await fetch(`${BASE_URL}/booking`, {
                     method: 'post',
                     headers: {
                        'content-type': 'application/json'
                     },
                     credentials: 'include',
                     body: JSON.stringify(booking)
                  })

                  const result = await res.json()

                  if (!res.ok) {
                     window.scroll({
                        top: 0,
                        left: 0,
                        behavior: 'smooth'
                     });
                     toast.error(result.message, {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                     });
                     return
                  }

                  navigate('/thank-you')

               }
            }

            var rzp1 = window.Razorpay(options);
            rzp1.open();

         } else {
            toast.error('🙅‍♂️ Tour has reached max group limit at specific date😔', {
               position: "top-center",
               autoClose: 3000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: false,
               draggable: true,
               progress: undefined,
               theme: "colored",
            });
         }



      } catch (error) {
         alert(error.message)
      }
   }

   
   return (
      <div className="booking">
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
         <Helmet>
            <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
         </Helmet>
         <div className="booking__top d-flex align-items-center justify-content-between">
            <h3>₹{price} <span>/per person</span></h3>
            <span className="tour__rating d-flex align-items-center">
               <i class='ri-star-fill' style={{ 'color': 'var(--secondary-color)' }}></i>
               {avgRating === 0 ? null : avgRating} ({reviews?.length})
            </span>
         </div>


         <div className="booking__form">
            <h5>Information</h5>
            <Form className='booking__info-form' onSubmit={handleClick}>
               <FormGroup>
                  <input type="text" placeholder='Full Name' id='fullName' required
                     onChange={handleChange} />
               </FormGroup>
               <FormGroup className='d-flex align-items-center gap-3' >
                  <PhoneInput
                     className="number"
                     inputStyle={{ width: '100%' }}
                     country={"in"}
                     id='phone'
                     onChange={(phones) => {
                        setBooking(prev => ({ ...prev, phone: phones }))
                     }}
                  />
               </FormGroup>
            
               <FormGroup className='d-flex align-items-center gap-3'>
                  <input type="date" placeholder='' id='bookAt' required
                     onChange={handleBookAt} />
                  <input type="number" placeholder='Guest' id='guestSize' required
                     onChange={handleGuestSize} />
               </FormGroup>
            </Form>
         </div>


         <div className="booking__bottom">
            <ListGroup>
               <ListGroupItem className='border-0 px-0'>
                  <h5 className='d-flex align-items-center gap-1'>₹{price} <i class='ri-close-line'></i> {booking.guestSize} person</h5>
                  <span> ₹{booking.guestSize*price}</span>
               </ListGroupItem>
               <ListGroupItem className='border-0 px-0'>
                  <h5>Service charge</h5>
                  <span>₹{serviceFee}</span>
               </ListGroupItem>
               <ListGroupItem className='border-0 px-0 total'>
                  <h5>Total</h5>
                  <span>₹{totalAmount}</span>
               </ListGroupItem>
            </ListGroup>

            <Button className='btn primary__btn w-100 mt-4' onClick={handleClick}>Book Now</Button>
         </div>
      </div>
   )
}

export default Booking
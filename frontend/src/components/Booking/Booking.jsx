import React, { useState, useContext } from 'react'
import './booking.css'
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from 'reactstrap'

import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { BASE_URL } from '../../utils/config'
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

// import Razorpay from 'razorpay'
import {Helmet} from "react-helmet";
const Booking = ({ tour, avgRating }) => {
   const { price, reviews, title } = tour
   const navigate = useNavigate()

   const { user } = useContext(AuthContext)

   const [booking, setBooking] = useState({
      userId: user && user._id,
      userEmail: user && user.email,
      tourName: title,
      fullName: '',
      phone: '',
      guestSize: 1,
      bookAt: '',
      totals:0
   })

   const handleChange = e => {
      setBooking(prev => ({ ...prev, [e.target.id]: e.target.value }))
      setBooking(prev => ({ ...prev,totals:totalAmount }))
   }
   const handleBookAt = e =>{
      var GivenDate = e.target.value;
      var CurrentDate = new Date();
      GivenDate = new Date(GivenDate);

      if(GivenDate > CurrentDate){
         setBooking(prev => ({ ...prev, [e.target.id]: e.target.value }))
         setBooking(prev => ({ ...prev,totals:totalAmount }))
         
      }else{
         alert('Booking date is should be greater than the current date.');
         e.target.value = '';
      }
   }
   
   const handleGuestSize = e =>{
      if(e.target.value <= tour.maxGroupSize && e.target.value > 0){
         setBooking(prev => ({ ...prev, [e.target.id]: e.target.value }))
         setBooking(prev => ({ ...prev,totals:totalAmount }))
      } else if(e.target.value <=  0){
         alert(`Min allowded Group Size is 1`);
         e.target.value = '';
      } else{
         alert(`Max allowded Group Size is ${tour.maxGroupSize}`);
         e.target.value = '';
      }
   }
   const serviceFee = 10
   const totalAmount = Number(price) * Number(booking.guestSize) + Number(serviceFee)

   const [phones,setPhone] = useState("");
   const handleClick = async e => {
      e.preventDefault()
      console.log(booking)

      try {
         if (!user || user === undefined || user === null) {
            return alert('Please sign in')
         }

         // const makePayment = async () => {
         //    const stripe = await loadStripe("pk_test_51OSfYqSC9inV6y9vbHb0CCUfOYyAT3YHIezWO1LxQquCffG8SdyKQH1TxrnboIu1ukLg0LDnb3kg6SI6Lhrd6rQ600cwVQqhes");
            
         //    const res = await fetch(`${BASE_URL}/booking/payment`,{
         //       method: 'post',
         //       headers: {
         //          'content-type': 'application/json'
         //       },
         //       credentials: 'include',
         //       body: JSON.stringify({
         //          items:[
         //             {
         //                id:1,
         //                name:booking.tourName,
         //                price:totalAmount
         //             }
         //          ]
         //       })
         //    })
         // // }

         setBooking(prev => ({ ...prev, phone: phones }))

         let response = await fetch(`${BASE_URL}/booking/payment`,{
            method:"POST",
            headers:{
               "content-type":"application/json",
            },
            credentials: 'include',
            body: JSON.stringify({amount: totalAmount,}),
         });
         let orderData = await response.json();
         console.log(orderData);
         
         var options = {
            key :"rzp_test_WJRJTEH85W6Zn7",
            amount:totalAmount*100,
            currency:"INR",
            order_id:orderData.userId,
            handler: function(response){
               // alert(response.razorpay_payment_id);
            }
         }
         
         var rzp1 = window.Razorpay(options);
         rzp1.open();
         booking.totalAmount = totalAmount;
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

         // if(!res.ok) {
         //    return alert(result.message)
         // }
         
         navigate('/thank-you')
      } catch (error) {
         alert(error.message)
      }   
   }
   
   return (
      <div className='booking'>
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

         {/* =============== BOOKING FORM START ============== */}
         <div className="booking__form">
            <h5>Information</h5>
            <Form className='booking__info-form' onSubmit={handleClick}>
               <FormGroup>
                  <input type="text" placeholder='Full Name' id='fullName' required
                     onChange={handleChange} />
               </FormGroup>
               {/* <FormGroup>
                  <input type="tel" placeholder='Phone' id='phone' required
                     onChange={handleChange} />
               </FormGroup> */}
               <PhoneInput
                    className="number"
                    country={"in"}
                    value={phones}
                    id='phone'
                    onChange={(phone) =>
                     setPhone(phone)}
                    />
               <FormGroup className='d-flex align-items-center gap-3'>
                  <input type="date" placeholder='' id='bookAt' required
                     onChange={handleBookAt} />
                  <input type="number" placeholder='Guest' id='guestSize' required
                     onChange={handleGuestSize} />
               </FormGroup>
            </Form>
         </div>
         {/* =============== BOOKING FORM END ================ */}


         {/* =============== BOOKING BOTTOM ================ */}
         <div className="booking__bottom">
            <ListGroup>
               <ListGroupItem className='border-0 px-0'>
                  <h5 className='d-flex align-items-center gap-1'>₹{price} <i class='ri-close-line'></i> 1 person</h5>
                  <span> ₹{price}</span>
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
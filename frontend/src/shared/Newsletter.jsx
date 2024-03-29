import React, { useState } from 'react'
import './newsletter.css'
import { Container, Row, Col } from 'reactstrap'
import maleTourist from '../assets/images/male-tourist.png'
import { ToastContainer, toast } from 'react-toastify';
import { BASE_URL } from '../utils/config';
const NewsLetter = () => {
   const [email,setEmail] = useState({
      email: undefined,
   })
   const validateEmail = (email) => {
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };
   const submitEmail = async (data)=>{
      if(validateEmail(email.email)){
         try {
               const res = await fetch(`${BASE_URL}/sub`, {
                  method: 'post',
                  headers: {
                     'content-type': 'application/json'
                  },
                  credentials: 'include',
                  body:JSON.stringify(email)
               })
               const result = await res.json()
               console.log(result)
               if (!res.ok) alert(result.message)
               return () => { }
         } catch (err) {
               alert(err.message)
         }
      } else{
         toast.error('🙅‍♂️ Enter an valid Email 😊', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
         });
      }
   }
   return (
      <section className='newsletter'>
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
               <Col lg='6'>
                  <div className="newsletter__content">
                     <h2>Subcribe now to get useful traveling information</h2>

                     <div className="newsletter__input">
                        {/* <form action=""> */}
                           <input type="email" placeholder='Enter your email'onChange={(e) => {setEmail({email:e.target.value})}} />
                           <button className="btn newsletter__btn" onClick={submitEmail}>Subcribe</button>
                        {/* </form> */}
                     </div>
                     <p>Got questions or feedback? Reach out to us anytime! We're here to help and eager to hear about your experiences with our travel app. Drop us a message, and our team will swiftly assist you. Your journey is our priority.
                     </p>
                  </div>
               </Col>
               <Col lg='6'>
                  <div className="newsletter__img">
                     <img src={maleTourist} alt="" />
                  </div>
               </Col>
            </Row>
         </Container>
      </section>
   )
}

export default NewsLetter
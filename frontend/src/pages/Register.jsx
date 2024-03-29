import React, { useState, useContext,useEffect } from 'react'
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap'
import '../styles/login.css'
import { Link, useNavigate } from 'react-router-dom'
import registerImg from '../assets/images/login.png'
import userIcon from '../assets/images/user.png'
import { AuthContext } from '../context/AuthContext'
import { BASE_URL } from '../utils/config'
import { ToastContainer, toast } from 'react-toastify';


const Register = () => {
   const [credentials, setCredentials] = useState({
      userName: undefined,
      email: undefined,
      password: undefined
   })

   const {dispatch} = useContext(AuthContext)
   const navigate = useNavigate()

   const { user } = useContext(AuthContext)

   useEffect(()=>{
      if(user)
         navigate('/')
   },[])

   const handleChange = e => {
      setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }))
   }

   const handleClick = async e => {
      e.preventDefault()

      try {
         const PASSEWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?]).{8,}$/;
         const EMAIL_REGEX = /^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/
         // console.log(credentials.password)
         if(!PASSEWORD_REGEX.test(credentials.password)){
            toast.error(" 💪🔒 Please input a strong password containing at least 8 characters, including uppercase, lowercase, special Symbol. 😅", {
               position: "top-center",
               autoClose: 5000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: false,
               draggable: true,
               progress: undefined,
               className: "toast-message"
            }); 
         } 
          if(!EMAIL_REGEX.test(credentials.email)) {
            toast.error("📧 Provide a valid email address adhering to the standard format, including username, @ symbol, and domain. 😅", {
               position: "top-center",
               autoClose: 5000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: false,
               draggable: true,
               progress: undefined,
               className: "toast-message"
            }); 
         } 
         if(PASSEWORD_REGEX.test(credentials.password) && EMAIL_REGEX.test(credentials.email)){

                const res = await fetch(`${BASE_URL}/auth/register`, {
               method:'post',
               headers: {
                  'content-type':'application/json'
               },
               body: JSON.stringify(credentials)
            })
            const result = await res.json()
   
            if(!res.ok){
               toast.error("Oops! 🙈 Looks like we already have a user with this email. 😅", {
                  position: "top-center",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: false,
                  draggable: true,
                  progress: undefined,
                  className: "toast-message"
               }); 
               return;
            } 
            else {
               toast.info("Time to verify your email and enjoy seamless login! 😉", {
                  position: "top-center",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: false,
                  draggable: true,
                  progress: undefined,
                  className: "toast-message"
               }); 
               dispatch({type:'REGISTER_SUCCESS'})
               setTimeout(()=>{
                  navigate('/login')
               },3000)
            }
           
         }
      } catch(err) {
         alert(err.message)
      }
   }

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
               // toastStyle={{ backgroundColor: "#faa935" }}
            />
         <Container>
            <Row>
               <Col lg='8' className='m-auto'>
                  <div className="login__container d-flex justify-content-between">
                     <div className="login__img">
                        <img src={registerImg} alt="" />
                     </div>

                     <div className="login__form">
                        <div className="user">
                           <img src={userIcon} alt="" />
                        </div>
                        <h2>Register</h2>

                        <Form onSubmit={handleClick}>
                           <FormGroup>
                              <input type="text" placeholder='Username' id='username' onChange={handleChange} required />
                           </FormGroup>
                           <FormGroup>
                              <input type="test" placeholder='Email' id='email' onChange={handleChange} required />
                           </FormGroup>
                           <FormGroup>
                              <input type="password" placeholder='Password' id='password' onChange={handleChange} required />
                           </FormGroup>
                           <Button className='btn secondary__btn auth__btn' type='submit'>Create Account</Button>
                        </Form>
                        <p>Already have an account? <Link to='/login'>Login</Link></p>
                     </div>
                  </div>
               </Col>
            </Row>
         </Container>
      </section>
   )
}

export default Register
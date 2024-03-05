import React, { useContext, useEffect, useState } from 'react'
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap'
import '../styles/login.css'
import { Link, useNavigate } from 'react-router-dom'
import loginImg from '../assets/images/login.png'
import userIcon from '../assets/images/user.png'
import { AuthContext } from '../context/AuthContext'
import { BASE_URL } from '../utils/config'
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const ResetPassword = () => {
   const variable = useLocation()

   const [pass, setpass] = useState("")
   const [cpass, csetpass] = useState("")

   const navigate = useNavigate()

   const handleChangepass = async e => {
      setpass(e.target.value);
   }
   const handleChangecpass = async e => {
      csetpass(e.target.value);
   }
   const handleClick = async e => {
      e.preventDefault()

      try {
         //  console.log(window.location.href)
         if (cpass != pass) {
            console.log(cpass);
            console.log(pass);
            toast.error('🔒 Both Passwords should match 🔤🔁🔤.', {
               position: "top-center",
               autoClose: 3000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: false,
               draggable: true,
               progress: undefined,
               theme: "colored",
            });
            return;
         }
         var input = window.location.href;

         var fields = input.split('/');
         var id = fields[4]
         var token = fields[5]
         const res = await fetch(`${BASE_URL}/auth/reset-password/${id}/${token}`, {
            method: 'post',
            headers: {
               'content-type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ pass })
         })

         const result = await res.json()
         if (!res.ok) {
            alert(result.message)

         }
         // console.log(result.data)

         //  dispatch({type:"LOGIN_SUCCESS", payload:result.data})
         navigate('/login')
      } catch (err) {
         //  dispatch({type:"LOGIN_FAILURE", payload:err.message})
      }
   }

   return (
      <section>
         <Container>
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
            <Row>
               <Col lg='8' className='m-auto'>
                  <div className="login__container d-flex justify-content-between">
                     <div className="login__img">
                        <img src={loginImg} alt="" />
                     </div>

                     <div className="login__form">
                        <div className="user">
                           <img src={userIcon} alt="" />
                        </div>
                        <h2>Reset Password</h2>
                        <h2>{console.log(variable.href)}</h2>
                        <Form onSubmit={handleClick}>
                           <FormGroup>
                              <input type="password" placeholder='Password' id='password' onChange={handleChangepass} required />
                           </FormGroup>
                           <FormGroup>
                              <input type="password" placeholder='Confirm Password' id='password' onChange={handleChangecpass} required />
                           </FormGroup>
                           <Button className='btn secondary__btn auth__btn' type='submit'>Submit</Button>
                        </Form>
                     </div>
                  </div>
               </Col>
            </Row>
         </Container>
      </section>
   )
}

export default ResetPassword;
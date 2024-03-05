import React, { useContext, useEffect, useState } from 'react'
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap'
import '../styles/login.css'
import { Link, useNavigate } from 'react-router-dom'
import loginImg from '../assets/images/login.png'
import userIcon from '../assets/images/user.png'
import { AuthContext } from '../context/AuthContext'
import { BASE_URL } from '../utils/config'

const ForgotPassword = () => {
   
const [email,setEmail] = useState("")
const navigate = useNavigate()

const handleChange = async e => {
  setEmail(e.target.value);
}
const handleClick = async e => {
  e.preventDefault()

  try {
     const res = await fetch(`${BASE_URL}/auth/forgot-password`, {
        method:'post',
        headers: {
           'content-type':'application/json'
        },
        credentials:'include',
        body: JSON.stringify({email})
     })

     const result = await res.json()
     if(!res.ok) alert(result.message)
     console.log(result.data)
    
    //  dispatch({type:"LOGIN_SUCCESS", payload:result.data})
     navigate('/')
  } catch(err) {
    //  dispatch({type:"LOGIN_FAILURE", payload:err.message})
  }
}

  return (
    <section>
         <Container>
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
                        <h2>Forgot Password</h2>

                        <Form onSubmit={handleClick}>
                           <FormGroup>
                              <input type="email" placeholder='Email' id='email' onChange={handleChange} required />
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

export default ForgotPassword;
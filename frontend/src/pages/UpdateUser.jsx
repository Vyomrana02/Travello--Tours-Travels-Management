import React, { useState, useContext } from 'react'
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap'
import '../styles/login.css'
import { Link, useNavigate } from 'react-router-dom'
import registerImg from '../assets/images/login.png'
import userIcon from '../assets/images/user.png'
import { AuthContext } from '../context/AuthContext'
import { BASE_URL } from '../utils/config'

const UpdateUser = () => {

   const { user, dispatch } = useContext(AuthContext)
   const [credentials, setCredentials] = useState({
      userName: user.username,
      email: user.email ,
      password: user.password 
   })

//    const {dispatch} = useContext(AuthContext)
   const navigate = useNavigate()

   const handleChange = e => {
      setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }))
   }
//    useEffect(()=>{
//     console.log(user);
//    },[])

 const Loggin = async (datas) => {
    // e.preventDefault()

    // dispatch({type:'LOGIN_START'})

    try {
       const res = await fetch(`${BASE_URL}/auth/login`, {
          method:'post',
          headers: {
             'content-type':'application/json'
          },
          credentials:'include',
          body: JSON.stringify(datas)
       })

       const result = await res.json()
       if(!res.ok) alert(result.message)
       console.log(result.data)

       dispatch({type:"LOGIN_SUCCESS", payload:result.data})
       navigate('/')
    } catch(err) {
       dispatch({type:"LOGIN_FAILURE", payload:err.message})
    }
 }
   const handleClick = async e => {
      e.preventDefault()
        console.log(user._id)
      try {
        user.username = credentials.userName;
        user.email = credentials.email;
        user.password = credentials.password;
         const res = await fetch(`${BASE_URL}/users/${user._id}`, {
            method:'put',
            headers: {
               'content-type':'application/json'
            },
            credentials:'include',
            body:JSON.stringify(credentials)
        })
        const result = await res.json()
        
        if(!res.ok) alert(result.message)
        // logout(result.data);
        const datas = {
            email: result.data.email,
            password: credentials.password
         }
        console.log(datas)
        Loggin(datas)
        //  localStorage.setItem("user",JSON.stringify(result.data))
        //  dispatch({payload:result.data})
        //  navigate('/')
      } catch(err) {
         alert(err.message)
      }
   }
   return (
      <section>
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
                        <h2>Update User</h2>

                        <Form onSubmit={handleClick}>
                           <FormGroup>
                             Username <input type="text" placeholder={user.username} id='username' onChange={handleChange} />
                           </FormGroup>
                           <FormGroup>
                           Email<input type="email" placeholder={user.email} id='email' onChange={handleChange}/>
                           </FormGroup>
                           <FormGroup>
                              Password<input type="text" placeholder={user.password} id='password' onChange={handleChange} />
                           </FormGroup>
                           <Button className='btn secondary__btn auth__btn' type='submit'>Update Account</Button>
                        </Form>
                        <p>Go Back Without Update <Link to='/'>Home</Link></p>
                     </div>
                  </div>
               </Col>
            </Row>
         </Container>
      </section>
   )
}

export default UpdateUser
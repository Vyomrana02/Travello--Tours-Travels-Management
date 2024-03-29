import React, { useState, useContext } from 'react'
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap'
import '../styles/login.css'
import { Link, useNavigate } from 'react-router-dom'
import registerImg from '../assets/images/login.png'
import userIcon from '../assets/images/user.png'
import { AuthContext } from '../context/AuthContext'
import { BASE_URL } from '../utils/config'
import { ToastContainer, toast } from 'react-toastify';

const UpdateUser = () => {

   const { user, dispatch } = useContext(AuthContext)
   const [credentials, setCredentials] = useState({
      username: user.username,
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
        const PASSEWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?]).{8,}$/;
        const EMAIL_REGEX = /^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/
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
         return;
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
         return;
      } 
      try {
        user.username = credentials.username;
        user.email = credentials.email;
        user.password = credentials.password;
         const res = await fetch(`${BASE_URL}/users/${user._id}`, {
            method:'put',
            headers: {
               'content-type':'application/json'
            },
            credentials:'include',
            body: JSON.stringify(credentials)
        })
        const result = await res.json()
        
        if(!res.ok){
         alert(result.message)
         // toast.error('🙅‍♂️ This Email is already taken. 😊', {
         //    position: "top-center",
         //    autoClose: 3000,
         //    hideProgressBar: false,
         //    closeOnClick: true,
         //    pauseOnHover: false,
         //    draggable: true,
         //    progress: undefined,
         // });
         // window.location.reload();
         return;
        }
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
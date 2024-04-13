import React, { useEffect, useRef, useContext } from 'react'
import { Container, Row, Button } from 'reactstrap'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import Logo from '../../assets/images/logo.png'
import "./header.css"
import { AuthContext } from '../../context/AuthContext'
import Dropdown from 'react-bootstrap/Dropdown';

const nav__links = [
   {
      path: '/home',
      display: 'Home'
   },
   {
      path: '/about',
      display: 'About'
   },
   {
      path: '/tours',
      display: 'Tours'
   },
]

const nav__linksadimin = [
   {
      path: '/home',
      display: 'Home'
   },
   {
      path: '/Tours',
      display: 'Tours'
   },
   {
      path: '/bookings',
      display: 'Bookings'
   },
   {
      path: '/AllUser',
      display: 'Users'
   },
   
]

const Header = () => {
   const headerRef = useRef(null)
   const menuRef = useRef(null)
   const navigate = useNavigate()
   const { user, dispatch } = useContext(AuthContext)

   const logout = () => {
      dispatch({ type: 'LOGOUT' })
      navigate('/')
   }

   const stickyHeaderFunc = () => {
      window.addEventListener('scroll', () => {
         if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
            headerRef.current.classList.add('sticky__header')
         } else {
            headerRef.current.classList.remove('sticky__header')
         }
      })
   }

   useEffect(() => {
      stickyHeaderFunc()
      return window.removeEventListener('scroll', stickyHeaderFunc)
   })

   const toggleMenu = () => menuRef.current.classList.toggle('show__menu')

   const updateUser = async (e) => {
      e.preventDefault()
      navigate('/update-user')
   }
   const mybooking = () => {
      navigate('/bookings')
   }
   return (
      <header className='header' ref={headerRef}>
         <Container>
            <Row>
               <div className="nav__wrapper d-flex align-items-center justify-content-between">
                  <div className="logo">
                     <img src={Logo} alt="" />
                  </div>

                  {!user ?
                     <>
                        <div className="navigation" ref={menuRef} onClick={toggleMenu}>
                           <ul className="menu d-flex align-items-center gap-5">
                              {
                                 nav__links.map((item, index) => (
                                    <li className="nav__item" key={index}>
                                       <NavLink to={item.path} className={navClass => navClass.isActive ? 'active__link' : ''}>{item.display}</NavLink>
                                    </li>
                                 ))
                              }
                           </ul>
                        </div>

                        <div className="nav__right d-flex align-items-center gap-4">
                           <div className="nav__btns d-flex align-items-center gap-2">
                              {
                                 user ? <>
                                    <div className="dropdown">
                                       <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                                          {user.username}
                                       </button>
                                       <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton2" style={{"max-height":"10px;"}}>
                                          <li><a className="dropdown-item" onClick={mybooking}>My Bookings</a></li>
                                          <li><a className="dropdown-item" onClick={updateUser}>Update Profile</a></li>
                                          <li><a className="dropdown-item" onClick={logout}>Logout</a></li>
                                       </ul>
                                    </div>
                                 </> : <>
                                    <Button className='btn secondary__btn'><Link to='/login'>Login</Link></Button>
                                    <Button className='btn primary__btn'><Link to='/register'>Register</Link></Button>
                                 </>
                              }
                           </div>

                           <span className="mobile__menu" onClick={toggleMenu}>
                              <i className="ri-menu-line"></i>
                           </span>
                        </div>
                     </>
                     : (
                        (user && user.roles === 'user') ?
                        <>
                        <div className="navigation" ref={menuRef} onClick={toggleMenu}>
                           <ul className="menu d-flex align-items-center gap-5">
                              {
                                 nav__links.map((item, index) => (
                                    <li className="nav__item" key={index}>
                                       <NavLink to={item.path} className={navClass => navClass.isActive ? 'active__link' : ''}>{item.display}</NavLink>
                                    </li>
                                 ))
                              }
                           </ul>
                        </div>

                        <div className="nav__right d-flex align-items-center gap-4">
                           <div className="nav__btns d-flex align-items-center gap-2">
                              {
                                 user ? <>
                                    <Dropdown>
                                       <Dropdown.Toggle style={{'backgroundColor':'#faa935','borderColor':'#ffffff'}} id="dropdown-basic">
                                       {user.username}
                                       </Dropdown.Toggle>

                                       <Dropdown.Menu>
                                       <Dropdown.Item onClick={mybooking} style={{"line-height":"50px"}} >My Bookings</Dropdown.Item>
                                       <Dropdown.Item onClick={updateUser} style={{"line-height":"50px"}}>Update Profile</Dropdown.Item>
                                       <Dropdown.Item onClick={logout} style={{"line-height":"50px"}}>Logout</Dropdown.Item>
                                       </Dropdown.Menu>
                                    </Dropdown>
                                 </> : <>
                                    <Button className='btn secondary__btn'><Link to='/login'>Login</Link></Button>
                                    <Button className='btn primary__btn'><Link to='/register'>Register</Link></Button>
                                 </>
                              }
                           </div>

                           <span className="mobile__menu" onClick={toggleMenu}>
                              <i className="ri-menu-line"></i>
                           </span>
                        </div>
                     </>
                        :
                        <>
                        <div className="navigation" ref={menuRef} onClick={toggleMenu}>
                           <ul className="menu d-flex align-items-center gap-5">
                              {
                                 nav__linksadimin.map((item, index) => (
                                    <li className="nav__item" key={index}>
                                       <NavLink to={item.path} className={navClass => navClass.isActive ? 'active__link' : ''}>{item.display}</NavLink>
                                    </li>
                                 ))
                              }
                           </ul>
                        </div>

                         <div className="nav__right d-flex align-items-center gap-4">
                           <div className="nav__btns d-flex align-items-center gap-2">
                              {
                                 user ? <>
                                    <Dropdown>
                                       <Dropdown.Toggle id="dropdown-basic" style={{'backgroundColor':'#faa935','borderColor':'#ffffff'}}>
                                       {user.username}
                                       </Dropdown.Toggle>

                                       <Dropdown.Menu>
                                       {user==='user' ? 
                                       <Dropdown.Item onClick={mybooking} style={{"line-height":"50px"}} >My Bookings</Dropdown.Item>
                                       : <></>}
                                       <Dropdown.Item onClick={updateUser} style={{"line-height":"50px"}}>Update Profile</Dropdown.Item>
                                       <Dropdown.Item onClick={logout} style={{"line-height":"50px"}}>Logout</Dropdown.Item>
                                       </Dropdown.Menu>
                                    </Dropdown>
                                 </> : <>
                                    <Button className='btn secondary__btn'><Link to='/login'>Login</Link></Button>
                                    <Button className='btn primary__btn'><Link to='/register'>Register</Link></Button>
                                 </>
                              }
                           </div>

                           <span className="mobile__menu" onClick={toggleMenu}>
                              <i className="ri-menu-line"></i>
                           </span>
                        </div> 
                     </>
                     )

                  }


               </div>
            </Row>
         </Container>
      </header>
   )
}

export default Header
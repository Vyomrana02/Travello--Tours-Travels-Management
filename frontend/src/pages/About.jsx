import React from 'react'
import '../styles/home.css'
import { Container, Row, Col } from 'reactstrap'
import experienceImg from '../assets/images/experience.png'

import Subtitle from './../shared/subtitle'
const About = () => {
    return (
        <>
      {/* ========== EXPERIENCE SECTION START ============ */}
      <section>
      <Container>
         <Row>
            <Col lg='6'>
               <div className="experience__content">
                  <Subtitle subtitle={'Experience'} />
                  <h2>With our all experience <br /> we will serve you</h2>
                  <p>
Unleash unforgettable moments. Dive into a world of discovery, where every step sparks new adventures. Explore beyond boundaries, embrace diverse cultures, and create timeless memories. Join us in crafting your next extraordinary experience.</p>
               </div>

               <div className="counter__wrapper d-flex align-items-center gap-5">
                  <div className="counter__box">
                     <span>12k+</span>
                     <h6>Successful trip</h6>
                  </div>
                  <div className="counter__box">
                     <span>2k+</span>
                     <h6>Regular clients</h6>
                  </div>
                  <div className="counter__box">
                     <span>15</span>
                     <h6>Year experience</h6>
                  </div>
               </div>
            </Col>
            <Col lg='6'>
               <div className="experience__img">
                  <img src={experienceImg} alt="" />
               </div>
            </Col>
         </Row>
      </Container>
   </section>
   </>
    );
}
export default About;
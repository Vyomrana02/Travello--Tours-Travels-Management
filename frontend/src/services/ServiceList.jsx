import React from 'react'
import ServiceCard from './ServiceCard'
import { Col } from 'reactstrap'
import weatherImg from '../assets/images/weather.png'
import guideImg from '../assets/images/guide.png'
import customizationImg from '../assets/images/customization.png'

const servicesData = [
   {
      imgUrl: weatherImg,
      title: `Calculate Weather`,
      desc: `Plan ahead with ease! Get instant weather updates at your fingertips.`,
   },
   {
      imgUrl: guideImg,
      title: `Best Tour Guide`,
      desc: `Experience history, culture, and local secrets like never before.`,
   },
   {
      imgUrl: customizationImg,
      title: 'Customization',
      desc: `Tailor your adventure! Our customizable tours are designed just for you. `,
   },
]

const ServiceList = () => {
   return <>
      {
         servicesData.map((item, index) => (
            <Col lg='3' md='6' sm='12' className='mb-4' key={index}>
               <ServiceCard item={item} />
            </Col>))
      }
   </>

}

export default ServiceList
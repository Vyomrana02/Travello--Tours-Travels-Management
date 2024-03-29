import React from 'react'
import Slider from 'react-slick'

const Testimonials = () => {
   const settings = {
      dots:true,
      infinite:true,
      autoplay:true,
      speed:1000,
      swipeToSlide:true,
      autoplaySpeed:2000,
      slidesToShow:3,

      responsive: [
         {
            breakpoint: 992,
            settings: {
               slidesToShow: 2,
               slidesToScroll: 1,
               infinite: true,
               dots: true,
            },
            breakpoint: 576,
            settings: {
               slidesToShow: 1,
               slidesToScroll: 1,
               infinite: true,
               dots: true,
            },
         }
      ]
   }

   return <Slider {...settings}>
      <div className="testimonial py-4 px-3">
         <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Minus sit, explicabo provident hic distinctio molestias voluptates nobis alias
            placeat suscipt earum debitits recusandae voluptate illum expedita 
            corrupti aliquid doloribus delectus?
         </p>

         <div className='d-flex align-items-center gap-4 mt-3'>
            {/* <img src={ava01} className='w-25 h-25 rounded-2' alt="" /> */}
            <img src="https://source.unsplash.com/1600x900/?man" className='w-25 h-25 rounded-2' alt="" />
            <div>
               <h6 className='mb-0 mt-3'>John Doe</h6>
               <p>Customer</p>
            </div>
         </div> 
      </div>

      <div className="testimonial py-4 px-3">
         <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Minus sit, explicabo provident hic distinctio molestias voluptates nobis alias
            placeat suscipt earum debitits recusandae voluptate illum expedita 
            corrupti aliquid doloribus delectus?
         </p>

         <div className='d-flex align-items-center gap-4 mt-3'>
            <img src="https://source.unsplash.com/1600x900/?woman" className='w-25 h-25 rounded-2' alt="" />
            <div>
               <h6 className='mb-0 mt-3'>Lia Franklin</h6>
               <p>Customer</p>
            </div>
         </div> 
      </div>

      <div className="testimonial py-4 px-3">
         <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Minus sit, explicabo provident hic distinctio molestias voluptates nobis alias
            placeat suscipt earum debitits recusandae voluptate illum expedita 
            corrupti aliquid doloribus delectus?
         </p>

         <div className='d-flex align-items-center gap-4 mt-3'>
            <img src="https://source.unsplash.com/1600x900/?people" className='w-25 h-25 rounded-2' alt="" />
            <div>
               <h6 className='mb-0 mt-3'>John Doe</h6>
               <p>Customer</p>
            </div>
         </div> 
      </div>

      <div className="testimonial py-4 px-3">
         <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Minus sit, explicabo provident hic distinctio molestias voluptates nobis alias
            placeat suscipt earum debitits recusandae voluptate illum expedita 
            corrupti aliquid doloribus delectus?
         </p>

         <div className='d-flex align-items-center gap-4 mt-3'>
            <img src="https://source.unsplash.com/1600x900/?person" className='w-25 h-25 rounded-2' alt="" />
            <div>
               <h6 className='mb-0 mt-3'>John Doe</h6>
               <p>Customer</p>
            </div>
         </div> 
      </div>
   </Slider>
}

export default Testimonials
import React, { useState } from 'react'
import { Button } from 'reactstrap'
import { BASE_URL } from '../utils/config'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
const AddTour = () => {
  const navigate = useNavigate();
  const [tour, setTour] = useState({
    title: '',
    city: '',
    address: '',
    distance: 0,
    price: 0,
    maxGroupSize: 0,
    desc: '',
    reviews: [],
    photo: '',
    pickUppoint:'',
    featured: false
  })
  const [days,setdays] = useState(0);
  const [nights,setnights] = useState(0)
  const handleChange = e => {
    setTour(prev => ({ ...prev, [e.target.id]: e.target.value }))
  }
  const handleSubmit = async e => {
    console.log(tour);
    e.preventDefault()
    if(tour.title =='' || tour.city=='' || tour.distance==0 || tour.price==0 ||tour.maxGroupSize==0 || tour.desc=="" || tour.photo=="" || tour.pickUppoint==''){
      toast.error('📋✏️ Please Fill out all details 😊', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
     });
     return
    }
    if(days == parseInt(nights)+1){
    // console.log() 
    let formData = new FormData();
    formData.append("title",tour.title)
    formData.append("city",tour.city)
    formData.append("address",String(nights)+String("N/")+String(days)+String("D"))
    formData.append("distance",tour.distance)
    formData.append("price",tour.price)
    formData.append("maxGroupSize",tour.maxGroupSize)
    formData.append("desc",tour.desc)
    formData.append("photo",tour.photo)
    formData.append("pickUppoint",tour.pickUppoint)
    console.log(formData)
      axios.post(`${BASE_URL}/tours/`,formData,{ withCredentials: true ,headers: {
        'Access-Control-Allow-Origin': 'true', 
    }})
      .then((res)=>{
        console.log(res.data)
        navigate('/tours')
      }).catch(err=>{
        console.log(err,"err");
      })
    } else {
      toast.error('days should be 1 greater than nights 😊', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
     });
     return
    }
  }
  const handlePhoto = e =>{
    setTour(prev => ({ ...prev, [e.target.id]: e.target.files[0] }))
  }
  return (
    
    <div className='container'>
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
      <div className="mb-3">
        <label for="exampleFormControlInput1" className="form-label">Title</label>
        <input type="text" className="form-control" id="title" onChange={handleChange} required/>
      </div>
      <div className='row'>
      <div className="mb-1 col-6">
        <label for="exampleFormControlInput1" className="form-label">City</label>
        <input type="text" className="form-control" id="city" onChange={handleChange} required/>
      </div>
      
      <div className="mb-1 col-6">
        <label for="exampleFormControlInput1" className="form-label">Pick Up point</label>
        <input type="text" className="form-control" id="pickUppoint" onChange={handleChange} required/>
      </div>
      </div>
      <div className='row'>
        <div className="mb-1 col-3">
          <label for="exampleFormControlInput1" className="form-label">Nights:</label>
          <input type="number" className="form-control" id="address" onChange={(e)=>{setnights(e.target.value)}}  required/>
        </div>
        <div className="mb-1 col-3">
        <label for="exampleFormControlInput1" className="form-label">Days:</label>
          <input type="number" className="form-control" id="address" onChange={(e)=>{setdays(e.target.value)}}  required/>
        </div>
        <div className="mb-3 col-6">
          <label for="exampleFormControlInput1" className="form-label">Distance</label>
          <input type="number" className="form-control" id="distance" onChange={handleChange}  required/>
        </div>
      </div>
      <div className='row'>
        <div className="mb-3 col-6">
          <label for="exampleFormControlInput1" className="form-label">Price</label>
          <input type="number" className="form-control" id="price" onChange={handleChange}  required/>
        </div>
        <div className="mb-3 col-6">
          <label for="exampleFormControlInput1" className="form-label">Max Group Size</label>
          <input type="number" className="form-control" id="maxGroupSize" onChange={handleChange}  required/>
        </div>
      </div>
      <div className="mb-3">
        <label for="exampleFormControlTextarea1" className="form-label">Description</label>
        <textarea className="form-control" id="desc" rows="3" onChange={handleChange}  required></textarea>
      </div>
      <div className="mb-3">
        <label for="exampleFormControlTextarea1" className="form-label">Photo</label>
        <input type="file" name='file' className="form-control" id="photo" onChange={handlePhoto}  required />
      </div>
      <Button onClick={handleSubmit}>Add Tour</Button>
    </div>
  )
}

export default AddTour
import React, { useState } from 'react'
import { Button } from 'reactstrap'
import { BASE_URL } from '../utils/config'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const AddTour = () => {
  const navigate = useNavigate();
  // const [tour, setTour] = useState({
  //   title: '',
  //   city: '',
  //   address: '',
  //   distance: 0,
  //   price: 0,
  //   maxGroupSize: 0,
  //   desc: '',
  //   reviews: [],
  //   photo: '',
  //   featured: false
  // })
  const [tour, setTour] = useState({
    title: 'sdsfdsa',
    city: 'd',
    address: 'ed',
    distance: 11,
    price: 11,
    maxGroupSize: 32,
    desc: 'ed',
    reviews: [],
    photo: '',
    featured: false
  })
  const handleChange = e => {
    setTour(prev => ({ ...prev, [e.target.id]: e.target.value }))
  }
  const handleSubmit = async e => {
    console.log(tour);
    e.preventDefault()
    let formData = new FormData();
    formData.append("title",tour.title)
    formData.append("city",tour.city)
    formData.append("address",tour.address)
    formData.append("distance",tour.distance)
    formData.append("price",tour.price)
    formData.append("maxGroupSize",tour.maxGroupSize)
    formData.append("desc",tour.desc)
    formData.append("photo",tour.photo)
    console.log(formData)
      // try {
      //    const res = await fetch(`${BASE_URL}/tours/`, {
      //       method:'post',
      //       body: JSON.parse(formData)
      //    })
      //    const result = await res.json()

      //    if(!res.ok) alert(result.message)

      //    navigate('/login')
      // } catch(err) {
      //   console.log(err.message)
      //    alert(err.message)
      // }

      axios.post(`${BASE_URL}/tours/`,formData,{ withCredentials: true ,headers: {
        'Access-Control-Allow-Origin': 'true', 
    }})
      .then((res)=>{
        console.log(res.data)
        navigate('/tours')
      }).catch(err=>{
        console.log(err,"err");
      })
  }
  const handlePhoto = e =>{
    setTour(prev => ({ ...prev, [e.target.id]: e.target.files[0] }))
  }
  return (
    
    <div className='container'>
      <div className="mb-3">
        <label for="exampleFormControlInput1" className="form-label">Title</label>
        <input type="text" className="form-control" id="title" onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label for="exampleFormControlInput1" className="form-label">City</label>
        <input type="text" className="form-control" id="city" onChange={handleChange} />
      </div>
      <div className='row'>
        <div className="mb-3 col-6">
          <label for="exampleFormControlInput1" className="form-label">Duration</label>
          <input type="text" className="form-control" id="address" onChange={handleChange} />
        </div>
        <div className="mb-3 col-6">
          <label for="exampleFormControlInput1" className="form-label">Distance</label>
          <input type="number" className="form-control" id="distance" onChange={handleChange} />
        </div>
      </div>
      <div className='row'>
        <div className="mb-3 col-6">
          <label for="exampleFormControlInput1" className="form-label">Price</label>
          <input type="number" className="form-control" id="price" onChange={handleChange} />
        </div>
        <div className="mb-3 col-6">
          <label for="exampleFormControlInput1" className="form-label">Max Group Size</label>
          <input type="number" className="form-control" id="maxGroupSize" onChange={handleChange} />
        </div>
      </div>
      <div className="mb-3">
        <label for="exampleFormControlTextarea1" className="form-label">Description</label>
        <textarea className="form-control" id="desc" rows="3" onChange={handleChange}></textarea>
      </div>
      <div className="mb-3">
        <label for="exampleFormControlTextarea1" className="form-label">Photo</label>
        <input type="file" name='file' className="form-control" id="photo" onChange={handlePhoto} />
      </div>
      <Button onClick={handleSubmit}>Add Tour</Button>
    </div>
  )
}

export default AddTour
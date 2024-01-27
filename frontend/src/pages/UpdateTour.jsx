import React, { useEffect, useState } from 'react'
import { Button } from 'reactstrap'
import { BASE_URL } from '../utils/config'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'
const UpdateTour = (tours) => {
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
  const [photos,changephotos] = useState(false);
  const location = useLocation();
  const [tour, setTour] = useState({
    title: location.state.title,
    city: location.state.city,
    address: location.state.address,
    distance: location.state.distance,
    price: location.state.price,
    maxGroupSize: location.state.maxGroupSize,
    desc: location.state.desc,
    reviews: [],
    photo: location.state.photo,
  })
  const [featured, setfeatured] = React.useState(location.state.featured);
  const handleCheckBox = (event) => {
    setfeatured(current => !current);
  }
  // const [tour, setTour] = useStat  e({})
  const handleChange = e => {
    setTour(prev => ({ ...prev, [e.target.id]: e.target.value }))
  }
  const handleSubmit = async e => {
    console.log(tour);
    e.preventDefault()
    let formData = new FormData();
    formData.append("title", tour.title)
    formData.append("city", tour.city)
    formData.append("address", tour.address)
    formData.append("distance", tour.distance)
    formData.append("price", tour.price)
    formData.append("maxGroupSize", tour.maxGroupSize)
    formData.append("desc", tour.desc)
    if(photos){
      console.log("my")
      formData.append("photo", tour.photo)
    }
    formData.append("featured",featured)
    // try {
    //    const res = await fetch(`${BASE_URL}/tours/${location.state._id}`, {
    //       method:'put',
    //       headers:{
    //         'content-type':'application/json'
    //       },
    //       body: JSON.stringify(formData)
    //    })
    //    const result = await res.json()

    //    if(!res.ok) alert(result.message)

    //    navigate('/tours')
    // } catch(err) {
    //   console.log(err.message)
    //    alert(err.message)
    // }

    axios.put(`${BASE_URL}/tours/${location.state._id}`, formData, {
      withCredentials: true, headers: {
        'Access-Control-Allow-Origin': 'true',
      }
    })
      .then((res) => {
        console.log(res.data)
        navigate('/tours')
      }).catch(err => {
        console.log(err, "err");
      })
  }
  const handlePhoto = e => {
    changephotos(true);
    setTour(prev => ({ ...prev, [e.target.id]: e.target.files[0] }))
    console.log(tour)
  }

  // useEffect(() => {
  //   console.log(location.state)
  //   // async function myfunction(){
  //   //     var mytourid = localStorage.getItem('UpdatingTour')
  //   //     try {
  //   //      const res = await fetch(`${BASE_URL}/tours/${mytourid}`, {
  //   //         method:'get',
  //   //         headers: {
  //   //             'content-type': 'application/json'
  //   //          },
  //   //      })

  //   //      const result = await res.json()
  //   //      console.log(result.data)
  //   //      if(!res.ok) alert(result.message)
  
  //   //     // setTour(result.data)
  //   //     const updatedValue = {"title":"juice"};
  //   //     // setTour(prev => ({...prev,...updatedValue}));
  //   //     setTour(result.data)
  //   //     console.log(tour)
  //   //     //  navigate('/login')
  //   //   } catch(err) {
  //   //     console.log(err.message)
  //   //      alert(err.message)
  //   //   }
  //   // }
  //   // myfunction();
  //   // console.log(tour)
  //   console.log(featured)
  // }, [])


  return (

    <div className='container'>
      <div className="mb-3">
        <label for="exampleFormControlInput1" className="form-label">Title</label>
        <input type="text" className="form-control" placeholder={location.state.title} id="title" onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label for="exampleFormControlInput1" className="form-label">City</label>
        <input type="text" className="form-control" placeholder={location.state.city} id="city" onChange={handleChange} />
      </div>
      <div className='row'>
        <div className="mb-3 col-6">
          <label for="exampleFormControlInput1" className="form-label">Duration</label>
          <input type="text" className="form-control" placeholder={location.state.address} id="address" onChange={handleChange} />
        </div>
        <div className="mb-3 col-6">
          <label for="exampleFormControlInput1" className="form-label">Distance</label>
          <input type="number" className="form-control" placeholder={location.state.distance} id="distance" onChange={handleChange} />
        </div>
      </div>
      <div className='row'>
        <div className="mb-3 col-6">
          <label for="exampleFormControlInput1" className="form-label">Price</label>
          <input type="number" className="form-control" id="price" placeholder={location.state.price} onChange={handleChange} />
        </div>
        <div className="mb-3 col-6">
          <label for="exampleFormControlInput1" className="form-label">Max Group Size</label>
          <input type="number" className="form-control" id="maxGroupSize" placeholder={location.state.maxGroupSize} onChange={handleChange} />
        </div>
      </div>
      <div className="mb-3">
        <label for="exampleFormControlTextarea1" className="form-label">Description</label>
        <textarea className="form-control" id="desc" rows="3" placeholder={location.state.desc} onChange={handleChange}></textarea>
      </div>
      <div className="form-check">
        <input className="form-check-input" type="checkbox" value={featured} onChange={handleCheckBox}
          id="subscribe"
          name="subscribe" 
          defaultChecked={featured}/>
        <label className="form-check-label" for="flexCheckDefault">
          Featured
        </label>
      </div>
      <div className="mb-3">
        <img src={tour.photo} alt="" style={{ height: "100px", width: "100px", marginBottom: "20px" }} />
        <label for="exampleFormControlTextarea1" className="form-label"></label>

        <input type="file" name='file' className="form-control" id="photo" onChange={handlePhoto} />
      </div>
      <Button onClick={handleSubmit}>Update Tour</Button>
    </div>
  )
}

export default UpdateTour
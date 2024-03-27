import React, { useEffect, useState } from 'react'
import { useMemo } from 'react';
import { BASE_URL } from '../utils/config';
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext'
import dateFormat from 'dateformat';
import { Button } from 'reactstrap'
import { ToastContainer, toast } from 'react-toastify';
const MyBookings = () => {
    const { user } = useContext(AuthContext)
    // useEffect(async (e)=>{
    //     // e.preventDefault()

    //   try {
    //     console.log(user)
    //     //  const res = await fetch(`${BASE_URL}/booking/${user}`, {
    //     //     method:'post',
    //     //     headers: {
    //     //        'content-type':'application/json'
    //     //     },
    //     //     body: JSON.stringify(credentials)
    //     //  })
    //     //  const result = await res.json()

    //     //  if(!res.ok) alert(result.message)

    //     //  dispatch({type:'REGISTER_SUCCESS'})
    //     //  navigate('/login')
    //   } catch(err) {
    //      alert(err.message)
    //   }
    // });
    const [mybooks, setmybooks] = useState([]);
    const navigate = useNavigate()
    const getMyBookings = async () => {
        try {
            console.log(user)
            const res = await fetch(`${BASE_URL}/booking/${user._id}/`, {
                method: 'get',
                headers: {
                    'content-type': 'application/json'
                },
            })
            const result = await res.json()
            setmybooks(result.data)
            // console.log(result.data)
            if (!res.ok) alert(result.message)

            //  dispatch({type:'REGISTER_SUCCESS'})
            //  navigate('/login')
            return () => { }
        } catch (err) {
            alert(err.message)
        }
    }

    const getAllBookings = async () => {
        try {
            console.log(user)
            const res = await fetch(`${BASE_URL}/booking/`, {
                method: 'get',
                headers: {
                    'content-type': 'application/json'
                },
                credentials: 'include',
            })
            const result = await res.json()
            setmybooks(result.data)
            if (!res.ok) alert(result.message)
            return () => { }
        } catch (err) {
            alert(err.message)
        }
    }
    useEffect(() => {
        if (user.roles === 'user') {
            getMyBookings();
        }
        else {
            getAllBookings();
        }
        // getMyBookings();
    }, []);
    const navstotour = async (e) => {
        console.log(e.target.innerText)
        try {
            console.log(user)
            const res = await fetch(`${BASE_URL}/tours/byname/${e.target.innerText}/`, {
                method: 'get',
                headers: {
                    'content-type': 'application/json'
                },
                credentials: 'include',
            })
            const result = await res.json()
            // console.log(result.data[0]._id)
            if (!res.ok) alert(result.message)

            //  dispatch({type:'REGISTER_SUCCESS'})
            navigate(`/tours/${result.data[0]._id}`)
            return () => { }
        } catch (err) {
            alert(err.message)
        }
    }

    const cancelBooking = async (data) => {
        const res = await fetch(`${BASE_URL}/booking/cancel`, {
            method: 'post',
            headers: {
                'content-type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(data)
        })
        const result = res.json()
        if (!res.ok) {
            alert(result.message)
            return;
        }
        toast.error('🙅‍♂️ Your Booking for tour is cancelled. 😊', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
         });
        setTimeout(()=>{
            window.location.reload();
        },3000)
        return () => { }
    }
    const todayDate = new Date();
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
            <div style={{"color":"red" , "fontWeight":"bold"}}>* Cancelled Bookings are Marked as Red.</div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">TourName</th>
                        <th scope="col">Registered Name</th>
                        <th scope="col">Guest Size</th>
                        <th scope="col">Phone No.</th>
                        <th scope="col">Total Amount</th>
                        <th scope="col">Booked At</th>
                        <th scope="col">Tour Date</th>
                        <th scope="col">Cancel Tour</th>
                    </tr>
                </thead>
                {mybooks.map(function (data) {
                    return (
                        <tbody>
                            {data.isCancelled ? <>
                                <tr>
                                    <th onClick={navstotour} style={{"color":"red" , "fontWeight":"bold"}}>{data.tourName}</th>
                                    <td style={{"color":"red" , "fontWeight":"bold"}}>{data.fullName}</td>
                                    <td style={{"color":"red" , "fontWeight":"bold"}}>{data.guestSize}</td>
                                    <td style={{"color":"red" , "fontWeight":"bold"}}>+{data.phone.toString().slice(0, 2)} {data.phone.toString().slice(2)}</td>
                                    <td style={{"color":"red" , "fontWeight":"bold"}}>{data.totals}</td>
                                    <td style={{"color":"red" , "fontWeight":"bold"}}>{dateFormat(data.createdAt, "mmmm dS, yyyy")}</td>
                                    <td style={{"color":"red" , "fontWeight":"bold"}}>{dateFormat(data.bookAt, "mmmm dS, yyyy")}</td>
                                    {/* <td>{new Date(data.bookAt).getTime()}</td>
                        {console.log(new Date(data.bookAt))}
                        <td>{data.bookAt}</td>
                        <td>{new Date(data.bookAt).getTime()}</td> */}
                        <td></td>
                                </tr>
                                </>
                                :
                                <>
                                    <tr>
                                        <th onClick={navstotour}>{data.tourName}</th>
                                        <td>{data.fullName}</td>
                                        <td>{data.guestSize}</td>
                                        <td>+{data.phone.toString().slice(0, 2)} {data.phone.toString().slice(2)}</td>
                                        <td>{data.totals}</td>
                                        <td>{dateFormat(data.createdAt, "mmmm dS, yyyy")}</td>
                                        <td>{dateFormat(data.bookAt, "mmmm dS, yyyy")}</td>
                                        {/* <td>{new Date(data.bookAt).getTime()}</td>
                        {console.log(new Date(data.bookAt))}
                        <td>{data.bookAt}</td>
                        <td>{new Date(data.bookAt).getTime()}</td> */}
                                        {(new Date().getTime() + 86400000 <= new Date(data.bookAt).getTime()) ? <td><Button className='btn btn-danger' onClick={() => { cancelBooking(data) }}>Cancel Tour</Button></td> : <td></td>}
                                    </tr>
                                </>
                    }

                            </tbody>
                            )
            })}
                        </table>
            {/* <MaterialReactTable table={table} /> */ }
                    {/* :<div>Loading....</div> */ }
        </div >

    )
}

export default MyBookings
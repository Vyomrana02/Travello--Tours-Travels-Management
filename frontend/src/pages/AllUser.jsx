import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/config'
import { Button } from 'reactstrap'
const AllUser = () => {
    const [users, setusers] = useState([]);
    useEffect(() => {
        async function temp() {
            try {
                const res = await fetch(`${BASE_URL}/users/`, {
                    method: 'get',
                    headers: {
                        'content-type': 'application/json'
                    },
                    credentials: 'include',
                })
                const result = await res.json()
                console.log(result)
                setusers(result.data)
                if (!res.ok) alert(result.message)
                return () => { }
            } catch (err) {
                alert(err.message)
            }
        }
        temp()
    }, [])
    const makeAdmin = async (data) => {
        data.role = 'admin'
        try {
            const res = await fetch(`${BASE_URL}/users/${data._id}`, {
                method: 'put',
                headers: {
                    'content-type': 'application/json'
                },

                credentials: 'include',
                body: JSON.stringify(data)
            })
            const result = await res.json()

            if (!res.ok) alert(result.message)
        } catch (err) {
            console.log(err.message)
        }
        window.location.reload()
    }
    const makeBan = async (data) => {
        data.isBan = true;
        try {
            const res = await fetch(`${BASE_URL}/users/${data._id}`, {
                method: 'put',
                headers: {
                    'content-type': 'application/json'
                },

                credentials: 'include',
                body: JSON.stringify(data)
            })
            const result = await res.json()

            if (!res.ok) alert(result.message)
        } catch (err) {
            console.log(err.message)
        }
        window.location.reload()
    }
    const unBan = async (data) => {
        data.isBan = false;
        try {
            const res = await fetch(`${BASE_URL}/users/${data._id}`, {
                method: 'put',
                headers: {
                    'content-type': 'application/json'
                },

                credentials: 'include',
                body: JSON.stringify(data)
            })
            const result = await res.json()

            if (!res.ok) alert(result.message)
        } catch (err) {
            console.log(err.message)
        }
        window.location.reload()
    }
    return (
        <div className='container'>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">User Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Type</th>
                        <th scope="col">Add Admin</th>
                        <th scope="col">Ban User</th>
                    </tr>
                </thead>
                {users.map(function (data) {
                    return (
                        <tbody>
                            <tr>
                                <td>{data._id}</td>
                                <td>{data.username}</td>
                                <td>{data.email}</td>
                                <td>{data.role}</td>
                                {data.role === 'user' ? <td><Button className='btn-secondary' onClick={() => { makeAdmin(data) }}>Make Admin</Button></td> : <td></td>}
                                {data.role === 'user' ? (data.isBan === true ? <td><Button className='btn-danger' onClick={() => { unBan(data) }}>unBan User</Button></td> : <td><Button className='btn-danger' onClick={() => { makeBan(data) }}>Ban User</Button></td>) : <td></td>}
                            </tr>
                        </tbody>
                    )
                })}
            </table>
        </div>
    )
}

export default AllUser
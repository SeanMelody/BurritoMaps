import React, { useState } from 'react'
import axios from "axios"

// AT 2 hours 1 min in for VIDEO

const Login = () => {

    const [form, setForm] = useState()

    const onChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const submitLoginForm = async (e) => {
        e.preventDefault()
        console.log("submitted")
        try {
            const loginResult = await axios.post("/users/login", form)
            console.log(loginResult)
        } catch (err) {
            console.log(err.response)
        }
    }

    return (
        <div className="container">
            <form onSubmit={submitLoginForm} >
                <h3 className="col-md-12">Email:</h3>
                <input onChange={onChange} type="text" name="email" className="row col-md-12"></input>
                <h3 className="col-md-12">Password:</h3>
                <input onChange={onChange} ype="text" name="password" className="row col-md-12"></input>
                <input type="submit" className="btn btn-secondary margin10" />
            </form>
        </div >
    )
}

export default Login

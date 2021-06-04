import React, { useState, useContext, useEffect } from 'react'
import userContext from "../Context/UserContext"
import { useHistory } from "react-router-dom"
import axios from "axios"

// AT 2 hours 1 min in for VIDEO

const Login = () => {

    const [form, setForm] = useState()

    const { userData, setUserData } = useContext(userContext)

    const history = useHistory()

    const onChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const submitLoginForm = async (e) => {
        e.preventDefault()
        console.log("submitted")
        try {
            const { data } = await axios.post("/users/login", form)

            console.log(data)

            if (!data.user.confirmed) {
                history.push("/confirm")
                console.log("not confirmed")
            } else {
                console.log("confirmed")
                setUserData({
                    token: data.token,
                    user: data.user
                })

                localStorage.setItem("auth-token", data.token)
                history.push("/")

            }


        } catch (err) {
            console.log(err.response)
        }
    }

    useEffect(() => {
        // console.log(userData)
        if (userData.user) history.push("/")
    }, [userData.user, history])


    return (
        <div className="container">
            <form onSubmit={submitLoginForm} >
                <h3 className="col-md-12">Email:</h3>
                <input onChange={onChange} type="text" name="email" className="row col-md-12"></input>
                <h3 className="col-md-12">Password:</h3>
                <input onChange={onChange} type="password" name="password" className="row col-md-12"></input>
                <input type="submit" className="btn btn-secondary margin10" />
            </form>
        </div >
    )
}

export default Login

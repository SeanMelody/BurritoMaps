import React, { useState } from 'react'
import axios from "axios"

export const Register = () => {

    const [form, setForm] = useState()

    const onChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const submit = (e) => {
        e.preventDefault()
        console.log(form)
    }


    return (
        <div className="container">
            <form onSubmit={submit}>
                <h3 className="col-md-12">Email:</h3>
                <input onChange={onChange} type="text" name="email" className="row col-md-12"></input>

                <h3 className="col-md-12">Password:</h3>
                <input onChange={onChange} type="text" name="password" className="row col-md-12"></input>

                <h3 className="col-md-12">Password Check:</h3>
                <input onChange={onChange} type="text" name="password" className="row col-md-12"></input>

                <h3 className="col-md-12">Display Name:</h3>
                <input onChange={onChange} type="text" name="password" className="row col-md-12"></input>

                <input type="submit" className="btn btn-secondary margin10" />
            </form>
        </div >
    )
}

export default Register
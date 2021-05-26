import React, { useState } from 'react';
import { useHistory } from "react-router-dom"
import axios from "axios";

export const Register = () => {

    const [form, setForm] = useState()

    const history = useHistory()

    const onChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const submit = async (e) => {
        e.preventDefault()
        // console.log(form)

        try {
            const newUser = await axios.post("/users/register", form);
            console.log(newUser)
            history.push("/login")
        } catch (err) {
            console.log(err.response)
        }
    }


    return (
        <div className="container">
            <form onSubmit={submit}>
                <h3 className="col-md-12">Email:</h3>
                <input onChange={onChange} type="text" name="email" className="row col-md-12"></input>

                <h3 className="col-md-12">Password:</h3>
                <input onChange={onChange} type="password" name="password" className="row col-md-12"></input>

                <h3 className="col-md-12">Password Check:</h3>
                <input onChange={onChange} type="password" name="passwordCheck" className="row col-md-12"></input>

                <h3 className="col-md-12">Display Name:</h3>
                <input onChange={onChange} type="text" name="displayName" className="row col-md-12"></input>

                <input type="submit" className="btn btn-secondary margin10" />
            </form>
        </div >
    )
}

export default Register
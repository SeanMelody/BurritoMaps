import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"

const BurritoContainer = () => {

    const [form, setForm] = useState({
        restaurant: "",
        burrito: "",
        ranking: "",
        description: "",
    })

    const [burritos, setBurritos] = useState([])

    const onChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const saveBurrito = async (e) => {
        e.preventDefault()

        // console.log("burrito", form)
        // console.log("token", authToken)

        try {
            const newBurrito = await axios.post("/burritos", form, { headers: { "x-auth-token": localStorage.getItem("auth-token") }, })
            // console.log(newBurrito)

            setBurritos([...burritos, newBurrito])
            notify()
        } catch (err) {
            console.log(err)
        }

    }
    const notify = () => toast("Wow so easy!");

    return (
        <div className="container justify-content-center">
            <ToastContainer />
            <h1>Hello from Burrito Container</h1>
            <form onSubmit={saveBurrito}>
                {/* <input onChange={onChange} type="text" name="restaurant" placeholder="restaurant" className="row col-md-10 margin10 form-control" /> */}
                <select onChange={onChange} name="restaurant" className="row col-md-10 margin10 form-control" >
                    <option value="">--Select a Restaurant--</option>
                    <option value="ElBurritoExpress">El Burrito Express Uno</option>
                    <option value="ElBurritoExpress">El Burrito Express Dos</option>
                    <option value="ElBurritoExpress">La Taqueria</option>
                    <option value="ElBurritoExpress">El Faralito</option>
                    <option value="ElBurritoExpress">Papalote</option>
                    <option value="ElBurritoExpress">Another</option>
                    <option value="ElBurritoExpress">Another</option>
                </select>
                <input onChange={onChange} type="text" name="burrito" placeholder="type of burrito (ex. Chicken, Carne Asada, Beans & Rice)" className="row col-md-10 margin10 form-control" />
                <input onChange={onChange} type="number" name="ranking" placeholder="ranking 1 to 10" min="0" max="10" className="row col-md-10 margin10 form-control" />
                <textarea onChange={onChange} type="text" name="description" placeholder="description" className="row col-md-10 margin10 form-control" />
                <button type="submit" className="btn btn-secondary margin10">Save</button>
            </form>


        </div >
    )
}

export default BurritoContainer

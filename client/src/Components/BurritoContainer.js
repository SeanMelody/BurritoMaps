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
        location: []
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
            // console.log(form.location)
            console.log(newBurrito.data.restaurant)
            // console.log(newBurrito.data.location)
            notify(newBurrito.data.restaurant)
            clearForm()
        } catch (err) {
            console.log(err)
        }

    }
    const notify = (burrito) => toast(`${burrito} Saved!`);

    const clearForm = () => {
        console.log("clear")
        window.location.reload()
        // console.log(form.burrito)
        // form.burrito = ""
        // console.log(form.burrito)

    }


    if (form.restaurant === "El Burrito Express Uno") {
        form.location = [{ latitude: 37.74251, longitude: -122.48549 }]
    }
    if (form.restaurant === "El Burrito Express Dos") {
        form.location = [{ latitude: 37.78644, longitude: -122.443994 }]
    }
    if (form.restaurant === "La Taqueria") {
        form.location = [{ latitude: 37.75087, longitude: -122.41818 }]
    }
    if (form.restaurant === "El Faralito") {
        form.location = [{ latitude: 37.75263, longitude: -122.41833 }]
    }
    if (form.restaurant === "Papalote") {
        form.location = [{ latitude: 37.77575, longitude: -122.44598 }]
    }
    if (form.restaurant === "Taqueria Los Coyotes") {
        form.location = [{ latitude: 37.76515, longitude: -122.42042 }]
    }
    if (form.restaurant === "Pancho Villa Taqueria") {
        form.location = [{ latitude: 37.76483, longitude: -122.42115 }]
    }
    if (form.restaurant === "Taqueria La Cumbre") {
        form.location = [{ latitude: 37.76458, longitude: -122.42165 }]
    }

    if (form.restaurant === "El Castillito") {
        form.location = [{ latitude: 37.76876, longitude: -122.42931 }]
    }

    if (form.restaurant === "El Faro") {
        form.location = [{ latitude: 37.75906, longitude: -122.41452 }]
    }

    if (form.restaurant === "Taqueria Cancun") {
        form.location = [{ latitude: 37.76049, longitude: -122.41942 }]
    }

    if (form.restaurant === "Another") {
        form.location = [{ latitude: 37.7000, longitude: -122.48000 }]
    }


    return (
        <div className="container justify-content-center">
            <ToastContainer />
            <form onSubmit={saveBurrito}>
                <select onChange={onChange} name="restaurant" className="row col-md-10 margin10 form-control" >
                    <option value="">--Select a Restaurant--</option>
                    <option value="El Burrito Express Uno">El Burrito Express Uno</option>
                    <option value="El Burrito Express Dos">El Burrito Express Dos</option>
                    <option value="La Taqueria">La Taqueria</option>
                    <option value="El Faralito">El Faralito</option>
                    <option value="Papolote">Papalote</option>
                    <option value="Taqueria Los Coyotes">Taqueria Los Coyotes</option>
                    <option value="Pancho Villa Taqueria">Pancho Villa Taqueria</option>
                    <option value="Taqueria La Cumbre">Taqueria La Cumbre</option>
                    <option value="El Castillito">El Castillito Church Street</option>
                    <option value="El Faro">El Faro</option>
                    <option value="Taqueria Cancun">Taqueria Cancun</option>
                    <option value="Another">Another</option>
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

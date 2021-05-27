import React, { useState } from 'react'
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
            console.log(newBurrito)

            setBurritos([...burritos, newBurrito])
        } catch (err) {
            console.log(err)
        }

    }

    // useEffect(() => {
    //     // let isMounted = true
    //     (async () => {
    //         try {
    //             const allBurritos = await axios.get("/burritos", {
    //                 headers: { "x-auth-token": localStorage.getItem("auth-token") },
    //             })

    //             console.log(allBurritos.data)
    //             setBurritos(allBurritos.data)
    //         } catch (err) {
    //             console.log(err)
    //         }
    //     })()
    //     // console.log("use Effect")
    // }, [])

    return (
        <div className="container justify-content-center">
            <h1>Hello from Burrito Container</h1>
            <form onSubmit={saveBurrito}>
                <input onChange={onChange} type="text" name="restaurant" placeholder="restaurant" className="row col-md-10 margin10" />
                <input onChange={onChange} type="text" name="burrito" placeholder="burrito" className="row col-md-10 margin10" />
                <input onChange={onChange} type="text" name="ranking" placeholder="ranking 1 to 10" className="row col-md-10 margin10" />
                <textarea onChange={onChange} type="text" name="description" placeholder="description" className="row col-md-10 margin10" />
                <button type="submit" className="btn btn-secondary margin10">Save</button>
            </form>


        </div >
    )
}

export default BurritoContainer

import React, { useState, useEffect } from 'react'
import axios from "axios"

const YourBurritos = () => {

    const [burritos, setBurritos] = useState([])


    useEffect(() => {
        // let isMounted = true
        (async () => {
            try {
                const allBurritos = await axios.get("/burritos", {
                    headers: { "x-auth-token": localStorage.getItem("auth-token") },
                })

                console.log(allBurritos.data)
                setBurritos(allBurritos.data)
            } catch (err) {
                console.log(err)
            }
        })()
        // console.log("use Effect")
    }, [])


    return (

        <div className="allBurritos">
            <h1>Your burrtios</h1>
            {burritos.map((burrito, index) => (
                <div key={index} >
                    <p>{burrito.burrito}</p>
                </div>
            ))}
        </div>
    )
}

export default YourBurritos

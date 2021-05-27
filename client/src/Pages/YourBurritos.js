import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from "react-router-dom"
import userContext from "../Context/UserContext"
import axios from "axios"

const YourBurritos = () => {

    const [burritos, setBurritos] = useState([])

    const { userData } = useContext(userContext)

    const history = useHistory()

    useEffect(() => {
        if (!userData.user) {
            history.push("/login")
        }

        // console.log(userData.user)

        userData.user
            ? console.log(userData.user.displayName)
            : console.log("Not here yet")

    }, [userData.user, history])


    useEffect(() => {
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
    }, [])


    return (

        <div className="allBurritos">
            <h1>Your Burritos</h1>
            {burritos.map((burrito, index) => (
                <div key={index} >
                    <p>{burrito.burrito}</p>
                </div>
            ))}
        </div>
    )
}

export default YourBurritos

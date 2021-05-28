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

        <div className="allBurritos container">
            <h1>Your Burritos</h1>

            {burritos.length ? (
                <div className="table-responsive">
                    <table className="table table-striped text-center table-hover">
                        <thead>
                            <th>Restaurant</th>
                            <th>Burrito</th>
                            <th>Ranking (1 to 10)</th>
                        </thead>
                        {burritos.map((burrito, index) => (
                            <tbody key={index}>
                                <tr>
                                    <td>{burrito.restaurant} </td>
                                    <td>{burrito.burrito} </td>
                                    <td>{burrito.ranking} </td>

                                </tr>


                            </tbody>

                        ))}


                    </table>
                </div>


            ) :
                (<h1>No saved burritos</h1>)}

            {burritos.map((burrito, index) => (
                <div key={index} className="card">
                    <div>
                        <h3 className="card-title">{burrito.restaurant}</h3>
                        <hr></hr>
                        <div className="card-body">
                            <h5>Burrito Name:</h5>
                            <p>{burrito.burrito}</p>
                            <h5>Ranking (1 to 10):</h5>
                            <p>{burrito.ranking}</p>
                            <h5>Description:</h5>
                            <p>{burrito.description}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default YourBurritos



// Card for burritos                
// <div key={index} className="card">
// <div>
//     <h3 className="card-title">{burrito.restaurant}</h3>
//     <hr></hr>
//     <div className="card-body">
//         <h5>Burrito Name:</h5>
//         <p>{burrito.burrito}</p>
//         <h5>Ranking (1 to 10):</h5>
//         <p>{burrito.ranking}</p>
//         <h5>Description:</h5>
//         <p>{burrito.description}</p>
//     </div>
// </div>
// </div>

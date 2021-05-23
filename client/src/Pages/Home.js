import React, { useContext, useEffect } from 'react'
import { useHistory } from "react-router-dom"
import userContext from "../Context/UserContext"


export const Home = (props) => {

    const { userData } = useContext(userContext)

    const history = useHistory()

    useEffect(() => {
        if (!userData.user) {
            history.push("/login")
        }

    }, [userData.user, history])

    return (
        <div>
            <h1> hi from home</h1>
            <button onClick={props.logout} className="btn btn-danger margin10">Logout</button>
        </div>
    )
}


export default Home
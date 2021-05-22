import React, { useContext, useEffect } from 'react'
import { useHistory } from "react-router-dom"
import userContext from "../Context/UserContext"


export const Home = () => {

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
        </div>
    )
}


export default Home
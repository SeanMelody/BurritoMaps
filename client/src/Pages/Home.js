import React, { useContext, useEffect } from 'react'
import { useHistory } from "react-router-dom"
import userContext from "../Context/UserContext"
import BurritoContainer from "../Components/BurritoContainer"


export const Home = (props) => {

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

    return (
        <div>
            <h1> hi from home</h1>
            <h3> Welcome: {userData.user?.displayName}</h3>
            <BurritoContainer />
        </div>
    )
}


export default Home
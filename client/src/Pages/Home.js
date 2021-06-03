import React, { useContext, useEffect } from 'react'
import { useHistory } from "react-router-dom"
import userContext from "../Context/UserContext"
import BurritoContainer from "../Components/BurritoContainer"
import axios from 'axios'


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


    const deleteUser = async () => {

        try {
            await axios.delete("/users", {
                headers: { "x-auth-token": localStorage.getItem("auth-token") },
            });

            history.push("/")
        } catch (err) {
            console.log(`Error deleting: ${err}`)
            console.log(err)
        }

    }

    return (
        <div>
            <h1> hi from home</h1>
            <h3> Welcome: {userData.user?.displayName}</h3>
            <button onClick={deleteUser} className="btn btn-danger">Delete Your Account</button>
            <BurritoContainer />
        </div>
    )
}


export default Home
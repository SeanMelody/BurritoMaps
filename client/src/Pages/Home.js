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

        // console.log(userData.user)

        userData.user
            ? console.log(userData.user.displayName)
            : console.log("not here")
    }, [userData.user, history])

    return (
        <div>
            <h1> hi from home</h1>
            <h3> Welcome: {" "}
                {userData.user
                    ? (userData.user.displayName)
                    : null}
            </h3>
            <button onClick={props.logout} className="btn btn-danger margin10">Logout</button>
        </div>
    )
}


export default Home
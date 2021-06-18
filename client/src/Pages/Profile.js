import React, { useContext, useEffect } from 'react'
import { useHistory } from "react-router-dom"
import userContext from "../Context/UserContext"
import axios from 'axios'


export const Profile = (props) => {


    const { userData, setUserData } = useContext(userContext)

    const history = useHistory()

    const logout = () => {
        setUserData({ token: undefined, user: undefined })
        localStorage.setItem("auth-token", "")
    }

    useEffect(() => {
        if (!userData.user) {
            history.push("/login")
        }

        // console.log(userData.user)

        userData.user
            ? console.log(userData.user.displayName)
            : console.log("User loading")

    }, [userData.user, history])


    const deleteUser = async () => {

        try {
            await axios.delete("/users", {
                headers: { "x-auth-token": localStorage.getItem("auth-token") },
            });

            history.push("/");
        } catch (err) {
            console.log(`Error deleting: ${err}`)
            console.log(err)
        }

    }

    return (
        <div>
            {/* <h1> hi from Profile</h1> */}
            <h1> Welcome: {userData.user?.displayName}</h1>
            <button onClick={deleteUser} className="btn btn-danger">Delete Your Account</button>
            <button onClick={logout} className="btn btn-info">Logout</button>
            {/* <Link to="/" onClick={logout} style={loginLogoutStyles}>
                <button className="btn btn-outline-danger">
                    Logout
                </button>
            </Link> */}
            {/* <BurritoContainer /> */}
        </div>
    )
}


export default Profile
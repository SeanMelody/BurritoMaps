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

    const updatePhoto = () => {
        console.log("Update Photo")
    }

    const updateUserName = () => {
        console.log("Update User Name")
    }

    const updateEmail = () => {
        console.log("Update Email")
    }

    return (
        <div className="card">
            {/* <h1> hi from Profile</h1> */}
            <h1 className="card-title"> Welcome: {userData.user?.displayName}</h1>
            <hr></hr>
            <div className="card-body">
                <div className="row justify-content-center">
                    <button onClick={logout} className="btn btn-secondary col-md-6 margin10">Logout</button>
                </div>
                <div className="row justify-content-center">
                    <button onClick={updatePhoto} className="btn btn-info row col-md-6 margin10">Change Photo</button>
                </div>
                <div className="row justify-content-center">
                    <button onClick={updateUserName} className="btn btn-info row col-md-6 margin10"> Change User Name</button>
                </div>
                <div className="row justify-content-center">
                    <button onClick={updateEmail} className="btn btn-info row col-md-6 margin10"> Change Email</button>
                </div>
            </div>
            <div className="card-footer">
                <button onClick={deleteUser} className="btn btn-danger">Delete Your Account</button>
            </div>
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
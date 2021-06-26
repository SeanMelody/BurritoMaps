// Inport all the goodness
import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from "react-router-dom"
import userContext from "../Context/UserContext"
import axios from 'axios'


export const Profile = (props) => {

    // All the necessary state and useHistory
    const [update, setUpdate] = useState()

    const onChange = (e) => {
        setUpdate({ ...update, [e.target.name]: e.target.value })
    }

    const { userData, setUserData } = useContext(userContext)

    const history = useHistory()

    // Logout function, sets the user data to undefined, and resets local storage.
    const logout = () => {
        setUserData({ token: undefined, user: undefined })
        localStorage.setItem("auth-token", "")
    }

    // Use effect to make sure the user is signed in, and if not, then send to login
    useEffect(() => {
        if (!userData.user) {
            history.push("/login")
        }

        // console.log(userData.user)

        userData.user
            ? console.log(userData.user.displayName)
            : console.log("User loading")

    }, [userData.user, history])

    // Function to delete the user and all their posts
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

    // Update Photo Function, now just console logging
    const updatePhoto = (e) => {
        e.preventDefault()
        console.log("Update Photo")
    }

    // Update username function, now just console logging
    const updateUserName = async (e) => {
        e.preventDefault()
        console.log("Update User Name")

        console.log("old name", userData.user.displayName)
        console.log("new name", update.updateUserName)

        // console.log(update)

        // try {
        //     // await axios.put("/users")
        //     // console.log("profile updateUserName")
        //     await axios.put("/users", {
        //         headers: { "x-auth-token": localStorage.getItem("auth-token") },
        //     });

        // } catch (err) {
        //     console.log(`Error updating User Name: ${err}`)
        //     console.log(err)
        // }
    }

    // Update Email Function, now just console logging
    const updateEmail = (e) => {
        e.preventDefault()
        console.log("Update Email")
        console.log("old email", userData.user.email)
        console.log("new email", update.updateUserEmail)
    }

    return (
        <div className="card">
            {/* <h1> hi from Profile</h1> */}
            <div className="row justify-content-center card-title margin10">
                <h1 className="col-md-12">Welcome: {userData.user?.displayName}</h1>
                <button onClick={logout} className=" row btn btn-secondary col-md-6 margin10">Logout</button>
            </div>
            <hr></hr>
            <div className="card-body">
                {/* <div className="row justify-content-center">
                    <button onClick={logout} className="btn btn-secondary col-md-6 margin10">Logout</button>
                </div> */}
                <div className="row justify-content-center">
                    <img src="http://placekitten.com/200/300"></img>
                </div>
                <div className="row justify-content-center">
                    <button onClick={updatePhoto} className="btn btn-info col-md-4 margin10">Change Photo</button>
                </div>
                <div className="row justify-content-center">
                    <input onChange={onChange} type="text" name="updateUserName" placeholder={userData.user?.displayName} className="col-md-4 margin10"></input>
                    <button onClick={updateUserName} className="btn btn-info col-md-4 margin10">Change User Name</button>
                </div>
                <div className="row justify-content-center">
                    <input onChange={onChange} type="text" name="updateUserEmail" placeholder={userData.user?.email} className="col-md-4 margin10"></input>
                    <button onClick={updateEmail} className="btn btn-info col-md-4 margin10">Change Email</button>
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
import React from 'react'

const Login = () => {
    return (
        <div className="container">
            <form onSubmit={(e) => {
                e.preventDefault()
                console.log("submitted")
            }}>
                <h3 className="col-md-12">Email:</h3>
                <input type="text" name="email" className="row col-md-12"></input>
                <h3 className="col-md-12">Password:</h3>
                <input type="text" name="password" className="row col-md-12"></input>
                <input type="submit" className="btn btn-secondary margin10" />
            </form>
        </div >
    )
}

export default Login

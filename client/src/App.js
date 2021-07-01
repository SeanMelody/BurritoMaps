import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import { useEffect, useState } from "react"
// import Nav from "./Components/Nav"
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import Profile from "./Pages/Profile"
import YourBurritos from "./Pages/YourBurritos"
import Confirm from "./Pages/Confirm"
import UserContext from "./Context/UserContext"
import ConfirmAccount from './Pages/ConfirmAccount'
import Map from './Pages/Map'
import AddBurrito from './Pages/AddBurrito'
import Clusters from './Pages/Clusters'
import axios from 'axios';

function App() {

  // Set up UserData state
  const [userData, setUserData] = useState({
    user: undefined,
    token: undefined
  })

  // Function to check if logged in via auth token
  const checkLoggedIn = async () => {
    let token = localStorage.getItem("auth-token")

    if (token === null) {
      localStorage.setItem("auth-token", "")
    }

    // If no auth token, call the database and set the userData
    else {
      try {
        const userRes = await axios.get("/users", {
          headers: { "x-auth-token": token },
        })
        setUserData({ token, user: userRes.data })
      } catch (err) {
        console.log("User must log in")
      }
    }
  }

  // Use effect to check if logged in on page load
  useEffect(() => {
    checkLoggedIn()
  }, [])


  // Styles for the buttons in the navbar
  let loginLogoutStyles = {
    height: "30px",
    float: "around",
    textDecoration: "none",
    fontSize: "24px",
    margin: "10px",
  }

  // Return the whole app
  return (
    <div className="App">
      <Router>
        {!userData.user ?
          <>
            <nav className="navbar">
              <Link to="/clusters" style={loginLogoutStyles}>
                <h1>Burrito Maps</h1>
              </Link>
              <Link to="/login" style={loginLogoutStyles}>
                <button className="btn btn-outline-primary">
                  Login
                </button>
              </Link>
              <Link to="/register" style={loginLogoutStyles}>
                <button className="btn btn-outline-primary">
                  Register
                </button>
              </Link>
            </nav>
          </>

          : <>
            <nav className="navbar">
              <Link to="/map" style={loginLogoutStyles}>
                <h1>Burrito Maps</h1>
              </Link>
              <Link to="/clusters" style={loginLogoutStyles}>
                <button className="btn btn-outline-primary">
                  Clusters
                </button>
              </Link>
              <Link to="/addBurrito" style={loginLogoutStyles}>
                <button className="btn btn-outline-dark">
                  Add Burritos
                </button>
              </Link>
              <Link to="/yourBurritos" style={loginLogoutStyles}>
                <button className="btn btn-outline-success">
                  Your Burritos
                </button>
              </Link>
              <Link to="/profile" style={loginLogoutStyles}>
                <button className="btn btn-outline-info">
                  Profile
                </button>
              </Link>
            </nav>
          </>
        }
        {/* User context to make sure the user is lgged in */}
        <UserContext.Provider value={{ userData, setUserData }} >
          <Switch>
            <Route path="/clusters" component={Clusters} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/confirm" component={Confirm} />
            <Route path="/addBurrito" component={AddBurrito} />
            <Route path="/yourBurritos" component={YourBurritos} />
            <Route path="/confirm_token:token" component={ConfirmAccount} />
            <Route path="/profile" component={Profile} />
            <Route path="/" component={Map} />
          </Switch>
        </UserContext.Provider>
      </Router>
    </div>
  );
}

// Export the app
export default App;
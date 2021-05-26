import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import { useEffect, useState } from "react"
// import Nav from "./Components/Nav"
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import Home from "./Pages/Home"
import UserContext from "./Context/UserContext"
import axios from 'axios';

function App() {

  const [userData, setUserData] = useState({
    user: undefined,
    token: undefined
  })


  const checkLoggedIn = async () => {
    let token = localStorage.getItem("auth-token")
    if (token === null) {
      localStorage.setItem("auth-token", "")
    }
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

  const logout = () => {
    setUserData({ token: undefined, user: undefined })
    localStorage.setItem("auth-token", "")
  }


  useEffect(() => {
    checkLoggedIn()
  }, [])

  let loginLogoutStyles = {
    height: "30px",
    float: "around",
    textDecoration: "none",
    fontSize: "24px",
    margin: "10px",
  }

  return (
    <div className="App">

      {/* <h1>Burrito Maps!</h1> */}
      <Router>
        {!userData.user ?
          <>
            <nav className="navbar">
              <h1>Burrito Maps</h1>
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
              <h1>Burrito Maps</h1>
              <Link to="/" onClick={logout} style={loginLogoutStyles}>
                <button className="btn btn-outline-danger">
                  Logout
                </button>
              </Link>
            </nav>
          </>
        }
        <UserContext.Provider value={{ userData, setUserData }} >
          {/* <Nav /> */}
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/" component={Home} />
          </Switch>
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;

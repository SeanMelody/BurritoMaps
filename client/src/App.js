import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { useEffect, useState } from "react"
import Nav from "./Components/Nav"
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
      const userRes = await axios.get("/users", {
        headers: { "x-auth-token": token },
      })

      console.log("User", userRes)


      setUserData({ token, user: userRes.data })
    }
  }

  const logout = () => {
    setUserData({ token: undefined, user: undefined })
    localStorage.setItem("auth-token", "")
  }


  useEffect(() => {
    checkLoggedIn()
  }, [])

  return (
    <div className="App">

      <h1>Burrito Maps!</h1>
      <Router>
        <UserContext.Provider value={{ userData, setUserData }} >
          <Nav />
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/">
              <Home logout={logout} />
            </Route>
          </Switch>
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;

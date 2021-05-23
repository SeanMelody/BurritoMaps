import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { useEffect, useState } from "react"
import Nav from "./Components/Nav"
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import Home from "./Pages/Home"
import UserContext from "./Context/UserContext"

function App() {

  const [userData, setUserData] = useState({
    user: undefined,
    token: undefined
  })



  const checkLoggedIn = () => {
    let token = localStorage.getItem("auth-token")
    if (token === null) {
      localStorage.setItem("auth-token", "")
    }
    // else {
    //   setUserData
    // }
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
            <Route path="/" component={Home} />
          </Switch>
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;

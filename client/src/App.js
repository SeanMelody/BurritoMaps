import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { useEffect, useState } from "react"
import Nav from "./Components/Nav"
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import Home from "./Pages/Home"

function App() {

  useEffect(() => {
    console.log("hello")
  }, [])

  return (
    <div className="App">
      <Nav />
      <h1>Burrito Maps!</h1>
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/" component={Home} />
        </Switch>

      </Router>
    </div>
  );
}

export default App;

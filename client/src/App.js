import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import Home from "./Pages/Home"

function App() {
  return (
    <div className="App">
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

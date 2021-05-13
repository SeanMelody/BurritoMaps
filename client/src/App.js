import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Login from "./Pages/Login"

function App() {
  return (
    <div className="App">
      <h1>Burrito Maps!</h1>
      <Router>
        <Switch>
          <Route />
          <Route />
          <Route />
        </Switch>

      </Router>
    </div>
  );
}

export default App;

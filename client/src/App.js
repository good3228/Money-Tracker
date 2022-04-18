import { BrowserRouter, Route, Switch} from "react-router-dom";
import './App.css';
import Home from "./Pages/Home";
import Login from "./Pages/users/Login"
import Register from "./Pages/users/Register"

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path = "/" component={Home} />
        <Route exact path = "/login" component={Login} />
        <Route exact path = "/register" component={Register} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
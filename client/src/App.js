import { BrowserRouter, Route, Switch} from "react-router-dom";
import './App.css';
import Home from "./Pages/Home";
import Login from "./Pages/users/Login"
import Register from "./Pages/users/Register"
import Navbar from "./components/Navigation/Navbar";
import AddExpense from "./Pages/expense/AddExpense";
import AddIncome from "./Pages/income/AddIncome";
import Profile from "./Pages/users/Profile";
function App() {
  return (
    <BrowserRouter>
      <Navbar></Navbar>
      <Switch>
        <Route exact path = "/" component={Home} />
        <Route exact path = "/login" component={Login} />
        <Route exact path = "/add-income" component={AddIncome} />
        <Route exact path = "/add-expense" component={AddExpense} />
        <Route exact path = "/profile" component={Profile} />
        <Route exact path = "/register" component={Register} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
import { BrowserRouter, Route, Switch} from "react-router-dom";
import './App.css';
import Home from "./Pages/Home";
import Login from "./Pages/users/Login"
import Register from "./Pages/users/Register"
import Navbar from "./components/Navigation/Navbar";
import AddExpense from "./Pages/Expenses/AddExpense";
import ExpenseList from "./Pages/Expenses/ExpensesList"
import IncomeList from "./Pages/income/IncomeList"
import AddIncome from "./Pages/income/AddIncome";
import Profile from "./Pages/users/Profile";
import EditExpense from './Pages/Expenses/EditExpense'


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
        <Route exact path = "/userExpense" component = {ExpenseList} />
        <Route exact path = "/edit-expense" component = {EditExpense} />
        <Route exact path = "/userIncome" component = {IncomeList} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
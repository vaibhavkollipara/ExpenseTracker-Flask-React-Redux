import React, { Component } from 'react';
import './App.css';
import ExpenseList from './containers/expenseslist';
import AddExpense from './components/addexpense';

class App extends Component {
  render() {
    return (
      <div className="App container">
        <h2>Expense Tracker</h2>
        <hr/>
        <h3>Add Expense</h3>
        <AddExpense />
        <hr/>
        <h3>Expenses</h3>
        <ExpenseList/>
      </div>
    );
  }
}

export default App;

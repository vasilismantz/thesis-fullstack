import React, { Component } from "react";

import "../App.css";
import Infobox from "./infobox";
import Calendar from "./Calendar";
import ChartsPage from "./ChartsPage";
import axios from 'axios'
export default class Dashboard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      totalEmployees: '',
      totalExpenses: '',
    }
  }

  componentDidMount() {
    axios({
      method: 'get',
      url: '/api/users/total',
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
    })
    .then(res => {
      console.log('res',res)
      this.setState({totalEmployees: parseInt(res.data)})
    })
    .catch(err => console.log(err))

    axios({
      method: 'get',
      url: '/api/expenses/year/2020',
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
    })
    .then(res => {
      let array = res.data
      let sum = array.reduce((a, b) => ({expenses: parseInt(a.expenses) + parseInt(b.expenses)}))
      this.setState({totalExpenses: sum.expenses})
    })
  }
  render() {    
    return (
      <div>
        {/* First Row with small info-boxes */}
        <div className="row pt-4">
          {/* First info-box */}
          <div className="col-md-4 col-sm-6 col-xs-12">
            <Infobox
              title="Total Employees"
              description={this.state.totalEmployees}
              color="bg-success"
              icon="fa fa-users"
            />
          </div>
          {/* Second info-box */}
          <div className="col-md-4 col-sm-6 col-xs-12">
            <Infobox
              title="Total Expenses"
              description={this.state.totalExpenses + "€"}
              color="bg-danger"
              icon="fa fa-shopping-cart"
            />
          </div>
          {/* Third info-box */}
          <div className="col-md-4 col-sm-6 col-xs-12">
            <Infobox title="This is a title" />
          </div>
        </div>
        {/* Second Row with Calendar and Expense Report */}
        <div className="row pt-4">
          {/* Calendar */}
          <div className="col-sm-6">
            <Calendar />
          </div>
          {/* Expense Report & Expense Report */}
          <div className="col-md-6">
            <div className="panel panel-default">
              <div className="panel-heading with-border" style={{ "backgroundColor": "#515e73", color: "white" }}>
                <h3 className="panel-title">Expense Report</h3>
              </div>
              <ChartsPage />
            </div>
            <div className="panel panel-default">
              <div className="panel-heading with-border">
                <h3 className="panel-title">Expense Report</h3>
              </div>
              <ChartsPage />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

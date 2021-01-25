import React, { Component } from "react";

import "../../App.css";
import Infobox from "../infobox";
import Calendar from "../Calendar";
import ExpenseChartsPage from "../manager/ExpenseChartsPage";
import RecentApplciations from "../manager/RecentApplications";
import RecentAnnouncements from "../RecentAnnouncementsManagerEmp";
import axios from "axios";

export default class DashboardManager extends Component {
  constructor(props) {
    super(props);

    this.state = {
      totalEmployees: 0,
      totalExpenses: 0,
      totalPayments: 0,
      recentApplications: [],
    };
  }

  componentDidMount() {
    let departmentId = JSON.parse(localStorage.getItem("user")).departmentId;
    // Fetch Employees Total
    axios({
      method: "get",
      url: "/api/users/total/department/" + departmentId,
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => {
        this.setState({ totalEmployees: parseInt(res.data) });
      })
      .catch((err) => console.log(err));

    //Fetch Expenses Total
    axios({
      method: "get",
      url: "/api/expenses/year/2021/department/" + departmentId,
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }).then((res) => {
      let array = res.data;
      if (array.length > 0) {
        let sum = array.reduce((a, b) => ({
          expenses: parseInt(a.expenses) + parseInt(b.expenses),
        }));
        this.setState({ totalExpenses: sum.expenses });
      } else {
      }
    });
  }
  render() {
    return (
      <div>
        {/* First Row with small info-boxes */}
        <div className="row pt-4">
          {/* First info-box */}
          <div className="col-md-4 col-sm-6 col-xs-12">
            <Infobox
              title="Department Employees"
              description={this.state.totalEmployees}
              color="bg-success"
              icon="fa fa-users"
            />
          </div>
          {/* Second info-box */}
          <div className="col-md-4 col-sm-6 col-xs-12">
            <Infobox
              title="Department Expenses"
              description={this.state.totalExpenses + "€"}
              color="bg-warning"
              icon="fa fa-shopping-cart"
            />
          </div>
        </div>
        {/* Second Row with Calendar and Expense Report */}
        <div className="row pt-4">
          {/* Calendar */}
          <div className="col-sm-6">
            <Calendar />
          </div>
          {/* Expense Report & Recent Applications */}
          <div className="col-md-6">
            <div className="panel panel-default">
              <div
                className="panel-heading with-border"
                style={{ backgroundColor: "#515e73", color: "white" }}
              >
                <h3 className="panel-title">Department Expense Report</h3>
              </div>
              <ExpenseChartsPage />
            </div>
            <div className="panel panel-default">
              <div
                className="panel-heading with-border"
                style={{ backgroundColor: "#515e73", color: "white" }}
              >
                <h3 className="panel-title">Recent Applications</h3>
              </div>
              <RecentApplciations />
            </div>
            <div className="panel panel-default">
              <div
                className="panel-heading with-border"
                style={{ backgroundColor: "#515e73", color: "white" }}
              >
                <h3 className="panel-title">Recent Announcements</h3>
              </div>
              <RecentAnnouncements />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

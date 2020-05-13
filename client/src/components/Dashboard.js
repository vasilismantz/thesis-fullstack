import React, { Component } from "react";

import "../App.css";
import Infobox from "./infobox";
import Calendar from "./Calendar";
import NewChartsPage from "./ChartsPage";

export default class Dashboard extends Component {
  render() {
    return (
      <div>
        {/* First Row with small info-boxes */}
        <div className="row pt-4">
          {/* First info-box */}
          <div className="col-md-4 col-sm-6 col-xs-12">
            <Infobox
              title="Total Employees"
              description=""
              color="bg-success"
              icon="fa fa-users"
            />
          </div>
          {/* Second info-box */}
          <div className="col-md-4 col-sm-6 col-xs-12">
            <Infobox
              title="Total Expenses"
              description=""
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
              <div className="panel-heading with-border" style={{"background-color": "#515e73", color: "white"}}>
                <h3 class="panel-title">Expense Report</h3>
              </div>
              <NewChartsPage />
            </div>
            <div className="panel panel-default">
            <div className="panel-heading with-border">
                <h3 class="panel-title">Expense Report</h3>
              </div>
              <NewChartsPage />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

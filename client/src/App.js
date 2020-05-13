import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import Sidebar from "./Layout/Sidebar";
import Dashboard from "./components/Dashboard"
import Layout from "./Layout/Layout";
import EmployeeList from "./components/EmployeeList";
import EmployeeAdd from "./components/EmployeeAdd"

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Header />
          <Sidebar />
          <Layout>
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route exact path="/employee-list" component={EmployeeList} />
              <Route exact path="/employee-add" component={EmployeeAdd} />
            </Switch>
          </Layout>
          <Footer></Footer>
        </Router>
      </div>
    );
  }
}

import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import Sidebar from "./Layout/Sidebar";
import Dashboard from "./components/Dashboard";
import Layout from "./Layout/Layout";
import EmployeeList from "./components/EmployeeList";
import EmployeeAdd from "./components/EmployeeAdd";
import EmployeeView from './components/EmployeeView'
import EmployeeEdit from "./components/EmployeeEdit";
import DepartmentList from "./components/DepartmentList"
import ApplicationList from "./components/ApplicatonList"
import Register from "./components/Register";
import withAuth from "./withAuth";
import Login from "./components/Login";
import JobList from "./components/JobList";

export default class App extends Component {
  render() {
    return (
      <>
        <Router>
            <Switch>
              <Route exact path="/login" component={LoginContainer} />
              <Route exact path="/register" component={RegisterContainer} />
              <Route path="/" component={withAuth(DefaultContainer)} />
            </Switch>
        </Router>
      </>
    )
  }
}

const LoginContainer = () => (
  <div style={{display: "flex", justifyContent: "center", alignItems: "center", position: "relative", height: "600px"}}>
    <Route exact path="/" render={() => <Redirect to="/login" />} />
    <Route path="/login" component={Login} />
  </div>
)

const RegisterContainer = () => (
  <div style={{display: "flex", justifyContent: "center", alignItems: "center", position: "relative", height: "600px"}}>
    <Route exact path="/" render={() => <Redirect to="/register" />} />
    <Route path="/register" component={Register} />
  </div>
)

const DefaultContainer = () => (
  <div>
    <Header />
    <Sidebar />
    <Layout>
      <Switch>
        <Route exact path="/" component={withAuth(Dashboard)} />
        <Route exact path="/employee-list" component={withAuth(EmployeeList)} />
        <Route exact path="/employee-add" component={withAuth(EmployeeAdd)} />
        <Route exact path="/employee-view" component={withAuth(EmployeeView)} />
        <Route exact path="/employee-edit" component={withAuth(EmployeeEdit)} />
        <Route exact path="/departments" component={withAuth(DepartmentList)} />
        <Route exact path="/job-list" component={withAuth(JobList)} />
        <Route exact path="/application-list" component={withAuth(ApplicationList)} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </Layout>
    <Footer />
  </div>
)

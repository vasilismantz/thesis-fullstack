import React, { Component } from "react";
import { Card, Table, Button, Form, Alert } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import AddDepartment from "./DepartmentAdd";
import axios from "axios";
import moment from 'moment'

export default class DepartmentList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      applications: [],
      currentPage: 1,
      applicationsPerPage: 10,
      selectedApplications: null,
      done: false,
      hasError: false,
      errorMsg: "",
      completed: false,
      showModel: false,
    };
  }

  componentDidMount() {
    axios({
      method: "get",
      url: "/api/applications",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }).then((res) => {
      this.setState({ applications: res.data }, () => {
          console.log('applications', this.state.aplications)
      });
    });
  }

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value,
    });
  };

  onEdit(department) {
    return (event) => {
      event.preventDefault();

      this.setState({ selectedDepartment: department, showModel: true });
    };
  }

  onDelete(department) {
    return (event) => {
      event.preventDefault();

      axios({
        method: "delete",
        url: "/api/departments/" + department.id,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
        .then((res) => {
          this.setState({ completed: true });
        })
        .catch((err) => {
          this.setState({
            hasError: true,
            errorMsg: err.response.data.message,
          });
        });
    };
  }

  handleClick = (number) => {
      return event => {
          this.setState({currentPage: number})
      }
  }

  render() {

    const { applications, currentPage, applicationsPerPage } = this.state;

    const indexOfLastApp = currentPage * applicationsPerPage;
    const indexOfFirstApp = indexOfLastApp - applicationsPerPage;
    const currentApps = applications.slice(indexOfFirstApp, indexOfLastApp);

    const renderApps = currentApps.map((app, index) => {
      return (
        <tr key={index} className="">
          <td className="">{app.id}</td>
          <td className="">{app.user.fullName}</td>
          <td className="">{moment(app.startDate).format('YYYY-MM-DD')}</td>
          <td className="">{moment(app.endDate).format('YYYY-MM-DD')}</td>
          <td className="">{app.type}</td>
          <td className="">{app.reason}</td>
          <td className="" 
              style={{textAlign: 'center', width: '100px'}}
          >
              <Button 
                style={{display: 'inline-block'}}
                size="sm"
                variant={app.status==='Approved' ? ("success") : app.status==='Pending' ? ("warning") : ("danger")}
              >
                  {app.status}
              </Button>
          </td>
        </tr>
      );
    });

    const pageNumbers = [];
    for (
      let i = 1;
      i <= Math.ceil(applications.length / applicationsPerPage);
      i++
    ) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map((number, index) => {
      return (
        <li className="page-item" value={number} onClick={this.handleClick(number)}>
          <a className="page-link">{number}</a>
        </li>
      );
    });

    return (
      <div className="container-fluid pt-5">
        <div className="row">
          <div className="col-sm-12">
            <AddDepartment />
          </div>
        </div>
        <div className="col-sm-12">
          <Card>
            <Card.Header style={{ backgroundColor: "#515e73", color: "white" }}>
              <div className="panel-title">
                <strong>Application List</strong>
              </div>
            </Card.Header>
            <Card.Body>
              <Table striped bordered size="sm" id="table">
                <thead>
                  <tr className="">
                    <th className="text-muted">APP ID</th>
                    <th className="text-muted">Full Name</th>
                    <th className="text-muted">Start Date</th>
                    <th className="text-muted">End Date</th>
                    <th className="text-muted">Leave Type</th>
                    <th className="text-muted">Details</th>
                    <th className="text-muted">Status</th>
                    <th className="text-muted">Action</th>
                  </tr>
                </thead>
                <tbody>{renderApps}</tbody>
              </Table>
              <div className="row mt-3 mb-2">
                <div className="col-sm-6">
                  <select 
                    value={this.state.applicationsPerPage}
                    onChange={this.handleChange}
                    name="applicationsPerPage"
                >
                    <option value={10} defaultValue>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                  </select>
                  <span> Records Per Page</span>
                </div>
                <div className="col-sm-6">
                  <div className="myDiv">
                    <nav aria-label="Page navigation example">
                      <ul className="pagination">{renderPageNumbers}</ul>
                    </nav>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
        {this.state.hasError ? (
          <Alert variant="danger" className="m-3" block>
            {this.state.errMsg}
          </Alert>
        ) : this.state.completed ? (
          <Redirect to="/departments" />
        ) : (
          <></>
        )}
      </div>
    );
  }
}
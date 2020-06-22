import React, { Component } from "react";
import { Redirect } from 'react-router-dom'
import { Modal, Button, Form, Alert } from "react-bootstrap";
import moment from 'moment'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"


export default class JobAddModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      jobTitle: "",
      startDate: null,
      endDate: null,
      departments: [],
      users: [],
      selectedDepartment: null,
      selectedUser: null,
      showAlert: false,
      errorMsg: "",
      done: false
    };
  }

  componentDidMount() {
    this.fetchDepartments() 
  }

  fetchDepartments = () => {
    axios({
          method: 'get',
          url: 'api/departments',
          headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
      })
      .then(res => {
          this.setState({departments: res.data})
      })
  }

  fetchUsers = () => {
      let users = []
        this.state.departments.map(dept => {
        console.log(dept.id, this.state.selectedDepartment)
        if(dept.id == this.state.selectedDepartment) {
            dept.users.map((user, index) => {
                users.push(user)
            })
            this.setState({users: users})
        }
        })
  }

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value,
    });
  };

  onDepartmentChange = (event) => {
    this.setState({selectedDepartment: event.target.value}, () => {
        this.fetchUsers()
    })
  }

  onUserChange = (event) => {
    this.setState({selectedUser: event.target.value})
  }

  pushDepartments = () => {
      let items = []
      this.state.departments.map((dept, index) => {
        items.push(<option key={index} value={dept.id}>{dept.departmentName}</option>)
      })
      return items
  }

  pushUsers = () => {
      let items = []
      this.state.users.map((user, index) => {
          items.push(<option key={index} value={user.id}>{user.fullName}</option>)
      })
      return items
  }

  onSubmit = (e) => {

    e.preventDefault();

    let job = {
        jobTitle: this.state.jobTitle,
        startDate: this.state.startDate,
        endDate: this.state.endDate,
        userId: this.state.selectedUser
    }

    axios({
        method: 'post',
        url: `/api/jobs`,
        data: job,
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
    })
    .then(res => {
        this.setState({done: true})
    })
    .catch(err => {
        this.setState({showAlert: true, errorMsg: err.response.data.message
        })
    })

  };

  render() {
    const {showAlert, done} = this.state  
    return (
      <Modal
        {...this.props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Job
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={this.onSubmit}>
                <Form.Group>
                    <Form.Label className="mb-2 required">Select Department</Form.Label>
                    <Form.Control 
                        as="select"
                        className="form-control"
                        value={this.state.selectedDepartment || ""}
                        onChange={this.onDepartmentChange}
                    >
                        <option value="">Choose one...</option>
                        {this.pushDepartments()}
                    </Form.Control>
                </Form.Group>
                {this.state.selectedDepartment ? (
                    <Form.Group>
                        <Form.Label>Select User</Form.Label>
                        <Form.Control
                            as="select"
                            className="form-control"
                            value={this.state.selectedUser || ''}
                            onChange={this.onUserChange}
                        >
                            <option value="">Choose one...</option>
                            {this.pushUsers()}
                        </Form.Control>
                    </Form.Group>
                ): null}
                {done ? <Redirect to={{pathname: '/job-list', state: {selectedDepartment: this.state.departmentId}}} /> : <></>}
                {showAlert ? (
                    <Alert variant="alert alert-warning" className="m-1">
                        {this.state.errorMsg}
                    </Alert>) : (<></>)
                }
                <Form.Group controlId="formJobTitle">
                    <Form.Label className="mb-2 required">Job Title</Form.Label>
                    <Form.Control
                        type="text"
                        className="col-8"
                        name="jobTitle"
                        value={this.state.jobTitle}
                        onChange={this.handleChange}
                        autoComplete="off"
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formStartDate">
                    <Form.Label className="mb-2 required">Job Start Date</Form.Label>
                     <DatePicker
                              selected={this.state.startDate}
                              onChange={startDate => this.setState({startDate: startDate})}
                              minDate={Date.now()}
                              dateFormat="yyyy-MM-dd"
                              className="form-control ml-1"
                              placeholderText="Select Start Date"
                              autoComplete="off"
                              required
                            />
                </Form.Group>
                <Form.Group controlId="fromEndDate">
                    <Form.Label className="mb-2 required">Job End Date</Form.Label>
                     <DatePicker
                              selected={this.state.endDate}
                              onChange={endDate => this.setState({endDate: endDate})}
                              minDate={Date.now()}
                              dateFormat="yyyy-MM-dd"
                              className="form-control ml-1"
                              placeholderText="Select Start Date"
                              autoComplete="off"
                              required
                            />
                </Form.Group>
                <Button variant="success" type="submit" className="mt-2">
                    Submit
            </Button>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
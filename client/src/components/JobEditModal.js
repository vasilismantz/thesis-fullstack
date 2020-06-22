import React, { Component } from "react";
import { Redirect } from 'react-router-dom'
import { Modal, Button, Form, Alert } from "react-bootstrap";
import moment from 'moment'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"


export default class JobEditModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      jobTitle: "",
      startDate: null,
      endDate: null,
      showAlert: false,
      errorMsg: "",
      done: false
    };
  }

  componentDidMount() {
      this.setState({
          id: this.props.data.id,
          jobTitle: this.props.data.jobTitle,
          startDate:  moment(new Date(this.props.data.startDate)).toDate(),
          endDate: moment(new Date(this.props.data.endDate)).toDate(),
          departmentId: this.props.data.user.departmentId
        })
  }

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value,
    });
  };

  onSubmit = (e) => {

    e.preventDefault();

    let job = {
        jobTitle: this.state.jobTitle,
        startDate: this.state.startDate,
        endDate: this.state.endDate,
    }

    axios({
        method: 'put',
        url: `/api/jobs/${this.state.id}`,
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
            Edit Job
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={this.onSubmit}>
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
                              showMonthDropdown
                              showYearDropdown
                              dropdownMode="select"
                              name="startDate"
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
                              showMonthDropdown
                              showYearDropdown
                              dropdownMode="select"
                              name="endDate"
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
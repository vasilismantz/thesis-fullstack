import React, { Component } from "react";
import { Redirect } from 'react-router-dom'
import { Modal, Button, Form, Alert } from "react-bootstrap";
import moment from 'moment'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"


export default class AddEventModel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      departmentName: "",
      id: null,
      event: {},
      showAlert: false,
      errorMsg: "",
      done: false
    };
  }

  componentDidMount() {
      this.setState({
          departmentName: this.props.data.departmentName,
          id:  this.props.data.id
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

    let data = {
        departmentName: this.state.departmentName
    }

    axios({
        method: 'put',
        url: `/api/departments/${this.state.id}`,
        data: data,
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
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Department
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {done ? <Redirect to="/departments" /> : <></>}
            {showAlert ? (
                <Alert variant="alert alert-warning" className="m-1">
                    {this.state.err}
                </Alert>) : (<></>)
            }
            <Form onSubmit={this.onSubmit}>
                <Form.Group controlId="formDepartmentName">
                    <Form.Label className="mb-2">Department Name</Form.Label>
                    <Form.Control
                        type="text"
                        className="col-8"
                        name="departmentName"
                        value={this.state.departmentName}
                        onChange={this.handleChange}
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
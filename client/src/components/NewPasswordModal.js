import React, { Component } from "react";
import { Redirect } from 'react-router-dom'
import { Modal, Button, Form, Alert } from "react-bootstrap";
import moment from 'moment'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"


export default class NewPasswordModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      oldPassword: "",
      newPassword: "",
      newPasswordCheck: null,
      showAlert: false,
      completed: false,
      hasError: false,
      errMsg: ""
    };
  }

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.newPassword !== this.state.newPasswordCheck) {
        this.setState({ showAlert: true });
    } else {
        let userId = JSON.parse(localStorage.getItem('user')).id
        let data = {
          oldPassword: this.state.oldPassword,
          newPassword: this.state.newPassword
        }
        axios({
            method: 'put',
            url: 'api/users/changePassword/' + userId,
            data: data,
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
        .then(res => {
          this.setState({completed: true, showAlert: false, hasError: false})
        })
        .catch(err => {
          console.log(err)
          this.setState({hasError: true, errMsg: err.response.data.message})
        })
    }
  };

  render() {
    const {showAlert, completed, hasError, errMsg} = this.state  
    return (
      <Modal
        {...this.props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Change Password
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {completed ? (
                <Alert variant="success" className="m-1">
                    Password changed successfully.
                </Alert>) : (<></>)
            }
            {showAlert ? (
                <Alert variant="warning" className="m-1">
                    Passwords don't match.
                </Alert>) : (<></>)
            }
            {hasError ? (
                <Alert variant="danger" className="m-1">
                    {errMsg}
                </Alert>) : (<></>)
            }
            <Form onSubmit={this.onSubmit}>
                <Form.Group controlId="formOldPassword">
                    <Form.Label className="required">Old Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter old password"
                        className="col-6"
                        name="oldPassword"
                        value={this.state.oldPassword}
                        onChange={this.handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formNewPassword">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter new Password"
                        className="col-6"
                        name="newPassword"
                        value={this.state.newPassword}
                        onChange={this.handleChange}
                    />
                </Form.Group>
                
                <Form.Group controlId="formNewPasswordCheck">
                    <Form.Label>New Password Repeat</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Repeat new Password"
                        className="col-6"
                        name="newPasswordCheck"
                        value={this.state.newPasswordCheck}
                        onChange={this.handleChange}
                    />
                </Form.Group>

                <Form.Text className="mb-3 required"> Required Fields</Form.Text>
                <Button variant="success" type="submit">
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
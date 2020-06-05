import React, { Component } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { Redirect } from 'react-router-dom'
import axios from "axios";

export default class DepartmentAdd extends Component {
  constructor(props) {
    super(props);

    this.state = {
      departmentName: "",
      hasError: false,
      errMsg: "",
      completed: false
    };
  }

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault()

    this.setState({ hasError: false, errorMsg: "", completed: false });

    let department = {
      departmentName: this.state.departmentName
    };

    axios({
      method: "post",
      url: "/api/departments",
      data: department,
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => {
        this.setState({completed: true})
      })
      .catch((err) => {
        this.setState({ hasError: true, errMsg: err.response.data.message });
        window.scrollTo(0, 0);
      });
  };

  render() {
    return (
      <Card className="mb-3 secondary-card">
          <Card.Header>
            <b>Add Department</b>
          </Card.Header>
          <Card.Body>
            <Card.Text>
              <Form onSubmit={this.onSubmit}>
                <Form.Group controlId="formDepartmentName">
                  <Form.Label className="text-muted mb-2">
                    Department Name
                  </Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Department Name"
                        name="departmentName"
                        style={{width: "50%"}}
                        value={this.state.departmentName}
                        onChange={this.handleChange}
                        required
                        />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-2">
                  Add
                </Button>
              </Form>
            </Card.Text>
          </Card.Body>
          {this.state.hasError ? (
            <Alert variant="danger" className="m-3" block>
              {this.state.errMsg}
            </Alert>
          ) : this.state.completed ? (
            <Redirect to="/departments" />
          ) : (<></>)}
        </Card>
    );
  }
}

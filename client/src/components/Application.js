import React, { Component } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { Redirect } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import axios from "axios";

export default class Application extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: "",
      startDate: null,
      endDate: null,
      reason: "",
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

    let userId = JSON.parse(localStorage.getItem('user')).id

    let application = {
        type: this.state.type,
        startDate: this.state.startDate,
        endDate: this.state.endDate,
        status: 'Pending',
        reason: this.state.reason,
        userId: userId
    };

    axios({
      method: "post",
      url: "/api/applications",
      data: application,
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
          <div className="container-fluid pt-4">
            {this.state.hasError ? (
                <Alert variant="danger" className="m-3" block>
                {this.state.errMsg}
                </Alert>
            ) : this.state.completed ? (
                <Redirect to="/application-list" />
            ) : (<></>)}
            <Card className="mb-3 main-card">
                <Card.Header>
                    <b>Make Application</b>
                </Card.Header>
                <Card.Body>
                    <Card.Text>
                    <Form onSubmit={this.onSubmit}>
                        <Form.Group controlId="formDepartmentName">
                        <Form.Label>
                            Type
                        </Form.Label>
                            <Form.Control
                                as="select"
                                name="type"
                                style={{width: "50%"}}
                                value={this.state.type}
                                onChange={this.handleChange}
                                required
                            >
                                <option value="">Choose one</option>
                                <option value="normal">Normal</option>
                                <option value="illness">Illness</option>
                                <option value="student">Student</option>
                                <option value="marriage">Marriage</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Start Date</Form.Label>
                            <Form.Row>
                                <DatePicker 
                                    selected={this.state.startDate}
                                    className="form-control ml-1"
                                    onChange={newDate => this.setState({startDate: newDate})}
                                    required
                                />
                            </Form.Row>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>End Date</Form.Label>
                            <Form.Row>
                                <DatePicker 
                                    selected={this.state.endDate}
                                    className="form-control ml-1"
                                    onChange={newDate => this.setState({endDate: newDate})}
                                    required
                                />
                            </Form.Row>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Reason <span className="text-muted">(Comments)</span></Form.Label>
                            <Form.Control 
                                type="text"
                                name="reason"
                                value={this.state.reason}
                                onChange={this.handleChange}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="mt-2">
                        Add
                        </Button>
                    </Form>
                    </Card.Text>
                </Card.Body>
            </Card>
          </div>
    );
  }
}
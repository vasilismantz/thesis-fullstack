import React, { Component } from "react";
import { Card, Form, Button } from "react-bootstrap";

export default class EmployeeAdd extends Component {
  render() {
    return (
      <div className="row">
        <Card className="col-sm-12">
          <Card.Header style={{backgroundColor: "#515e73", color: "white"}}>Add Employee</Card.Header>
          <Card.Body>
            <Card className="col-sm-6" style={{padding: "0px"}}>
              <Card.Header style={{backgroundColor: "#515e73", color: "white"}}><b>Personal Details</b></Card.Header>
              <Card.Body>
                <Card.Text>
                  <Form>
                    <Form.Group controlId="formFirstName">
                      <Form.Label className="text-muted">First Name</Form.Label>
                      <Form.Control type="text" placeholder="Enter first Name" />
                    </Form.Group>

                    <Form.Group controlId="formLastName">
                      <Form.Label className="text-muted">Last Name</Form.Label>
                      <Form.Control type="text" placeholder="Enter last Name" />
                    </Form.Group>

                    <Form.Group controlId="formDateofBirth">
                        <Form.Label className="text-muted">Date of Birth</Form.Label>
                        <Form.Control type="date" placeholder="Enter Date of Birth" />
                    </Form.Group>

                    <Form.Group controlId="formGender">
                        <Form.Label className="text-muted">Gender</Form.Label>
                        <Form.Control as="select">
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </Form.Control> 
                    </Form.Group>

                    <Form.Group controlId="formMaritalStatus">
                        <Form.Label className="text-muted">Marital Status</Form.Label>
                        <Form.Control as="select">
                            <option value="married">Married</option>
                            <option value="single">Single</option>
                        </Form.Control> 
                    </Form.Group>

                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
                  </Form>
                </Card.Text>
              </Card.Body>
            </Card>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

import React, { Component } from "react";
import { Card, Row, Col, Form } from "react-bootstrap";
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'

export default class SalaryView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      currentJobTitle: null,
      falseRedirect: false
    };
  }

  componentDidMount() {
      if(this.props.location.state) {
          console.log(this.props.location.state)
          axios({
              method: 'get',
              url: 'api/users/' + this.props.location.state.selectedUser.user.id,
              headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
          })
          .then(res => {
              console.log(res)
              this.setState({user: res.data}, () => {
                  if(this.state.user.jobs) {
                      this.state.user.jobs.map(job => {
                          if(new Date(job.startDate).setHours(0) < new Date() && new Date(job.endDate).setHours(24) > new Date()) {
                              this.setState({currentJobTitle: job.jobTitle})
                          }
                      })
                  }
              })
          })
          .catch(err => {
              console.log(err)
          })
      } else {
          this.setState({falseRedirect: true})
      }
  }

  render() {
    return (
        <div className="container-fluid pt-3">
            {this.state.falseRedirect ? <Redirect to="/" /> : (<></>)}
            {this.state.user ? (
                <Row>
                    <Col sm={12}>
                        <Card>
                            <Card.Header style={{ backgroundColor: "#515e73", color: "white", fontSize: '17px' }}>Employee Salary Detail</Card.Header>
                            <Card.Body>
                                <Card.Title><strong>{this.state.user.fullName}</strong></Card.Title>
                                <Card.Text>
                                    <Col lg={12}>
                                        <Row className="pt-4">
                                            <Col lg={3}>
                                                <img className="img-circle elevation-1 bp-2" src={process.env.PUBLIC_URL + '/user-128.png'}></img>
                                            </Col>
                                            <Col className="pt-4" lg={9}>
                                                <div className="emp-view-list">
                                                    <ul>
                                                        <li><span>Employee ID: </span> {this.state.user.id}</li>
                                                        <li><span>Department: </span> {this.state.user.department.departmentName}</li>
                                                        <li><span>Job Title: </span> {this.state.currentJobTitle}</li>
                                                        <li><span>Role: </span>{this.state.user.role==='ROLE_ADMIN' ? 'Admin' : this.state.user.role==='ROLE_MANAGER' ? 'Manager' : 'Employee'}</li>
                                                    </ul>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row className="pt-4">
                                            <Col sm={6}>
                                                <Card className="secondary-card sal-view">
                                                    <Card.Header>Salary Details</Card.Header>
                                                    <Card.Body>
                                                        <Card.Text id="sal-view-details">
                                                            <Form.Group as={Row}>
                                                                <Form.Label className="label">
                                                                    Employment Type: 
                                                                </Form.Label>
                                                                <span>
                                                                    {this.state.user.user_financial_info.employmentType}
                                                                </span>
                                                            </Form.Group>
                                                            <Form.Group as={Row}>
                                                                <Form.Label className="label">
                                                                    Basic Salary: 
                                                                </Form.Label>
                                                                <span>
                                                                    € {this.state.user.user_financial_info.salaryBasic}
                                                                </span>
                                                            </Form.Group>
                                                        </Card.Text>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                            <Col sm={6}>
                                                <Card className="secondary-card sal-view">
                                                    <Card.Header>Allowances</Card.Header>
                                                    <Card.Body>
                                                        <Card.Text id="sal-view-allowances">
                                                            <Form.Group as={Row}>
                                                                <Form.Label className="label">
                                                                    House Rent Allowance: 
                                                                </Form.Label>
                                                                <span>
                                                                    € {this.state.user.user_financial_info.allowanceHouseRent}
                                                                </span>
                                                            </Form.Group>
                                                            <Form.Group as={Row}>
                                                                <Form.Label className="label">
                                                                    Medical Allowance: 
                                                                </Form.Label>
                                                                <span>
                                                                    € {this.state.user.user_financial_info.allowanceMedical}
                                                                </span>
                                                            </Form.Group>
                                                            <Form.Group as={Row}>
                                                                <Form.Label className="label">
                                                                    Special Allowance: 
                                                                </Form.Label>
                                                                <span>
                                                                    € {this.state.user.user_financial_info.allowanceSpecial}
                                                                </span>
                                                            </Form.Group>
                                                            <Form.Group as={Row}>
                                                                <Form.Label className="label">
                                                                    Fuel Allowance: 
                                                                </Form.Label>
                                                                <span>
                                                                    € {this.state.user.user_financial_info.allowanceFuel}
                                                                </span>
                                                            </Form.Group>
                                                            <Form.Group as={Row}>
                                                                <Form.Label className="label">
                                                                    Phone Bill Allowance: 
                                                                </Form.Label>
                                                                <span>
                                                                    € {this.state.user.user_financial_info.allowancePhoneBill}
                                                                </span>
                                                            </Form.Group>
                                                            <Form.Group as={Row}>
                                                                <Form.Label className="label">
                                                                    Other Allowance: 
                                                                </Form.Label>
                                                                <span>
                                                                    € {this.state.user.user_financial_info.allowanceOther}
                                                                </span>
                                                            </Form.Group>
                                                            <Form.Group as={Row}>
                                                                <Form.Label className="label">
                                                                    Total Allowance: 
                                                                </Form.Label>
                                                                <span>
                                                                    € {this.state.user.user_financial_info.allowanceTotal}
                                                                </span>
                                                            </Form.Group>
                                                        </Card.Text>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col cm={6}>
                                                <Card className="secondary-card">
                                                    <Card.Header>Deductions</Card.Header>
                                                    <Card.Body>
                                                        <Card.Text id="sal-view-deductions">
                                                            <Form.Group as={Row}>
                                                                <Form.Label className="label">
                                                                    Tax Deduction: 
                                                                </Form.Label>
                                                                <span>
                                                                    € {this.state.user.user_financial_info.deductionTax}
                                                                </span>
                                                            </Form.Group>
                                                            <Form.Group as={Row}>
                                                                <Form.Label className="label">
                                                                    Other Deduction: 
                                                                </Form.Label>
                                                                <span>
                                                                    € {this.state.user.user_financial_info.deductionOther}
                                                                </span>
                                                            </Form.Group>
                                                            <Form.Group as={Row}>
                                                                <Form.Label className="label">
                                                                    Total Deduction: 
                                                                </Form.Label>
                                                                <span>
                                                                    € {this.state.user.user_financial_info.deductionTotal}
                                                                </span>
                                                            </Form.Group>
                                                        </Card.Text>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                            <Col sm={6}>
                                            <Card className="secondary-card">
                                                    <Card.Header>Total Salary Details</Card.Header>
                                                    <Card.Body>
                                                        <Card.Text id="sal-view-total">
                                                            <Form.Group as={Row}>
                                                                <Form.Label className="label">
                                                                    Gross Salary: 
                                                                </Form.Label>
                                                                <span>
                                                                    € {this.state.user.user_financial_info.salaryGross}
                                                                </span>
                                                            </Form.Group>
                                                            <Form.Group as={Row}>
                                                                <Form.Label className="label">
                                                                    Total Deduction: 
                                                                </Form.Label>
                                                                <span>
                                                                    € {this.state.user.user_financial_info.deductionTotal}
                                                                </span>
                                                            </Form.Group>
                                                            <Form.Group as={Row}>
                                                                <Form.Label className="label">
                                                                    Net Salary: 
                                                                </Form.Label>
                                                                <span>
                                                                    € {this.state.user.user_financial_info.salaryNet}
                                                                </span>
                                                            </Form.Group>
                                                        </Card.Text>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            ) : null}
        </div>
    );
  }
}
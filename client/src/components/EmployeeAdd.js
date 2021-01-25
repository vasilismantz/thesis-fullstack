import React, { Component } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import DatePicker from "react-datepicker";
import axios from "axios";
import moment from "moment";

export default class EmployeeAdd extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fistname: "",
      lastname: "",
      dateOfBirth: "",
      gender: "",
      maritalStatus: "",
      fathername: "",
      idNumber: "",
      bankName: "",
      accountName: "",
      accountNumber: "",
      iBan: "",
      address: "",
      country: "",
      city: "",
      mobile: null,
      phone: null,
      email: "",
      username: "",
      password: "",
      role: "",
      department: "",
      departmentId: null,
      startDate: "",
      endDate: "",
      departments: [],
      jobTitle: null,
      joiningDate: "",
      file: null,
      hasError: false,
      errMsg: "",
      completed: false,
    };
  }

  componentDidMount() {
    axios({
      method: "get",
      url: "/api/departments",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => {
        this.setState({ departments: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value,
    });
  };

  fileSelectedHandler = (event) => {
    this.setState({
      file: event.target.files[0],
    });
  };

  onSubmit = (e) => {
    this.setState({ hasError: false, errorMsg: "", completed: false });

    let user = {
      username: this.state.username,
      password: 1234,
      fullname: this.state.fistname + " " + this.state.lastname,
      role: this.state.role,
      departmentId: this.state.departmentId,
      active: 1,
    };

    e.preventDefault();
    axios({
      method: "post",
      url: "/api/users",
      data: user,
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => {
        let userId = res.data.id;

        let userPersonalInfo = {
          dateOfBirth: this.state.dateOfBirth,
          gender: this.state.gender,
          maritalStatus: this.state.maritalStatus,
          fatherName: this.state.fathername,
          idNumber: this.state.idNumber,
          address: this.state.address,
          city: this.state.city,
          country: this.state.country,
          mobile: this.state.mobile,
          phone: this.state.phone,
          emailAddress: this.state.email,
          userId: userId,
        };

        axios({
          method: "post",
          url: "/api/personalInformations",
          data: userPersonalInfo,
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
          .then((res) => {
            let userFinancialInfo = {
              bankName: this.state.bankName,
              accountName: this.state.accountName,
              accountNumber: this.state.accountNumber,
              iban: this.state.iBan,
              userId: userId,
            };

            axios({
              method: "post",
              url: "api/financialInformations",
              data: userFinancialInfo,
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            })
              .then((res) => {
                let job = {
                  jobTitle: this.state.jobTitle,
                  startDate: this.state.startDate,
                  endDate: this.state.endDate,
                  userId: userId,
                };
                axios({
                  method: "post",
                  url: "api/jobs/",
                  data: job,
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                })
                  .then((res) => {
                    this.setState({ completed: true });
                    window.scrollTo(0, 0);
                  })
                  .catch((err) => {
                    this.setState({
                      hasError: true,
                      errMsg: err.response.data.message,
                    });
                    window.scrollTo(0, 0);
                  });
              })
              .catch((err) => {
                this.setState({
                  hasError: true,
                  errMsg: err.response.data.message,
                });
                window.scrollTo(0, 0);
              });
          })
          .catch((err) => {
            this.setState({
              hasError: true,
              errMsg: err.response.data.message,
            });
            window.scrollTo(0, 0);
          });
      })
      .catch((err) => {
        this.setState({ hasError: true, errMsg: err.response.data.message });
        window.scrollTo(0, 0);
      });
  };

  pushDepartments = () => {
    let items = [];
    this.state.departments.map((dept, index) => {
      items.push(
        <option key={index} value={dept.id}>
          {dept.departmentName}
        </option>
      );
    });
    return items;
  };

  render() {
    return (
      <Form onSubmit={this.onSubmit}>
        <div className="row">
          {this.state.hasError ? (
            <Alert variant="danger" className="m-3" block>
              {this.state.errMsg}
            </Alert>
          ) : this.state.completed ? (
            <Alert variant="success" className="m-3" block>
              Employee has been inserted.
            </Alert>
          ) : (
            <></>
          )}

          {/* Main Card */}
          <Card className="col-sm-12 main-card">
            <Card.Header>
              <b>Add Employee</b>
            </Card.Header>
            <Card.Body>
              <div className="row">
                {/* Personal Details Card */}
                <div className="col-sm-6">
                  <Card className="secondary-card">
                    <Card.Header>Personal Details</Card.Header>
                    <Card.Body>
                      <Card.Text>
                        <Form.Group controlId="formFirstName">
                          <Form.Label className="text-muted required">
                            First Name
                          </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter first Name"
                            name="fistname"
                            value={this.state.fistname}
                            onChange={this.handleChange}
                            required
                          />
                        </Form.Group>

                        <Form.Group controlId="formLastName">
                          <Form.Label className="text-muted required">
                            Last Name
                          </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter last Name"
                            name="lastname"
                            value={this.state.lastname}
                            onChange={this.handleChange}
                            required
                          />
                        </Form.Group>

                        <Form.Group controlId="formDateofBirth">
                          <Form.Label className="text-muted required">
                            Date of Birth
                          </Form.Label>
                          <Form.Row>
                            <DatePicker
                              selected={this.state.dateOfBirth}
                              onChange={(dateOfBirth) =>
                                this.setState({ dateOfBirth })
                              }
                              showMonthDropdown
                              showYearDropdown
                              dropdownMode="select"
                              timeFormat="HH:mm"
                              name="dateOfBirth"
                              timeIntervals={30}
                              timeCaption="time"
                              dateFormat="yyyy-MM-dd"
                              className="form-control ml-1"
                              placeholderText="Select Date Of Birth"
                              autoComplete="off"
                              required
                            />
                          </Form.Row>
                        </Form.Group>

                        <Form.Group controlId="formGender">
                          <Form.Label className="text-muted required">
                            Gender
                          </Form.Label>
                          <Form.Control
                            as="select"
                            value={this.state.gender}
                            onChange={this.handleChange}
                            name="gender"
                            required
                          >
                            <option value="">Choose...</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                          </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formMaritalStatus">
                          <Form.Label className="text-muted required">
                            Marital Status
                          </Form.Label>
                          <Form.Control
                            as="select"
                            value={this.state.maritalStatus}
                            onChange={this.handleChange}
                            name="maritalStatus"
                            required
                          >
                            <option value="">Choose...</option>
                            <option value="married">Married</option>
                            <option value="single">Single</option>
                          </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formFatherName">
                          <Form.Label className="text-muted required">
                            Father's name
                          </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter Father's Name"
                            name="fathername"
                            value={this.state.fathername}
                            onChange={this.handleChange}
                            required
                          />
                        </Form.Group>

                        <Form.Group controlId="formId">
                          <Form.Label className="text-muted required">
                            ID Number
                          </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter ID Number"
                            name="idNumber"
                            value={this.state.idNumber}
                            onChange={this.handleChange}
                            required
                          />
                        </Form.Group>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </div>
                <div className="col-sm-6">
                  <Card className="secondary-card">
                    <Card.Header>Contact Details</Card.Header>
                    <Card.Body>
                      <Card.Text>
                        <Form.Group controlId="formPhysicalAddress">
                          <Form.Label className="text-muted required">
                            Physical Address
                          </Form.Label>
                          <Form.Control
                            type="text"
                            value={this.state.address}
                            onChange={this.handleChange}
                            name="address"
                            placeholder="Enter Address"
                            required
                          />
                        </Form.Group>
                        <Form.Group controlId="formCountry">
                          <Form.Label className="text-muted required">
                            Country
                          </Form.Label>
                          <Form.Control
                            type="text"
                            value={this.state.country}
                            onChange={this.handleChange}
                            name="country"
                            placeholder="Enter Country"
                            required
                          />
                        </Form.Group>
                        <Form.Group controlId="formCity">
                          <Form.Label className="text-muted required">
                            City
                          </Form.Label>
                          <Form.Control
                            type="text"
                            value={this.state.city}
                            onChange={this.handleChange}
                            name="city"
                            placeholder="Enter City"
                            required
                          />
                        </Form.Group>
                        <Form.Group controlId="formMobile">
                          <Form.Label className="text-muted required">
                            Mobile
                          </Form.Label>
                          <Form.Control
                            type="text"
                            value={this.state.mobile}
                            onChange={this.handleChange}
                            name="mobile"
                            placeholder="Enter Mobile"
                            required
                          />
                        </Form.Group>
                        <Form.Group controlId="formPhone">
                          <Form.Label className="text-muted">Phone</Form.Label>
                          <Form.Control
                            type="text"
                            value={this.state.phone}
                            onChange={this.handleChange}
                            name="phone"
                            placeholder="Enter Phone"
                          />
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                          <Form.Label className="text-muted required">
                            Email
                          </Form.Label>
                          <Form.Control
                            type="text"
                            value={this.state.email}
                            onChange={this.handleChange}
                            name="email"
                            placeholder="Enter Email"
                            required
                          />
                        </Form.Group>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6">
                  <Card className="secondary-card">
                    <Card.Header>Bank Information</Card.Header>
                    <Card.Body>
                      <Card.Text>
                        <Form.Group controlId="formBankName">
                          <Form.Label className="text-muted">
                            Bank Name
                          </Form.Label>
                          <Form.Control
                            type="text"
                            value={this.state.bankName}
                            onChange={this.handleChange}
                            name="bankName"
                            placeholder="Enter Bank name"
                          />
                        </Form.Group>
                        <Form.Group controlId="formAccountName">
                          <Form.Label className="text-muted">
                            Account Name
                          </Form.Label>
                          <Form.Control
                            type="text"
                            value={this.state.accountName}
                            onChange={this.handleChange}
                            name="accountName"
                            placeholder="Enter Account name"
                          />
                        </Form.Group>
                        <Form.Group controlId="formAccountNumber">
                          <Form.Label className="text-muted">
                            Account Number
                          </Form.Label>
                          <Form.Control
                            type="text"
                            value={this.state.accountNumber}
                            onChange={this.handleChange}
                            name="accountNumber"
                            placeholder="Enter Account number"
                          />
                        </Form.Group>
                        <Form.Group controlId="formIban">
                          <Form.Label className="text-muted">iBan</Form.Label>
                          <Form.Control
                            type="text"
                            value={this.state.iBan}
                            onChange={this.handleChange}
                            name="iBan"
                            placeholder="Enter Iban"
                          />
                        </Form.Group>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </div>
                <div className="col-sm-6">
                  <Card className="secondary-card">
                    <Card.Header>Official Status</Card.Header>
                    <Card.Body>
                      <Card.Text>
                        <Form.Group controlId="formEmployeeId">
                          <Form.Label className="text-muted required">
                            Employee ID
                          </Form.Label>
                          <Form.Control
                            type="text"
                            value={this.state.username}
                            onChange={this.handleChange}
                            name="username"
                            placeholder="Enter Username"
                            required
                          />
                        </Form.Group>
                        <Form.Group controlId="formPassword">
                          <Form.Label className="text-muted required">
                            Password
                          </Form.Label>
                          <Form.Control
                            type="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                            name="password"
                            placeholder="Enter Password"
                            required
                          />
                        </Form.Group>
                        <Form.Group controlId="formDepartment">
                          <Form.Label className="text-muted required">
                            Department
                          </Form.Label>
                          <Form.Control
                            as="select"
                            value={this.state.departmentId}
                            onChange={this.handleChange}
                            name="departmentId"
                            required
                          >
                            <option value="" defaultValue>
                              Choose...
                            </option>
                            {this.pushDepartments()}
                          </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formRole">
                          <Form.Label className="text-muted required">
                            Role
                          </Form.Label>
                          <Form.Control
                            as="select"
                            value={this.state.role}
                            onChange={this.handleChange}
                            name="role"
                            required
                          >
                            <option value="">Choose...</option>
                            <option value="ROLE_ADMIN">Admin</option>
                            <option value="ROLE_MANAGER">Manager</option>
                            <option value="ROLE_EMPLOYEE">Employee</option>
                          </Form.Control>
                        </Form.Group>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                  <Button variant="primary" type="submit" block>
                    Submit
                  </Button>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6">
                  <Card className="secondary-card">
                    <Card.Header>Job</Card.Header>
                    <Card.Body>
                      <Card.Text>
                        <Form.Group controlId="formJobTitle">
                          <Form.Label className="text-muted required">
                            Job Title
                          </Form.Label>
                          <Form.Control
                            type="text"
                            value={this.state.jobTitle}
                            onChange={this.handleChange}
                            name="jobTitle"
                            placeholder="Enter Job Title"
                          />
                        </Form.Group>
                        <Form.Group controlId="formJobStart">
                          <Form.Label className="text-muted required">
                            Start Date
                          </Form.Label>
                          <Form.Row>
                            <DatePicker
                              selected={this.state.startDate}
                              onChange={(startDate) =>
                                this.setState({ startDate })
                              }
                              dropdownMode="select"
                              timeFormat="HH:mm"
                              name="startDate"
                              timeCaption="time"
                              dateFormat="yyyy-MM-dd"
                              className="form-control ml-1"
                              placeholderText="Select Date Of Birth"
                              autoComplete="off"
                              required
                            />
                          </Form.Row>
                        </Form.Group>
                        <Form.Group controlId="formJobEnd">
                          <Form.Label className="text-muted required">
                            End Date
                          </Form.Label>
                          <Form.Row>
                            <DatePicker
                              selected={this.state.endDate}
                              onChange={(endDate) => this.setState({ endDate })}
                              dropdownMode="select"
                              timeFormat="HH:mm"
                              name="endDate"
                              timeCaption="time"
                              dateFormat="yyyy-MM-dd"
                              className="form-control ml-1"
                              placeholderText="Select Date Of Birth"
                              autoComplete="off"
                            />
                          </Form.Row>
                        </Form.Group>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
      </Form>
    );
  }
}

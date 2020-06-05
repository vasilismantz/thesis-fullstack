import React, { Component } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { Redirect } from 'react-router-dom'
import DatePicker from "react-datepicker";
import axios from 'axios'
import moment from 'moment'

export default class EmployeeEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
        user: {
            id: null,
            fullName: '',
            role: null,
            active: null,
            departmentId: null
        },
        userPersonalInfo: {
            id: null,
            dateOfBirth: null,
            gender: '',
            maritalStatus: '',
            fatherName: '',
            idNumber: '',
            address: '',
            city: '',
            country: '',
            mobile: '',
            phone: null,
            emailAddress: ''
        },
        userFinancialInfo: {
            id: null,
            bankName: '',
            accountName: '',
            accountNumber: '',
            iban: ''
        },
        department: {
          departmentId: null,
          departmentName: null
        },
        hasError: false,
        errMsg: "",
        completed: false,
        falseRedirect: false
    };
  }

  componentDidMount() {
      if(this.props.location.state) {
          axios({
              method: 'get',
              url: 'api/users/' + this.props.location.state.selectedUser.id,
              headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
          })
          .then(res => {
                let user = res.data
                console.log('user', user)
                this.setState({user: user}, () => {
                    if(user.job) {
                        this.setState({job: user.job})
                    }
                    if(user.department) {
                        this.setState({department: user.department})
                    }
                    if(user.user_personal_info) {
                        if(user.user_personal_info.dateOfBirth) {
                            user.user_personal_info.dateOfBirth = moment(new Date(user.user_personal_info.dateOfBirth)).toDate()
                        }
                        this.setState({userPersonalInfo: user.user_personal_info}, () => {
                            console.log('after', this.state.userPersonalInfo)
                        })
                    }
                    if(user.user_financial_info) {
                        this.setState({userFinancialInfo: user.user_financial_info})
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

  handleChangeUser = (event) => {
    const { value, name } = event.target;
    this.setState({
      user: {
          [name]: value
      },
    });
  };

  handleChangeJob = (event) => {
    const { value, name } = event.target;
    this.setState({
      job : {
          [name]: value
      },
    });
  };

  handleChangeDepartment = (event) => {
    const { value, name } = event.target;
    this.setState({
      department: {
          [name]: value
      },
    });
  };

  handleChangeUserPersonal = (event) => {
    const { value, name } = event.target;
    this.setState({
      userPersonalInfo: {
          [name]: value
      },
    });
  };

  handleChangeUserFinancial = (event) => {
    const { value, name } = event.target;
    this.setState({
      userFinancialInfo: {
          [name]: value
      },
    });
  };

  onSubmit = (e) => {

    e.preventDefault()

    this.setState({hasError: false, errorMsg: "", completed: false})

    let user = {
      fullname: this.state.user.fullName, 
      role: this.state.user.role,
      active: this.state.user.active
    }

    axios({
      method: 'put',
      url: '/api/users/' + this.props.location.state.selectedUser.id,
      data: user,
      headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
    })
    .then(res => {
      console.log(res)
 
      let user_id = res.data.id

      let userPersonalData = {
        dateOfBirth: moment(this.state.userPersonalInfo.dateOfBirth).format('YYYY-MM-DD'),
        gender: this.state.userPersonalInfo.gender,
        maritalStatus: this.state.userPersonalInfo.maritalStatus,
        fatherName: this.state.userPersonalInfo.fatherName,
        idNumber: this.state.userPersonalInfo.idNumber,
        address: this.state.userPersonalInfo.address,
        city: this.state.userPersonalInfo.city,
        country: this.state.userPersonalInfo.country,
        mobile: this.state.userPersonalInfo.mobile,
        phone: this.state.userPersonalInfo.phone,
        emailAddress: this.state.userPersonalInfo.emailAddress,
        userId: user_id
      }    

      console.log('userPersonalInfo', userPersonalData)

      axios({
        method: 'put',
        url: '/api/personalInformations/' + this.state.userPersonalInfo.id,
        data: userPersonalData,
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
      })
      .then(res => {

        console.log(res)

        let userFinancialInfo = {
          bankName: this.state.userFinancialInfo.bankName,
          accountName: this.state.userFinancialInfo.accountName,
          accountNumber: this.state.userFinancialInfo.accountNumber,
          iban: this.state.userFinancialInfo.iban,
          userId: user_id
        }

        axios({
          method: 'put',
          url: 'api/financialInformations/' + this.state.userFinancialInfo.id,
          data: userFinancialInfo,
          headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
        .then(res => {
          console.log(res)
          // this.setState({completed: true})
        })
        .catch(err => {
          this.setState({hasError: true, errMsg: err.data.message})
          window.scrollTo(0, 0)
        })
      })
      .catch(err => {
        this.setState({hasError: true, errMsg: err.data.message})
        window.scrollTo(0, 0)
      })
    })
    .catch(err => {
      console.log(err)
      // this.setState({hasError: true, errMsg: err.data.message})
      window.scrollTo(0, 0)
    })
  }

  render() {
    return (
      <Form onSubmit={this.onSubmit}>
        <div className="row">
        {this.state.falseRedirect ? (<Redirect to="/" />) : null}
          {this.state.hasError ? (
            <Alert variant="danger" className="m-3" block>
              {this.state.errMsg}
            </Alert>
          ): 
          this.state.completed ? (
            <Redirect to="employee-list" />
          ) : (<></>)}

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
                        <Form.Group controlId="formFullName">
                          <Form.Label className="text-muted required">
                            Full Name
                          </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter first Name"
                            name="fullName"
                            value={this.state.user.fullName}
                            onChange={this.handleChangeUser}
                            required
                          />
                        </Form.Group>

                        <Form.Group controlId="formDateofBirth">
                          <Form.Label className="text-muted required">
                            Date of Birth
                          </Form.Label>
                          <Form.Row>
                            <DatePicker
                              selected={this.state.userPersonalInfo.dateOfBirth ? this.state.userPersonalInfo.dateOfBirth : null}
                              onChange={dateOfBirth => this.setState({userPersonalInfo: {dateOfBirth: dateOfBirth}})}
                              showMonthDropdown
                              showYearDropdown
                              dropdownMode="select"
                              name="dateOfBirth"
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
                            value={this.state.userPersonalInfo.gender}
                            onChange={this.handleChangeUserPersonal}
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
                            value={this.state.userPersonalInfo.maritalStatus}
                            onChange={this.handleChangeUserPersonal}
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
                            name="fatherName"
                            value={this.state.userPersonalInfo.fatherName}
                            onChange={this.handleChangeUserPersonal}
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
                            value={this.state.userPersonalInfo.idNumber}
                            onChange={this.handleChangeUserPersonal}
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
                            value={this.state.userPersonalInfo.address}
                            onChange={this.handleChangeUserPersonal} 
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
                            value={this.state.userPersonalInfo.country}
                            onChange={this.handleChangeUserPersonal}
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
                            value={this.state.userPersonalInfo.city}
                            onChange={this.handleChangeUserPersonal}
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
                            value={this.state.userPersonalInfo.mobile}
                            onChange={this.handleChangeUserPersonal}
                            name="mobile"
                            placeholder="Enter Mobile"
                            required
                          />
                        </Form.Group>
                        <Form.Group controlId="formPhone">
                          <Form.Label className="text-muted">
                            Phone
                          </Form.Label>
                          <Form.Control 
                            type="text" 
                            value={this.state.userPersonalInfo.phone || ''}
                            onChange={this.handleChangeUserPersonal}
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
                            value={this.state.userPersonalInfo.emailAddress}
                            onChange={this.handleChangeUserPersonal}
                            name="emailAddress"
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
                            value={this.state.userFinancialInfo.bankName}
                            onChange={this.handleChangeUserFinancial}
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
                            value={this.state.userFinancialInfo.accountName}
                            onChange={this.handleChangeUserFinancial}
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
                            value={this.state.userFinancialInfo.accountNumber}
                            onChange={this.handleChangeUserFinancial}
                            name="accountNumber"
                            placeholder="Enter Account number"
                          />
                        </Form.Group>
                        <Form.Group controlId="formIban">
                          <Form.Label className="text-muted">iBan</Form.Label>
                          <Form.Control 
                            type="text" 
                            value={this.state.userFinancialInfo.iban}
                            onChange={this.handleChangeUserFinancial}
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
                          <div>{this.state.user.username}</div>
                        </Form.Group>
                        <Form.Group controlId="formRole">
                          <Form.Label className="text-muted required">
                            Role
                          </Form.Label>
                          <Form.Control
                            as="select"
                            value={this.state.user.role || ''}
                            onChange={this.handleChangeUser}
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
            </Card.Body>
          </Card>
        </div>
      </Form>
    );
  }
}
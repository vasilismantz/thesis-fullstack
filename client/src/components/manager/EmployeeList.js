import React, { Component } from "react";
import { Card, Badge, Button, Form, Modal } from "react-bootstrap";
import {Redirect} from 'react-router-dom'
import MaterialTable from 'material-table'
import axios from 'axios'
import { ThemeProvider } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core/styles'

export default class EmployeeList extends Component {
  
  constructor(props) {
    super(props)

    this.state = {
      users: [],
      selectedUser: null,
      viewRedirect: false,
      viewSalaryRedirect: false,
      editRedirect: false,
      deleteModal: false
    }
  }

  componentDidMount() {
      let deptId = JSON.parse(localStorage.getItem('user')).departmentId
    axios({
      method: 'get',
      url: '/api/users/department/' + deptId,
      headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
    })
    .then(res => {
      this.setState({users: res.data})
    })
    .catch(err => {
      console.log(err)
    })
  }

  onView = (user) => {
    return (event) => {
      event.preventDefault()

      this.setState({selectedUser: user, viewRedirect: true})
    } 
  }

  onSalaryView = (user) => {
    return (event) => {
      event.preventDefault()

      this.setState({selectedUser: {user: {id: user.id}}, viewSalaryRedirect: true})
    } 
  }

  render() {


    const theme = createMuiTheme({
        overrides: {
            MuiTableCell: {
                root: {
                    padding: '6px 6px 6px 6px'
                }
            }
        }
    })

    return (
      <div className="container-fluid pt-4">
        {this.state.viewRedirect ? (<Redirect to={{pathname: '/employee-view', state: {selectedUser: this.state.selectedUser}}}></Redirect>) : (<></>)}
        {this.state.viewSalaryRedirect ? (<Redirect to={{pathname: '/salary-view', state: {selectedUser: this.state.selectedUser}}}></Redirect>) : (<></>)}
        <div className="col-sm-12">
          <Card>
            <Card.Header style={{ backgroundColor: "#515e73", color: "white" }}>
              <div className="panel-title">
                <strong>Employee List</strong>
              </div>
            </Card.Header>
            <Card.Body>
              <ThemeProvider theme={theme}>
                <MaterialTable 
                  columns={[
                    {title: 'EMP ID', field: 'id'},
                    {title: 'Full Name', field: 'fullName'},
                    {title: 'Department', field: 'department.departmentName'},
                    {
                      title: 'Job Title', 
                      field: 'jobs',
                      render: rowData => (
                        rowData.jobs.map((job, index) => {
                          if(new Date(job.startDate).setHours(0) <= Date.now() && new Date(job.endDate).setHours(24) >= Date.now()) {
                            return job.jobTitle
                          }
                        })
                      )
                    },
                    {title: 'Mobile', field: 'user_personal_info.mobile'},
                    {
                      title: 'Status', 
                      field: 'active',
                      render: rowData => (
                        rowData.active ? (
                          <Badge pill variant="success">Active</Badge>
                        ) : (
                          <Badge pill variant="danger">Inactive</Badge>
                        )
                      )
                    },
                    {
                      title: 'View',
                      render: rowData => (
                        <Form>
                          <Button size="sm" variant="info" onClick={this.onView(rowData)}><i className="far fa-address-card"></i></Button>
                          <Button className="ml-2" size="sm" variant="info" onClick={this.onSalaryView(rowData)}><i className="fas fa-euro-sign"></i></Button>
                        </Form>
                      )
                    }
                  ]}
                  data={this.state.users}
                  options={{
                    rowStyle: (rowData, index) => {
                      if(index%2) {
                        return {backgroundColor: '#f2f2f2'}
                      }
                    },
                    pageSize: 10,
                    pageSizeOptions: [10, 20, 30, 50, 75, 100]
                  }}
                  title="Employees"
                />
              </ThemeProvider>
            </Card.Body>
          </Card>
        </div>
      </div>
    );
  }
}

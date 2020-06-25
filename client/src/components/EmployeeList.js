import React, { Component } from "react";
import { Card, Badge, Button, Form, Modal } from "react-bootstrap";
import {Redirect} from 'react-router-dom'
import MaterialTable from 'material-table'
import DeleteModal from './DeleteModal'
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
      editRedirect: false,
      deleteModal: false
    }
  }

  componentDidMount() {
    axios({
      method: 'get',
      url: '/api/users',
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

  onEdit = (user) => {
    return (event) => {
      event.preventDefault()

      this.setState({selectedUser: user, editRedirect: true})
    }
  }

  onDelete = user => {
    return event => {
      event.preventDefault()

      this.setState({selectedUser: user, deleteModal: true})
    }
  }

  render() {

    let closeDeleteModel = () => this.setState({deleteModal: false})

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
        {this.state.editRedirect ? (<Redirect to={{pathname: '/employee-edit', state: {selectedUser: this.state.selectedUser}}}></Redirect>) : (<></>)}
        {this.state.deleteModal ? (
          <DeleteModal show={true} onHide={closeDeleteModel} data={this.state.selectedUser} />
        ) :(<></>)}
        <h4>
          <a className="fa fa-plus mb-2 ml-2" href="/employee-add">
            Add Employee
          </a>
        </h4>
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
                        </Form>
                      )
                    },
                    {
                      title: 'Action',
                      render: rowData => (
                        <>
                          <Button size="sm" variant="info" className="mr-2" onClick={this.onEdit(rowData)}><i className="far fa-edit"></i>Edit</Button>
                          {rowData.id !== JSON.parse(localStorage.getItem('user')).id ? (
                            <Button size="sm" variant="danger" className="ml-1" onClick={this.onDelete(rowData)}><i className="far fa-bin"></i>Delete</Button>
                          ):(<></>)}
                        </>
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

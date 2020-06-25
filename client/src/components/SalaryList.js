import React, { Component } from "react";
import { Card, Badge, Button, Form, Modal } from "react-bootstrap";
import {Redirect} from 'react-router-dom'
import MaterialTable from 'material-table'
import DeleteModal from './DeleteModal'
import axios from 'axios'
import { ThemeProvider } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core/styles'

export default class SalaryList extends Component {
  
  constructor(props) {
    super(props)

    this.state = {
      financialInformations: [],
      selectedUser: null,
      editRedirect: false,
      deleteModal: false
    }
  }

  componentDidMount() {
    axios({
      method: 'get',
      url: '/api/financialInformations',
      headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
    })
    .then(res => {
      this.setState({financialInformations: res.data})
    })
    .catch(err => {
      console.log(err)
    })
  }

  onEdit = (financialInfo) => {
    return (event) => {
      event.preventDefault()

      this.setState({selectedUser: financialInfo.user, editRedirect: true})
    } 
  }

  onView = (user) => {
    return (event) => {
      event.preventDefault()

      this.setState({selectedUser: user, viewRedirect: true})
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
        {this.state.editRedirect ? (<Redirect to={{pathname: '/salary-details', state: {selectedUser: this.state.selectedUser}}}></Redirect>) : (<></>)}
        {this.state.viewRedirect ? (<Redirect to={{pathname: '/salary-view', state: {selectedUser: this.state.selectedUser}}}></Redirect>) : (<></>)}
        <div className="col-sm-12">
          <Card>
            <Card.Header style={{ backgroundColor: "#515e73", color: "white" }}>
              <div className="panel-title">
                <strong>List of Employees and Their Salaries</strong>
              </div>
            </Card.Header>
            <Card.Body>
              <ThemeProvider theme={theme}>
                <MaterialTable 
                  columns={[
                    {title: 'EMP ID', field: 'user.id'},
                    {title: 'Full Name', field: 'user.fullName'},
                    {title: 'Gross Salary', field: 'salaryGross'},
                    {title: 'Deductions', field: 'deductionTotal'},
                    {title: 'Net Salary', field: 'salaryNet'},
                    {title: 'Emp Type', field: 'employmentType'},
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
                        </>
                      )
                    }
                  ]}
                  data={this.state.financialInformations}
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
import React, { Component } from "react";
import { Card, Button, Form, Alert } from "react-bootstrap";
import { Redirect, NavLink } from 'react-router-dom'
import AddDepartment from './DepartmentAdd'
import EditDepartmentModal from './EditDepartmentModal'
import axios from 'axios'
import MaterialTable from 'material-table'
import { ThemeProvider } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core/styles'
import AlertModal from './AlertModal'

export default class DepartmentList extends Component {

    constructor(props) {
        super(props)

        this.state = {
            departments: [],
            jobs: [],
            selectedDepartment: null,
            hasError: false,
            errorMsg: '',
            completed: false,
            showEditModel: false,
            showAlertModel: false
        }
    }

    componentDidMount() {
        axios({
            method: 'get',
            url: '/api/departments',
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
        .then(res => {
            this.setState({departments: res.data})
        })
    }

    onEdit (department) {
        return event=> {
            event.preventDefault()
            
            this.setState({selectedDepartment: department, showEditModel: true})
        }
    }

    onDelete (department) {
        return event => {
            event.preventDefault()

            if(department.users.length > 0) {
                this.setState({showAlertModel: true})
            } else {
                axios({
                    method: 'delete',
                    url: '/api/departments/'  + department.id,
                    headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
                })
                .then(res => {
                    this.setState({completed: true})
                })
                .catch(err => {
                    this.setState({hasError: true, errorMsg: err.response.data.message})
                })
            }
            
        }
    }
    
  render() {
    let closeEditModel = () => this.setState({showEditModel: false})
    let closeAlertModel = () => this.setState({showAlertModel: false})

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
      <div className="container-fluid pt-2">
        <div className="row">
            <div className="col-sm-12">
                <AddDepartment />
            </div>
        </div>
        <div className="row">
            <div className="col-sm-12">
            <Card className="main-card">
                <Card.Header>
                <div className="panel-title">
                    <strong>Department List</strong>
                </div>
                </Card.Header>
                <Card.Body>
                    <ThemeProvider theme={theme}>
                    <MaterialTable
                            columns={[
                                {title: 'DEPT ID', field: 'id'},
                                {title: 'Department Name', field: 'departmentName'},
                                {
                                    title: 'Jobs', 
                                    render: dept => (
                                        <NavLink to={{ pathname: '/job-list', state: {selectedDepartment: dept.id}}}>Go to Job List</NavLink>
                                    )
                                },
                                {
                                    title: 'Action',
                                    render: rowData => (
                                        <Form className="row">
                                            <div className="col pl-5">
                                                <Button size="sm" variant="info" onClick={this.onEdit(rowData)}><i className="fas fa-edit"></i>Edit</Button>
                                            </div>
                                            <div className="col pr-5">
                                                <Button onClick={this.onDelete(rowData)} size="sm" variant="danger"><i className="fas fa-trash"></i>Delete</Button>
                                            </div>
                                        </Form>
                                    )
                                }
                            ]}
                            data={this.state.departments}
                            
                            options={{
                                rowStyle: (rowData, index) => {
                                    if(index%2) {
                                        return {backgroundColor: '#f2f2f2'}
                                    }
                                },
                                pageSize: 8,
                                pageSizeOptions: [5, 10, 20, 30, 50, 75, 100]
                            }}
                            title="Departments"
                    />
                    </ThemeProvider>
                </Card.Body>
            </Card>
            {this.state.showEditModel ? (
                <EditDepartmentModal show={true} onHide={closeEditModel} data={this.state.selectedDepartment} />
            ) : this.state.showAlertModel ? (
                <AlertModal show={true} onHide={closeAlertModel} />
            ) : (<></>)}
            </div>
        </div>
        {this.state.hasError ? (
            <Alert variant="danger" className="m-3" block>
              {this.state.errMsg}
            </Alert>
          ) : this.state.completed ? (
            <Redirect to="/departments" />
          ) : (<></>)}
      </div>
    );
  }
}
import React, { Component } from "react";
import { Card, Button, Form, Alert } from "react-bootstrap";
import { Redirect } from 'react-router-dom'
import AddDepartment from './DepartmentAdd'
import EditDepartmentModal from './EditDepartmentModal'
import axios from 'axios'
import MaterialTable from 'material-table'
import { ThemeProvider } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core/styles'

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
            showModel: false
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

    pushSelectItems = (department) => {
        let items= []
        department.users.map((user, index) => {
            if(user.job){
                items.push(<option key={index}>{user.job.jobTitle} - {user.fullName}</option>)
            }
        })
        // department.users.map(user => {
        //     user.jobs.map((job, index) => {
        //         if(new Date(job.startDate) <= Date.now() && new Date(job.endDate) >= Date.now() ) {
        //             items.push(<option key={index}>{job.jobTitle} - {user.fullName}</option>)
        //         }
        //     })
        // })
        return items
    }

    onEdit (department) {
        return event=> {
            event.preventDefault()
            
            this.setState({selectedDepartment: department, showModel: true})
        }
    }

    onDelete (department) {
        return event => {
            event.preventDefault()
            
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
    
  render() {
    let closeModel = () => this.setState({showModel: false})

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
                                    title: 'Job list', 
                                    field: 'jobs',
                                    render: jobs => (
                                        <select className="select-css">
                                            {this.pushSelectItems(jobs)}
                                        </select>
                                    ),
                                    cellStyle: {
                                        paddingLeft: 30,
                                        paddingRight: 50
                                    },
                                    headerStyle: {
                                        paddingLeft: 30,
                                        paddingRight: 30
                                    }
                                },
                                {
                                    title: 'Action',
                                    render: rowData => (
                                        <Form className="row" onSubmit={this.onEdit(rowData)}>
                                            <div className="col pl-5">
                                                <Button type="submit" size="sm" variant="info"><i className="fas fa-edit"></i>Edit</Button>
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

                    {/* <Table striped bordered size="sm">
                        <thead>
                            <tr className="d-flex">
                                <th className="text-muted col-1">DEPT ID</th>
                                <th className="text-muted col-5">Department Name</th>
                                <th className="text-muted col-4">Job List</th>
                                <th className="text-muted col-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.departments.map((department, index) => {
                                return(
                                    <tr key={index} className="d-flex">
                                        <td className="col-1"><b>{department.id}</b></td>
                                        <td className="col-5"><b>{department.departmentName}</b></td>
                                        <td className="col-4">
                                            <select className="select-css">
                                                {this.pushSelectItems(department)}
                                            </select>
                                        </td>
                                        <td className="col-2">
                                            <Form className="" onSubmit={this.onEdit(department)}>
                                                <div className="row">
                                                    <div className="col pl-5">
                                                        <Button variant="info" type="submit"><i className="far fa-edit"></i></Button>
                                                    </div>
                                                    <div className="col pr-5">
                                                        <Button variant="danger" onClick={this.onDelete(department)}><i className="fas fa-trash"></i></Button>
                                                    </div>
                                                </div>
                                            </Form>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table> */}
                </Card.Body>
            </Card>
            {this.state.showModel ? (
                <EditDepartmentModal show={true} onHide={closeModel} data={this.state.selectedDepartment} />
            ): (<></>)}
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
import React, { Component } from "react";
import { Card, Button, Form, Alert, Badge } from "react-bootstrap";
import { Redirect } from 'react-router-dom'
import JobAddModal from './JobAddModal'
import JobEditModal from './JobEditModal'
import JobDeleteModal from './JobDeleteModal'
import axios from 'axios'
import moment from 'moment'
import MaterialTable from 'material-table'
import { ThemeProvider } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core/styles'
import AlertModal from './AlertModal'

export default class JobList extends Component {

    constructor(props) {
        super(props)

        this.state = {
            departments: [],
            selectedDepartment: null,
            selectedJob: null,
            jobs: [],
            showEditModel: false,
            showAddModel: false,
            showDeleteModel: false
        }
    }

    componentDidMount() {
        if(this.props.location.state) {
            this.setState({selectedDepartment: this.props.location.state.selectedDepartment})
        }
        axios({
            method: 'get',
            url: '/api/departments',
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
        .then(res => {
            this.setState({departments: res.data}, () => {
                if(this.state.selectedDepartment) {
                    this.fetchData()
                }
            })
        })
        .catch(err => {
            console.log(err)
        })
    }

    fetchData = () => {
        axios({
            method: 'get',
            url: 'api/departments/' + this.state.selectedDepartment,
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
        .then(res => {
            let department = res.data
            let jobs = [];

            department.users.map(user => {
                user.jobs.map((job, index) => {
                    job.startDate = moment(job.startDate).format('YYYY-MM-DD')
                    job.endDate = moment(job.endDate).format('YYYY-MM-DD')
                    jobs.push(job)
                })
            })
            
            this.setState({jobs: jobs})
        })
        .catch(err => {
            console.log(err)
        })
    }

    fetchDataAll = () => {
        axios({
            method: 'get',
            url: 'api/departments/',
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
        .then(res => {
            let departments = res.data
            let jobs = [];

            departments.map(dept => {
                dept.users.map(user => {
                    user.jobs.map((job, index) => {
                        job.startDate = moment(job.startDate).format('YYYY-MM-DD')
                        job.endDate = moment(job.endDate).format('YYYY-MM-DD')
                        jobs.push(job)
                    })
                })
            })
            
            this.setState({jobs: jobs})
        })
        .catch(err => {
            console.log(err)
        })
    }

    pushSelectItems = () => {
        let items= []
        items.push(<option key={584390} value="all">All departments</option>)
        this.state.departments.map((dept, index) => {
            if(this.state.selectedDepartment === dept.id) {
                items.push(<option key={index} value={dept.id} defaultValue>{dept.departmentName}</option>)
            } else {
                items.push(<option key={index} value={dept.id} defaultValue>{dept.departmentName}</option>)
            }
        })
        return items
    }

    handleChange = (event) => {
        this.setState({selectedDepartment: event.target.value}, () => {
            if(this.state.selectedDepartment === "all") {
                this.fetchDataAll()
            } else {
                this.fetchData()
            }
        })
    }

    onEdit (job) {
        return event=> {
            event.preventDefault()
            
            this.setState({selectedJob: job, showEditModel: true})
        }
    }

    addJob = () => {
        this.setState({showAddModel: true})
    }

    onDelete (job) {
        return event => {
            event.preventDefault()
            this.setState({selectedJob: job}, () => {
                this.setState({showDeleteModel: true})
            })

            // if(department.users.length > 0) {
            //     this.setState({showAlertModel: true})
            // } else {
            //     axios({
            //         method: 'delete',
            //         url: '/api/departments/'  + department.id,
            //         headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            //     })
            //     .then(res => {
            //         this.setState({completed: true})
            //     })
            //     .catch(err => {
            //         this.setState({hasError: true, errorMsg: err.response.data.message})
            //     })
            // }
            
        }
    }
    
  render() {
    let closeEditModel = () => this.setState({showEditModel: false})
    let closeAddModel = () => this.setState({showAddModel: false})
    let closeDeleteModel = () => this.setState({showDeleteModel: false})

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
                <Card className="secondary-card">
                    <Card.Header><div className="required">Select Department</div></Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <select 
                                className="select-css"
                                value={this.state.selectedDepartment || ''}
                                onChange={this.handleChange}
                            >
                                <option value="">Choose one...</option>
                                {this.pushSelectItems()}
                            </select>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        </div>
        <div className="row">
            <div className="col-sm-12">
                <h4>
                    <a className="fa fa-plus mb-2 ml-2" onClick={this.addJob} style={{color: 'blue', cursor: 'pointer'}}>
                        Add Job
                    </a>
                </h4>
            <Card className="main-card">
                <Card.Header>
                <div className="panel-title">
                    <strong>Job List</strong>
                </div>
                </Card.Header>
                <Card.Body>
                    <ThemeProvider theme={theme}>
                    <MaterialTable
                            columns={[
                                {title: 'JOB ID', field: 'id'},
                                {title: 'Job Title', field: 'jobTitle'},
                                {title: 'Employee', field: 'user.fullName'},
                                {title: 'Start Date', field: 'startDate'},
                                {title: 'End Date', field: 'endDate'},
                                {
                                    title: 'State', 
                                    field: 'endDate',
                                    render: job => (
                                    //We have to set startDate hours to 0 and endDate hours to 24 so that the state of the job remains the same the whole day
                                    new Date(job.startDate).setHours(0) > new Date() ? (<Badge variant="warning">Future Job</Badge>) : (
                                        new Date(job.endDate).setHours(24) >= new Date() ? (<Badge variant="success">Current Job</Badge>) : (
                                            <Badge variant="danger">Old Job</Badge>
                                        )
                                    )
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
                            data={this.state.jobs}
                            
                            options={{
                                rowStyle: (rowData, index) => {
                                    if(index%2) {
                                        return {backgroundColor: '#f2f2f2'}
                                    }
                                },
                                pageSize: 8,
                                pageSizeOptions: [5, 10, 20, 30, 50, 75, 100]
                            }}
                            title= {this.selectedUser ? this.selectedUser.fullName : ''}
                    />
                    </ThemeProvider>
                </Card.Body>
            </Card>
            {this.state.showEditModel ? (
                <JobEditModal show={true} onHide={closeEditModel} data={this.state.selectedJob} />
            ) : this.state.showAddModel ? (
                <JobAddModal show={true} onHide={closeAddModel} />
            ) : this.state.showDeleteModel ? (
                <JobDeleteModal show={true} onHide={closeDeleteModel} data={this.state.selectedJob} />
            ) : (<></>)}
            </div>
        </div>
        {/* {this.state.hasError ? (
            <Alert variant="danger" className="m-3" block>
              {this.state.errMsg}
            </Alert>
          ) : this.state.completed ? (
            <Redirect to="/departments" />
          ) : (<></>)} */}
      </div>
    );
  }
}
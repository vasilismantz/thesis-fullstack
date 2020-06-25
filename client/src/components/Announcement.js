import React, { Component } from "react";
import { Card, Button, Form, Alert } from "react-bootstrap";
import { Redirect, NavLink } from 'react-router-dom'
import axios from 'axios'
import MaterialTable from 'material-table'
import { ThemeProvider } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core/styles'
import AlertModal from './AlertModal'

export default class Announcement extends Component {

    constructor(props) {
        super(props)

        this.state = {
            announcements: [],
            departments: [],
            title: "",
            description: "",
            userId: null,
            departmentId: null,
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

        axios({
            method: 'get',
            url: '/api/departmentAnnouncements',
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
        .then(res => {
            this.setState({announcements: res.data})
        })
    }

    onDelete (announcement) {
        return event => {
            event.preventDefault()

            axios({
                method: 'delete',
                url: '/api/departmentAnnouncements/'  + announcement.id,
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
    
    handleChange = (event) => {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    pushDepartments = () => {
        let items= []
        // items.push(<option key={584390} value="all">All departments</option>)
        this.state.departments.map((dept, index) => {
            items.push(<option key={index} value={dept.id}>{dept.departmentName}</option>)
        })
        return items
    }

    onSubmit = (event) => {
        event.preventDefault()

        let departmentId = null
        if(this.state.selectedDepartment !== 'all') {
            departmentId = this.state.selectedDepartment
        }

        let data = {
            announcementTitle: this.state.title,
            announcementDescription: this.state.description,
            createdByUserId: JSON.parse(localStorage.getItem('user')).id,
            departmentId: departmentId
        }

        axios({
            method: 'post',
            url: 'api/departmentAnnouncements',
            data: data,
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
        .then(res => {
            this.setState({completed: true})
        })
        .then(err => {
            console.log(err)
        })
    }

  render() {
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
        {this.state.completed ? <Redirect to="/announcement" /> : null}
        <div className="row">
            <div className="col-sm-12">
                <Card className="main-card">
                    <Card.Header><strong>Add Announcement</strong></Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <Form onSubmit={this.onSubmit}>
                                <Form.Group>
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control 
                                        type="text"
                                        value={this.state.title}
                                        onChange={this.handleChange}
                                        name="title"
                                        required
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control 
                                        type="textarea"
                                        value={this.state.description}
                                        onChange={this.handleChange}
                                        name="description"
                                        required
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Department</Form.Label>
                                    <Form.Control 
                                        as="select"
                                        value={this.state.selectedDepartment}
                                        onChange={this.handleChange}
                                        name="selectedDepartment"
                                    >
                                        <option value="">Choose one...</option>
                                        <option value="all">All Departments</option>
                                        {this.pushDepartments()}
                                    </Form.Control>
                                </Form.Group>
                                <Button type="submit" size="sm" className="mt-1">Publish</Button>
                            </Form>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        </div>
        <div className="row">
            <div className="col-sm-12">
            <Card className="main-card">
                <Card.Header>
                <div className="panel-title">
                    <strong>Announcement List</strong>
                </div>
                </Card.Header>
                <Card.Body>
                    <ThemeProvider theme={theme}>
                    <MaterialTable
                            columns={[
                                {title: 'ID', field: 'id'},
                                {title: 'Title', field: 'announcementTitle'},
                                {title: 'Description', field: 'announcementDescription'},
                                {title: 'Created By', field: 'user.fullName'},
                                {title: 'Department', field: 'department.departmentName'},
                                {
                                    title: 'Action',
                                    render: rowData => (
                                        <Form className="row">
                                            <Button onClick={this.onDelete(rowData)} size="sm" variant="danger"><i className="fas fa-trash"></i>Delete</Button>
                                        </Form>
                                    )
                                }
                            ]}
                            data={this.state.announcements}
                            options={{
                                rowStyle: (rowData, index) => {
                                    if(index%2) {
                                        return {backgroundColor: '#f2f2f2'}
                                    }
                                },
                                pageSize: 8,
                                pageSizeOptions: [5, 10, 20, 30, 50, 75, 100]
                            }}
                            title="Announcements"
                    />
                    </ThemeProvider>
                </Card.Body>
            </Card>
            </div>
        </div>
        {this.state.hasError ? (
            <Alert variant="danger" className="m-3" block>
              {this.state.errMsg}
            </Alert>
          ) : (<></>)}
      </div>
    );
  }
}
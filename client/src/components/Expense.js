import React, { Component } from "react";
import { Card, Button, Form, Alert, Badge } from "react-bootstrap";
import { Redirect } from 'react-router-dom'
import JobAddModal from './JobAddModal'
import JobEditModal from './JobEditModal'
import JobDeleteModal from './JobDeleteModal'
import axios from 'axios'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import MaterialTable from 'material-table'
import { ThemeProvider } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core/styles'
import AlertModal from './AlertModal'

export default class Expense extends Component {

    constructor(props) {
        super(props)

        this.state = {
            departments: [],
            selectedDepartment: null,
            itemName: "",
            purchasedFrom: "",
            purchaseDate: "",
            amountSpent: 0,
            hasError: false,
            errMsg: "",
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
        .catch(err => {
            console.log(err)
        })
    }

    pushDepartments = () => {
        let items= []
        this.state.departments.map((dept, index) => {
            items.push(<option key={index} value={dept.id}>{dept.departmentName}</option>)
        })
        return items
    }

    handleChange = (event) => {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    onSubmit = (event) => {
        event.preventDefault()

        let newExpense = {
            expenseItemName: this.state.itemName,
            expenseItemStore: this.state.purchasedFrom,
            date: new Date(this.state.purchaseDate).setHours(15),
            amount: this.state.amountSpent,
            departmentId: this.state.selectedDepartment
        }

        axios({
            method: 'post',
            url: 'api/expenses/',
            data: newExpense,
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
        .then(res => {
            this.setState({completed: true})
        })
        .catch(err => {
            this.setState({hasError: true, errMsg: err})
            window.scrollTo(0, 0)
        })
    }
    
  render() {

    return (
      <div className="container-fluid pt-2">
        <div className="row">

          {this.state.hasError ? (
            <Alert variant="danger" className="m-3" block>
              {this.state.errMsg}
            </Alert>
          ): this.state.completed ? (
            <Alert variant="success" className="m-3">
                Expense has been inserted.
            </Alert>
          ) : null}

            <div className="col-sm-12">
                <Card className="main-card">
                    <Card.Header>Add Expense</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <Form onSubmit={this.onSubmit}>
                                <Form.Group>
                                    <Form.Label>Item Name: </Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={this.state.itemName}
                                        onChange={this.handleChange}
                                        name="itemName"
                                        required
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Purchased From: </Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={this.state.purchasedFrom}
                                        onChange={this.handleChange}
                                        name="purchasedFrom"
                                        required
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Purchase Date: </Form.Label>
                                    <Form.Row>
                                    <DatePicker
                                        className="form-control ml-1"
                                        placeholderText="Pick Date"
                                        selected={this.state.purchaseDate}
                                        onChange={newDate => this.setState({purchaseDate: newDate})}
                                        required
                                    />
                                    </Form.Row>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Amount Spent: </Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={this.state.amountSpent}
                                        onChange={this.handleChange}
                                        name="amountSpent"
                                        required
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Select Department: </Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={this.state.selectedDepartment}
                                        onChange={this.handleChange}
                                        name="selectedDepartment"
                                        required
                                    >
                                        <option value="">Choose one...</option>
                                        {this.pushDepartments()}
                                    </Form.Control>
                                </Form.Group>
                                <Button type="submit" className="mt-2" size="sm">Save</Button>
                            </Form>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        </div>
        </div>
    );
  }
}
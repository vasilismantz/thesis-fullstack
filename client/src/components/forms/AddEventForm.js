import React, { Component } from "react";
import { Form, Button, Alert } from "react-bootstrap"
import DatePicker from "react-datepicker"

import "react-datepicker/dist/react-datepicker.css"

export default class AddEventForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            title: '',
            description: '',
            startDate: null,
            endDate: null,
            event: {},
            showAlert: false
        }

    }

    handleChange = (event) => {
        const { value, name } = event.target;
        this.setState({
            [name]: value
        });
    }

    handleDates = (e) => {
        if (this.state.endDate!=null) {
            if (this.state.startDate > this.state.endDate) {
                e.preventDefault()
                this.setState({showAlert: true})
            } else {
                this.setState({
                    event: {
                        title: this.state.title,
                        description: this.state.description,
                        startDate: this.state.startDate,
                        endDate: this.state.endDate,
                    }
                })
                this.props.newEvent(this.state.event)
            }
        }  
    }

    render() {
        const { showAlert } = this.state
        return (
            <React.Fragment>
                {showAlert ? (
                    <Alert variant="alert alert-warning" className="m-1">
                        <Alert.Heading>Wrong End Date</Alert.Heading>
                        <p>End Date should be after Start Date</p>
                    </Alert>) : (<></>)
                }
                <Form onSubmit={this.handleDates}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Title <span style={{ color: "red" }}>*</span></Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter a Title"
                            className="col-6"
                            name="title"
                            value={this.state.title}
                            onChange={this.handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter a Description"
                            className="col-6"
                            name="description"
                            value={this.state.description}
                            onChange={this.handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formStartDate">
                        <Form.Label>Start Date <span style={{ color: "red" }}>*</span></Form.Label>
                        <DatePicker
                            selected={this.state.startDate}
                            onChange={newStartDate => this.setState({ startDate: newStartDate })}
                            onSelect
                            showTimeSelect
                            name="description"
                            timeFormat="HH:mm"
                            name="startDate"
                            timeIntervals={15}
                            timeCaption="time"
                            dateFormat="MMMM d, yyyy h:mm aa"
                            className="form-control ml-1"
                            placeholderText="Select Start Date"
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formEndDate">
                        <Form.Label>End Date</Form.Label>
                        <DatePicker
                            selected={this.state.endDate}
                            onChange={newEndDate => this.setState({ endDate: newEndDate })}
                            showTimeSelect
                            timeFormat="HH:mm"
                            name="endDate"
                            timeIntervals={15}
                            timeCaption="time"
                            dateFormat="MMMM d, yyyy h:mm aa"
                            className="form-control ml-3"
                            placeholderText="Select End Date"
                        />
                    </Form.Group>

                    <Form.Text className="mb-3"><span style={{ color: "red" }}>*</span> Required Fields</Form.Text>
                    <Button variant="success" type="submit">
                        Submit
                </Button>
                </Form>
            </React.Fragment>
        );
    }
}

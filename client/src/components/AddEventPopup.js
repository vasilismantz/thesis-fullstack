import React, { Component } from "react";
import { Redirect } from 'react-router-dom'
import { Modal, Button, Form, Alert } from "react-bootstrap";
import moment from 'moment'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"


export default class AddEventModel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      description: "",
      startDate: null,
      endDate: null,
      event: {},
      showAlert: false,
      done: false
    };
  }

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.startDate > this.state.endDate) {
      this.setState({ showAlert: true });
    } else {
      let userId = JSON.parse(localStorage.getItem("user")).id;
      this.setState(
        {
          event: {
            eventTitle: this.state.title,
            eventDescription: this.state.description,
            eventStartDate: moment(this.state.startDate).format(
              "YYYY-MM-DD HH:mm:ss"
            ),
            eventEndDate: moment(this.state.endDate).format(
              "YYYY-MM-DD HH:mm:ss"
            ),
            userId: userId,
          },
        },
        () => {
          axios({
            method: "post",
            url: "/api/personalEvents",
            data: this.state.event,
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
            .then((res) => {
              if (res.status !== 200) {
                alert(res.data);
              } else {
                this.setState({done: true})
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      );
    }
  };

  render() {
    const {showAlert, done} = this.state  
    return (
      <Modal
        {...this.props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Event
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {done ? <Redirect to="/" /> : <></>}
            {showAlert ? (
                <Alert variant="warning" className="m-1">
                    End Date should be after Start Date
                </Alert>) : (<></>)
            }
            <Form onSubmit={this.onSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label className="required">Title</Form.Label>
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
                    <Form.Label className="required">Start Date</Form.Label>
                    <DatePicker
                        selected={this.state.startDate}
                        onChange={newStartDate => this.setState({ startDate: newStartDate })}
                        showTimeSelect
                        timeFormat="HH:mm"
                        name="startDate"
                        timeIntervals={30}
                        timeCaption="time"
                        dateFormat="yyyy-MM-dd HH:mm:ss"
                        className="form-control ml-1"
                        placeholderText="Select Start Date"
                        autoComplete="off"
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formEndDate">
                    <Form.Label className="required">End Date</Form.Label>
                    <DatePicker
                        selected={this.state.endDate}
                        onChange={newEndDate => this.setState({ endDate: newEndDate })}
                        showTimeSelect
                        timeFormat="HH:mm"
                        name="endDate"
                        timeIntervals={30}
                        timeCaption="time"
                        dateFormat="yyyy-MM-dd HH:mm:ss"
                        className="form-control ml-3"
                        placeholderText="Select End Date"
                        autoComplete="off"
                        required
                    />
                </Form.Group>

                <Form.Text className="mb-3 required"> Required Fields</Form.Text>
                <Button variant="success" type="submit">
                    Submit
            </Button>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

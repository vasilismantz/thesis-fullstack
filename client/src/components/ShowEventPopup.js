import React, { Component } from "react";
import { Redirect } from 'react-router-dom'
import { Modal, Button, Form, Alert } from "react-bootstrap";
import moment from 'moment'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"


export default class ShowEventPopup extends Component {
  constructor(props) {
    super(props);

    this.state = {
        title: '',
        description: '',
        startDate: null,
        endDate: null,
        done: false
    }
  }

  componentDidMount() {
     this.setState({
        id: this.props.data.id,
        title: this.props.data.title,
        description: this.props.data.description,
        startDate: this.props.data.start,
        endDate: this.props.data.end
    }) 
  }

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value,
    });
  };

  deleteEvent = (e) => {
    e.preventDefault()
    axios({
        method: 'delete',
        url: `/api/personalEvents/${this.state.id}`,
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
    })
    .then(res => {
        if(res.status !== 200) {
            alert(res.data)
        } else {
            this.setState({done: true})
        }
    })
  }

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
            )
          },
        },
        () => {
          axios({
            method: "put",
            url: `/api/personalEvents/${this.state.id}`,
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
            Event Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {done ? <Redirect to="/" /> : <></>}
            {showAlert ? (
                <Alert variant="alert alert-warning" className="m-1">
                    <Alert.Heading>Wrong End Date</Alert.Heading>
                    <p>End Date should be after Start Date</p>
                </Alert>) : (<></>)
            }
            <Form onSubmit={this.onSubmit}>
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

                <Form.Group controlId="formStartDate mt-1">
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
                    <Form.Label>End Date</Form.Label>
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

                <Form.Text className="mb-3 required">Required Fields</Form.Text>
                <Button variant="success" type="submit">
                    Submit
            </Button>
            </Form>
            <Form onSubmit={this.deleteEvent}>
                <Button variant="danger" type="submit" className="mt-2">
                    Delete
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

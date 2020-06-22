import React, { Component } from "react";
import { Redirect } from 'react-router-dom'
import { Modal, Alert, Button } from "react-bootstrap";
import axios from 'axios'


export default class JobDeleteModal extends Component {

    constructor(props) {
        super(props)

        this.state = {
            redirect: false
        }
    }

    onDelete = (event) => {
        event.preventDefault()

        axios({
            method: 'delete',
            url: 'api/jobs/' + this.props.data.id,
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
        .then(res => {
            this.setState({redirect: true})
        })
        .catch(err => {
            console.log(err)
        })
    }

  render() {
    return (
      <Modal
        {...this.props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
          {this.state.redirect ? (<Redirect to="/job-list" />) : null}
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Warning
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            By deleting a Job you will also delete all of its payment records as well! Are you sure?
            <br />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={this.onDelete}>Delete</Button>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}
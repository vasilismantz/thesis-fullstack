import React, { Component } from 'react'
import { Modal, Button, Row, Form, Col } from 'react-bootstrap'
import AddEventForm from './forms/AddEventForm'

export default class AddEventModel extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add Event
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddEventForm />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

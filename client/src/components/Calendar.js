import React, { Component } from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

import AddEventModal from './AddEventPopup'

export default class Calendar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            events: [],
            showModel: false
        };
    }

    onClick = () => {
        var joined = this.state.events.concat({
            title: "Test",
            start: "2020-04-29",
            end: "2020-04-30"
        });
        this.setState({ events: joined });
        console.log(this.state);
    };

    handleEventClick = (arg) => {
        this.removeEvent(arg.event)
    }

    removeEvent = (event) => {
        var newEvents = [...this.state.events]; // make a separate copy of the array
        newEvents.splice(event, 1);
        this.setState({ events: newEvents });
    }

    render() {

        let closeModel = () => this.setState({showModel: false})

        return (
            <>
                <FullCalendar
                    defaultView="dayGridMonth"
                    plugins={[dayGridPlugin, interactionPlugin]}
                    eventClick={this.handleEventClick}
                    dateClick={() => this.setState({showModel: true})}
                    events={this.state.events}
                />
                <AddEventModal
                    show={this.state.showModel}
                    onHide={closeModel}
                />
                <button onClick={this.onClick}>Test</button>
            </>
        );
    }
}

import React, { Component } from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

export default class Calendar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            events: [],
        };
    }

    formatEvents = () => {
        return this.props.appointments.map(appointment => {
            const { title, end, start } = appointment

            let startTime = new Date(start)
            let endTime = new Date(end)

            return {
                title,
                start: startTime,
                end: endTime,
                extendedProps: { ...appointment }
            }
        })
    }

    handleEventClick= ({event}) => {
        // openAppointment is a function I wrote to open a form to edit that appointment
        this.props.openAppointment(event.extendedProps)
    }

    handleEventDrop = (info) => {
        if(window.confirm("Are you sure you want to change the event date?")){
            console.log('change confirmed')

            // updateAppointment is another custom method
            this.props.updateAppointment({...info.event.extendedProps, start: info.event.start, end: info.event.end})

        } else {
            console.log('change aborted')
        }
   }

    render() {
        return (
            <>
                <FullCalendar
                    defaultView="dayGridMonth"
                    plugins={[dayGridPlugin, interactionPlugin]}
                    editable={true}
                    eventDrop={this.handleEventDrop}
                    eventClick={this.handleEventClick}
                    events={this.formatEvents()}
                />
                <button onClick={this.onClick}>Test</button>
            </>
        );
    }
}

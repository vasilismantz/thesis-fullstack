import React, { Component } from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import AddEventPopup from "./AddEventPopup";
import moment from "moment";
import ReactToolTip from "react-tooltip";

export default class Calendar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      events: [],
      showModel: false,
    };
  }

  componentDidMount() {
    this.setState({ user: JSON.parse(localStorage.getItem("user")) }, () => {
      axios({
        method: "get",
        url: `api/personalEvents/user/${this.state.user.id}`,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {

        let newEvents = res.data.map((x) => ({
        title: x.eventTitle,
          description: x.eventDescription,
          start: x.eventStartDate,
          end: x.eventEndDate,
          id: x.id,
          color: '#007bff'

        }));

        for (var i in newEvents) {
          newEvents[i].start = moment
            (newEvents[i].start)
            .format("YYYY-MM-DD HH:mm:ss");
          newEvents[i].end = moment
            (newEvents[i].end)
            .format("YYYY-MM-DD HH:mm:ss");
        }

        this.setState({ events: [...newEvents] });
      });
    });
  }

  handleEventPositioned(info) {
    info.el.setAttribute("title", info.event.extendedProps.description ? info.event.extendedProps.description : 'No description');
    ReactToolTip.rebuild();
  }

  removeEvent = (event) => {
    var newEvents = [...this.state.events]; // make a separate copy of the array
    newEvents.splice(event, 1);
    this.setState({ events: newEvents });
  };

  render() {
    let closeModel = () => this.setState({ showModel: false });

    return (
      <>
        <FullCalendar
          defaultView="dayGridMonth"
          plugins={[dayGridPlugin, interactionPlugin]}
          eventClick={this.handleEventClick}
          dateClick={() => this.setState({ showModel: true })}
          events={this.state.events}
          eventPositioned={this.handleEventPositioned}
          customButtons={{
            button: {
              text: "Add Event",
              click: () => {
                this.setState({showModel: true})
              },
            },
          }}
          header={{
            left: "prev,next today button",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
          }}
        />
        <AddEventPopup show={this.state.showModel} onHide={closeModel} />
      </>
    );
  }
}

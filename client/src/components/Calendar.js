import React, { Component } from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import AddEventPopup from "./AddEventPopup";
import moment from "moment";
import ReactToolTip from "react-tooltip";
import ShowEventPopup from './ShowEventPopup'

export default class Calendar extends Component {
  
  _isMounted=false;

  constructor(props) {
    super(props);

    this.state = {
      user: {},
      events: [],
      showAddModel: false,
      showModel: false,
      selectedEvent: {}
    };

    this.handleEventClick = this.handleEventClick.bind(this)
  }

  componentDidMount() {
    this._isMounted = true;

    if(this._isMounted) {
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
            color: '#007bff',
            textColor: 'white'
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
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleEventClick(info) {
    this.setState({
      selectedEvent: {
        id: info.event.id,
        title: info.event.title,
        description: info.event.extendedProps.description,
        start: info.event.start,
        end: info.event.end
      },
      showModel: true
    })
  }

  handleEventPositioned(info) {
    info.el.setAttribute("title", info.event.extendedProps.description ? info.event.extendedProps.description : 'No description');
    ReactToolTip.rebuild();
  }

  render() {
    let closeAddModel = () => this.setState({ showAddModel: false });
    let closeShowModel = () => this.setState({showModel: false})

    return (
      <>
        <FullCalendar
          defaultView="dayGridMonth"
          plugins={[dayGridPlugin, interactionPlugin]}
          eventClick={this.handleEventClick}
          dateClick={() => this.setState({ showAddModel: true })}
          events={this.state.events}
          eventPositioned={this.handleEventPositioned}
          eventTimeFormat= {{
            hour: '2-digit',
            minute: '2-digit',
            meridiem: false,
            hour12: false
          }}
          customButtons={{
            button: {
              text: "Add Event",
              click: () => {
                this.setState({showAddModel: true})
              },
            },
          }}
          header={{
            left: "prev,next today button",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
          }}
        />
        <AddEventPopup show={this.state.showAddModel} onHide={closeAddModel} />
        {this.state.showModel ? (
          <ShowEventPopup show={true} onHide={closeShowModel} data={this.state.selectedEvent}/>
        ) : (<></>)}
      </>
    );
  }
}

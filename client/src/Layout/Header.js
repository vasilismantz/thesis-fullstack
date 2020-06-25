import React, { Component } from "react";
import {Redirect} from "react-router-dom"
import NewPasswordModal from '../components/NewPasswordModal'

export default class Header extends Component {

  constructor(props) {
    super(props)

    this.state = {
      completed: false,
      showModal: false
    }
  }

  onLogout = (event) => {
    event.preventDefault()

    localStorage.removeItem('token');
    localStorage.removeItem('token')
    this.setState({completed: true})
  }

  newPassword = (event) => {
    event.preventDefault()

    this.setState({showModal: true})
  }

  render() {
    let closeModal = () => this.setState({showModal: false})
    return (
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        {this.state.completed ? <Redirect to="/" /> : null}
        {this.state.showModal ? <NewPasswordModal show={true} onHide={closeModal}/> : null}
        {/* Left navbar links */}
        <ul className="navbar-nav">
          <li className="nav-item">
            <a
              className="nav-link"
              data-widget="pushmenu"
              href="#"
              role="button"
            >
              <i className="fas fa-bars" />
            </a>
          </li>
          {/* <li className="nav-item d-none d-sm-inline-block">
            <a href="index3.html" className="nav-link">
              Home
            </a>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <a href="#" className="nav-link">
              Contact
            </a>
          </li> */}
        </ul>
        {/* SEARCH FORM */}
        {/* <form className="form-inline ml-3">
          <div className="input-group input-group-sm">
            <input
              className="form-control form-control-navbar"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <div className="input-group-append">
              <button className="btn btn-navbar" type="submit">
                <i className="fas fa-search" />
              </button>
            </div>
          </div>
        </form> */}
        {/* Right navbar links */}
        <ul className="navbar-nav ml-auto">
          {/* Messages Dropdown Menu */}
          {/* <li className="nav-item dropdown">
            <a className="nav-link" data-toggle="dropdown" href="#">
              <i className="far fa-comments" />
              <span className="badge badge-danger navbar-badge">3</span>
            </a>
            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
              <a href="#" className="dropdown-item">
                //Message Start
                <div className="media">
                  <img
                    src={process.env.PUBLIC_URL + '/dist/img/user1-128x128.jpg'}
                    alt="User Avatar"
                    className="img-size-50 mr-3 img-circle"
                  />
                  <div className="media-body">
                    <h3 className="dropdown-item-title">
                      Brad Diesel
                      <span className="float-right text-sm text-danger">
                        <i className="fas fa-star" />
                      </span>
                    </h3>
                    <p className="text-sm">Call me whenever you can...</p>
                    <p className="text-sm text-muted">
                      <i className="far fa-clock mr-1" /> 4 Hours Ago
                    </p>
                  </div>
                </div>
                // Message End
              </a>
              <div className="dropdown-divider" />
              <a href="#" className="dropdown-item">
                // Message Start
                <div className="media">
                  <img
                    src={process.env.PUBLIC_URL + '/dist/img/user8-128x128.jpg'}
                    alt="User Avatar"
                    className="img-size-50 img-circle mr-3"
                  />
                  <div className="media-body">
                    <h3 className="dropdown-item-title">
                      John Pierce
                      <span className="float-right text-sm text-muted">
                        <i className="fas fa-star" />
                      </span>
                    </h3>
                    <p className="text-sm">I got your message bro</p>
                    <p className="text-sm text-muted">
                      <i className="far fa-clock mr-1" /> 4 Hours Ago
                    </p>
                  </div>
                </div>
                // Message End
              </a>
              <div className="dropdown-divider" />
              <a href="#" className="dropdown-item">
                // Message Start
                <div className="media">
                  <img
                    src={process.env.PUBLIC_URL + '/dist/img/user3-128x128.jpg'}
                    alt="User Avatar"
                    className="img-size-50 img-circle mr-3"
                  />
                  <div className="media-body">
                    <h3 className="dropdown-item-title">
                      Nora Silvester
                      <span className="float-right text-sm text-warning">
                        <i className="fas fa-star" />
                      </span>
                    </h3>
                    <p className="text-sm">The subject goes here</p>
                    <p className="text-sm text-muted">
                      <i className="far fa-clock mr-1" /> 4 Hours Ago
                    </p>
                  </div>
                </div>
                // Message End
              </a>
              <div className="dropdown-divider" />
              <a href="#" className="dropdown-item dropdown-footer">
                See All Messages
              </a>
            </div>
          </li> */}
          {/* Notifications Dropdown Menu */}
          <li className="nav-item dropdown">
            <a className="nav-link" data-toggle="dropdown" href="#">
              <i className="fas fa-user" />
              <span className="pl-1">{JSON.parse(localStorage.getItem('user')).fullname}</span>
              {/* <span className="badge badge-warning navbar-badge">15</span> */}
            </a>
            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
              <span className="dropdown-header">
                Options
              </span>
              <div className="dropdown-divider" />
              <a  onClick={this.newPassword} href="#" className="dropdown-item">
                <i className="fas fa-key mr-2" /> Change Password
                {/* <span className="float-right text-muted text-sm">3 mins</span> */}
              </a>
              <div className="dropdown-divider" />
              <a onClick={this.onLogout} href="#" className="dropdown-item">
                <i className="fas fa-sign-out-alt mr-2" /> Log out
                {/* <span className="float-right text-muted text-sm">12 hours</span> */}
              </a>
              {/* <div className="dropdown-divider" />
              <a href="#" className="dropdown-item">
                <i className="fas fa-file mr-2" /> 3 new reports
                <span className="float-right text-muted text-sm">2 days</span>
              </a>
              <div className="dropdown-divider" />
              <a href="#" className="dropdown-item dropdown-footer">
                See All Notifications
              </a> */}
            </div>
          </li>
          {/* <li className="nav-item">
            <a
              className="nav-link"
              data-widget="control-sidebar"
              data-slide="true"
              href="#"
              role="button"
            >
              <i className="fas fa-th-large" />
            </a>
          </li> */}
        </ul>
      </nav>
    );
  }
}

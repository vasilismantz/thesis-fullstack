import React, { Component } from "react";

export default class Calendar extends Component {
  render() {
    return (
      <div className="col-sm-7">
        <div className="panel panel-default">
          <div className="panel-heading"></div>
          <div id="calendar" className="fc fc-ltr">
            <div className="fc-header">
              <div className="fc-header-left">
                <span
                  className="fc-button-month fc-state-default fc-state-active"
                  unselectable="on"
                >
                  Month
                </span>
                <span
                  className="fc-button-agendaWeek fc-state-default"
                  unselectable="on"
                >
                  Week
                </span>
                <span
                  className="fc-button-agendaDay fc-state-default"
                  unselectable="on"
                >
                  Day
                </span>
                <span
                  className="fc-button-today fc-state-default fc-state-disabled"
                  unselectable="on"
                >
                  Today
                </span>
              </div>
              <div className="fc-header-center">
                <span
                  className="fc-button-prev fc-state-default"
                  unselectable="on"
                >
                  <i className="fa fa-angle-left" />
                </span>
                <h2 className="fc-header-title">April 2020</h2>
                <span className="fc-header-title" style={{ marginLeft: 180 }}>
                  <div style={{ fontSize: 14 }}>
                    <span className="dash-holiday" />
                    <span style={{ marginRight: 10 }}>Holiday</span>
                    <span className="dash-leave" />
                    <span>On Leave</span>
                  </div>
                </span>
                <span
                  className="fc-button-next fc-state-default"
                  unselectable="on"
                >
                  <i className="fa fa-angle-right" />
                </span>
              </div>
              <div className="fc-header-right" />
            </div>
            <div
              className="fc-content"
              style={{ position: "relative", minHeight: 1 }}
            >
              <div
                className="fc-view fc-view-month fc-grid"
                style={{ position: "relative", minHeight: 1 }}
                unselectable="on"
              >
                <div
                  style={{ position: "absolute", zIndex: 8, top: 0, left: 0 }}
                />
                <table
                  className="fc-border-separate"
                  style={{ width: "100%" }}
                  cellSpacing={0}
                >
                  <thead>
                    <tr className="fc-first fc-last">
                      <th
                        className="fc-day-header fc-sun fc-widget-header fc-first"
                        style={{ width: 147 }}
                      >
                        Sun
                      </th>
                      <th
                        className="fc-day-header fc-mon fc-widget-header"
                        style={{ width: 147 }}
                      >
                        Mon
                      </th>
                      <th
                        className="fc-day-header fc-tue fc-widget-header"
                        style={{ width: 147 }}
                      >
                        Tue
                      </th>
                      <th
                        className="fc-day-header fc-wed fc-widget-header"
                        style={{ width: 147 }}
                      >
                        Wed
                      </th>
                      <th
                        className="fc-day-header fc-thu fc-widget-header"
                        style={{ width: 147 }}
                      >
                        Thu
                      </th>
                      <th
                        className="fc-day-header fc-fri fc-widget-header"
                        style={{ width: 147 }}
                      >
                        Fri
                      </th>
                      <th className="fc-day-header fc-sat fc-widget-header fc-last">
                        Sat
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="fc-week fc-first">
                      <td
                        className="fc-day fc-sun fc-widget-content fc-other-month fc-first"
                        data-date="2020-03-29"
                      >
                        <div style={{ minHeight: 122 }}>
                          <div className="fc-day-number">29</div>
                          <div className="fc-day-content">
                            <div style={{ position: "relative", height: 0 }}>
                              &nbsp;
                            </div>
                          </div>
                        </div>
                      </td>
                      <td
                        className="fc-day fc-mon fc-widget-content fc-other-month"
                        data-date="2020-03-30"
                      >
                        <div>
                          <div className="fc-day-number">30</div>
                          <div className="fc-day-content">
                            <div style={{ position: "relative", height: 0 }}>
                              &nbsp;
                            </div>
                          </div>
                        </div>
                      </td>
                      <td
                        className="fc-day fc-tue fc-widget-content fc-other-month"
                        data-date="2020-03-31"
                      >
                        <div>
                          <div className="fc-day-number">31</div>
                          <div className="fc-day-content">
                            <div style={{ position: "relative", height: 0 }}>
                              &nbsp;
                            </div>
                          </div>
                        </div>
                      </td>
                      <td
                        className="fc-day fc-wed fc-widget-content"
                        data-date="2020-04-01"
                      >
                        <div>
                          <div className="fc-day-number">1</div>
                          <div className="fc-day-content">
                            <div style={{ position: "relative", height: 0 }}>
                              &nbsp;
                            </div>
                          </div>
                        </div>
                      </td>
                      <td
                        className="fc-day fc-thu fc-widget-content"
                        data-date="2020-04-02"
                      >
                        <div>
                          <div className="fc-day-number">2</div>
                          <div className="fc-day-content">
                            <div style={{ position: "relative", height: 0 }}>
                              &nbsp;
                            </div>
                          </div>
                        </div>
                      </td>
                      <td
                        className="fc-day fc-fri fc-widget-content"
                        data-date="2020-04-03"
                      >
                        <div>
                          <div className="fc-day-number">3</div>
                          <div className="fc-day-content">
                            <div style={{ position: "relative", height: 0 }}>
                              &nbsp;
                            </div>
                          </div>
                        </div>
                      </td>
                      <td
                        className="fc-day fc-sat fc-widget-content fc-last"
                        data-date="2020-04-04"
                      >
                        <div>
                          <div className="fc-day-number">4</div>
                          <div className="fc-day-content">
                            <div style={{ position: "relative", height: 0 }}>
                              &nbsp;
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr className="fc-week">
                      <td
                        className="fc-day fc-sun fc-widget-content fc-first"
                        data-date="2020-04-05"
                      >
                        <div style={{ minHeight: 121 }}>
                          <div className="fc-day-number">5</div>
                          <div className="fc-day-content">
                            <div style={{ position: "relative", height: 0 }}>
                              &nbsp;
                            </div>
                          </div>
                        </div>
                      </td>
                      <td
                        className="fc-day fc-mon fc-widget-content"
                        data-date="2020-04-06"
                      >
                        <div>
                          <div className="fc-day-number">6</div>
                          <div className="fc-day-content">
                            <div style={{ position: "relative", height: 0 }}>
                              &nbsp;
                            </div>
                          </div>
                        </div>
                      </td>
                      <td
                        className="fc-day fc-tue fc-widget-content"
                        data-date="2020-04-07"
                      >
                        <div>
                          <div className="fc-day-number">7</div>
                          <div className="fc-day-content">
                            <div style={{ position: "relative", height: 0 }}>
                              &nbsp;
                            </div>
                          </div>
                        </div>
                      </td>
                      <td
                        className="fc-day fc-wed fc-widget-content"
                        data-date="2020-04-08"
                      >
                        <div>
                          <div className="fc-day-number">8</div>
                          <div className="fc-day-content">
                            <div style={{ position: "relative", height: 0 }}>
                              &nbsp;
                            </div>
                          </div>
                        </div>
                      </td>
                      <td
                        className="fc-day fc-thu fc-widget-content"
                        data-date="2020-04-09"
                      >
                        <div>
                          <div className="fc-day-number">9</div>
                          <div className="fc-day-content">
                            <div style={{ position: "relative", height: 0 }}>
                              &nbsp;
                            </div>
                          </div>
                        </div>
                      </td>
                      <td
                        className="fc-day fc-fri fc-widget-content"
                        data-date="2020-04-10"
                      >
                        <div>
                          <div className="fc-day-number">10</div>
                          <div className="fc-day-content">
                            <div style={{ position: "relative", height: 0 }}>
                              &nbsp;
                            </div>
                          </div>
                        </div>
                      </td>
                      <td
                        className="fc-day fc-sat fc-widget-content fc-last"
                        data-date="2020-04-11"
                      >
                        <div>
                          <div className="fc-day-number">11</div>
                          <div className="fc-day-content">
                            <div style={{ position: "relative", height: 0 }}>
                              &nbsp;
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr className="fc-week">
                      <td
                        className="fc-day fc-sun fc-widget-content fc-first"
                        data-date="2020-04-12"
                      >
                        <div style={{ minHeight: 121 }}>
                          <div className="fc-day-number">12</div>
                          <div className="fc-day-content">
                            <div style={{ position: "relative", height: 0 }}>
                              &nbsp;
                            </div>
                          </div>
                        </div>
                      </td>
                      <td
                        className="fc-day fc-mon fc-widget-content"
                        data-date="2020-04-13"
                      >
                        <div>
                          <div className="fc-day-number">13</div>
                          <div className="fc-day-content">
                            <div style={{ position: "relative", height: 0 }}>
                              &nbsp;
                            </div>
                          </div>
                        </div>
                      </td>
                      <td
                        className="fc-day fc-tue fc-widget-content"
                        data-date="2020-04-14"
                      >
                        <div>
                          <div className="fc-day-number">14</div>
                          <div className="fc-day-content">
                            <div style={{ position: "relative", height: 0 }}>
                              &nbsp;
                            </div>
                          </div>
                        </div>
                      </td>
                      <td
                        className="fc-day fc-wed fc-widget-content"
                        data-date="2020-04-15"
                      >
                        <div>
                          <div className="fc-day-number">15</div>
                          <div className="fc-day-content">
                            <div style={{ position: "relative", height: 0 }}>
                              &nbsp;
                            </div>
                          </div>
                        </div>
                      </td>
                      <td
                        className="fc-day fc-thu fc-widget-content"
                        data-date="2020-04-16"
                      >
                        <div>
                          <div className="fc-day-number">16</div>
                          <div className="fc-day-content">
                            <div style={{ position: "relative", height: 0 }}>
                              &nbsp;
                            </div>
                          </div>
                        </div>
                      </td>
                      <td
                        className="fc-day fc-fri fc-widget-content"
                        data-date="2020-04-17"
                      >
                        <div>
                          <div className="fc-day-number">17</div>
                          <div className="fc-day-content">
                            <div style={{ position: "relative", height: 0 }}>
                              &nbsp;
                            </div>
                          </div>
                        </div>
                      </td>
                      <td
                        className="fc-day fc-sat fc-widget-content fc-last"
                        data-date="2020-04-18"
                      >
                        <div>
                          <div className="fc-day-number">18</div>
                          <div className="fc-day-content">
                            <div style={{ position: "relative", height: 0 }}>
                              &nbsp;
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr className="fc-week">
                      <td
                        className="fc-day fc-sun fc-widget-content fc-first"
                        data-date="2020-04-19"
                      >
                        <div style={{ minHeight: 121 }}>
                          <div className="fc-day-number">19</div>
                          <div className="fc-day-content">
                            <div style={{ position: "relative", height: 0 }}>
                              &nbsp;
                            </div>
                          </div>
                        </div>
                      </td>
                      <td
                        className="fc-day fc-mon fc-widget-content"
                        data-date="2020-04-20"
                      >
                        <div>
                          <div className="fc-day-number">20</div>
                          <div className="fc-day-content">
                            <div style={{ position: "relative", height: 0 }}>
                              &nbsp;
                            </div>
                          </div>
                        </div>
                      </td>
                      <td
                        className="fc-day fc-tue fc-widget-content"
                        data-date="2020-04-21"
                      >
                        <div>
                          <div className="fc-day-number">21</div>
                          <div className="fc-day-content">
                            <div style={{ position: "relative", height: 0 }}>
                              &nbsp;
                            </div>
                          </div>
                        </div>
                      </td>
                      <td
                        className="fc-day fc-wed fc-widget-content"
                        data-date="2020-04-22"
                      >
                        <div>
                          <div className="fc-day-number">22</div>
                          <div className="fc-day-content">
                            <div style={{ position: "relative", height: 0 }}>
                              &nbsp;
                            </div>
                          </div>
                        </div>
                      </td>
                      <td
                        className="fc-day fc-thu fc-widget-content"
                        data-date="2020-04-23"
                      >
                        <div>
                          <div className="fc-day-number">23</div>
                          <div className="fc-day-content">
                            <div style={{ position: "relative", height: 0 }}>
                              &nbsp;
                            </div>
                          </div>
                        </div>
                      </td>
                      <td
                        className="fc-day fc-fri fc-widget-content"
                        data-date="2020-04-24"
                      >
                        <div>
                          <div className="fc-day-number">24</div>
                          <div className="fc-day-content">
                            <div style={{ position: "relative", height: 0 }}>
                              &nbsp;
                            </div>
                          </div>
                        </div>
                      </td>
                      <td
                        className="fc-day fc-sat fc-widget-content fc-last"
                        data-date="2020-04-25"
                      >
                        <div>
                          <div className="fc-day-number">25</div>
                          <div className="fc-day-content">
                            <div style={{ position: "relative", height: 0 }}>
                              &nbsp;
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr className="fc-week">
                      <td
                        className="fc-day fc-sun fc-widget-content fc-first"
                        data-date="2020-04-26"
                      >
                        <div style={{ minHeight: 121 }}>
                          <div className="fc-day-number">26</div>
                          <div className="fc-day-content">
                            <div style={{ position: "relative", height: 0 }}>
                              &nbsp;
                            </div>
                          </div>
                        </div>
                      </td>
                      <td
                        className="fc-day fc-mon fc-widget-content"
                        data-date="2020-04-27"
                      >
                        <div>
                          <div className="fc-day-number">27</div>
                          <div className="fc-day-content">
                            <div style={{ position: "relative", height: 0 }}>
                              &nbsp;
                            </div>
                          </div>
                        </div>
                      </td>
                      <td
                        className="fc-day fc-tue fc-widget-content fc-today fc-state-highlight"
                        data-date="2020-04-28"
                      >
                        <div>
                          <div className="fc-day-number">28</div>
                          <div className="fc-day-content">
                            <div style={{ position: "relative", height: 0 }}>
                              &nbsp;
                            </div>
                          </div>
                        </div>
                      </td>
                      <td
                        className="fc-day fc-wed fc-widget-content"
                        data-date="2020-04-29"
                      >
                        <div>
                          <div className="fc-day-number">29</div>
                          <div className="fc-day-content">
                            <div style={{ position: "relative", height: 0 }}>
                              &nbsp;
                            </div>
                          </div>
                        </div>
                      </td>
                      <td
                        className="fc-day fc-thu fc-widget-content"
                        data-date="2020-04-30"
                      >
                        <div>
                          <div className="fc-day-number">30</div>
                          <div className="fc-day-content">
                            <div style={{ position: "relative", height: 0 }}>
                              &nbsp;
                            </div>
                          </div>
                        </div>
                      </td>
                      <td
                        className="fc-day fc-fri fc-widget-content fc-other-month"
                        data-date="2020-05-01"
                      >
                        <div>
                          <div className="fc-day-number">1</div>
                          <div className="fc-day-content">
                            <div style={{ position: "relative", height: 0 }}>
                              &nbsp;
                            </div>
                          </div>
                        </div>
                      </td>
                      <td
                        className="fc-day fc-sat fc-widget-content fc-other-month fc-last"
                        data-date="2020-05-02"
                      >
                        <div>
                          <div className="fc-day-number">2</div>
                          <div className="fc-day-content">
                            <div style={{ position: "relative", height: 0 }}>
                              &nbsp;
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr className="fc-week fc-last">
                      <td
                        className="fc-day fc-sun fc-widget-content fc-other-month fc-first"
                        data-date="2020-05-03"
                      >
                        <div style={{ minHeight: 123 }}>
                          <div className="fc-day-number">3</div>
                          <div className="fc-day-content">
                            <div style={{ position: "relative", height: 0 }}>
                              &nbsp;
                            </div>
                          </div>
                        </div>
                      </td>
                      <td
                        className="fc-day fc-mon fc-widget-content fc-other-month"
                        data-date="2020-05-04"
                      >
                        <div>
                          <div className="fc-day-number">4</div>
                          <div className="fc-day-content">
                            <div style={{ position: "relative", height: 0 }}>
                              &nbsp;
                            </div>
                          </div>
                        </div>
                      </td>
                      <td
                        className="fc-day fc-tue fc-widget-content fc-other-month"
                        data-date="2020-05-05"
                      >
                        <div>
                          <div className="fc-day-number">5</div>
                          <div className="fc-day-content">
                            <div style={{ position: "relative", height: 0 }}>
                              &nbsp;
                            </div>
                          </div>
                        </div>
                      </td>
                      <td
                        className="fc-day fc-wed fc-widget-content fc-other-month"
                        data-date="2020-05-06"
                      >
                        <div>
                          <div className="fc-day-number">6</div>
                          <div className="fc-day-content">
                            <div style={{ position: "relative", height: 0 }}>
                              &nbsp;
                            </div>
                          </div>
                        </div>
                      </td>
                      <td
                        className="fc-day fc-thu fc-widget-content fc-other-month"
                        data-date="2020-05-07"
                      >
                        <div>
                          <div className="fc-day-number">7</div>
                          <div className="fc-day-content">
                            <div style={{ position: "relative", height: 0 }}>
                              &nbsp;
                            </div>
                          </div>
                        </div>
                      </td>
                      <td
                        className="fc-day fc-fri fc-widget-content fc-other-month"
                        data-date="2020-05-08"
                      >
                        <div>
                          <div className="fc-day-number">8</div>
                          <div className="fc-day-content">
                            <div style={{ position: "relative", height: 0 }}>
                              &nbsp;
                            </div>
                          </div>
                        </div>
                      </td>
                      <td
                        className="fc-day fc-sat fc-widget-content fc-other-month fc-last"
                        data-date="2020-05-09"
                      >
                        <div>
                          <div className="fc-day-number">9</div>
                          <div className="fc-day-content">
                            <div style={{ position: "relative", height: 0 }}>
                              &nbsp;
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="wrap-fpanel margin">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">Upcomming Birhday - April</h3>
            </div>
            <div className="panel-body bithday">
              <ul className="leave_apps">
                <li>
                  <a href="http://localhost/hrms/admin/employee/view_employee/1">
                    <h5>
                      <div className="pull-left">
                        <img
                          className="img-circle"
                          src="http://localhost/hrms/img/uploads/account.png"
                        />
                      </div>
                      <span>Uthpal Shovo</span>
                      <p className="leave_para">23 Jun 2020</p>
                    </h5>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

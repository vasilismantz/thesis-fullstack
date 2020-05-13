import React, { Component } from "react";

export default class Content extends Component {
  render() {
    return (
      <div className="info-box ">
        <span className={"info-box-icon " + this.props.color}>
          <i className={this.props.icon} />
        </span>
        <div className="info-box-content">
          <span className="info-box-text">{this.props.title}</span>
          <span className="info-box-number">{this.props.description}</span>
        </div>
      </div>
    );
  }
}

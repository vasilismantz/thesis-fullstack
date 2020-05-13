import React, { Component } from "react";

export default class Layout extends Component {
  render() {
    return (
      <div className="content-wrapper">
        <section className="content">
          <div className="container-fluid">
            {this.props.children}
          </div>
        </section>
      </div>
    );
  }
}

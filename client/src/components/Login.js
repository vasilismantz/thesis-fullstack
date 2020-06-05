import React, { Component } from "react";
import { Redirect } from 'react-router-dom'
import { Alert } from "react-bootstrap";
import axios from "axios";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      checkPassword: "",
      passwordShow: false,
      hasError: false,
      errorMessage: "",
      done: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  passwordVisibilityHandler = () => {
    var x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  };

  onChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value,
    });
  };

  onSubmit = (event) => {
    event.preventDefault();

    var user = {
      username: this.state.username,
      password: this.state.password,
    };

    axios({
      method: "post",
      url: "/login",
      data: user,
    })
      .then((res) => {
        localStorage.setItem('token', res.data.token)
        this.setState({done: true})
      })
      .catch((err) => {
        console.log(err.response);
        this.setState({
          hasError: true,
          errorMessage: err.response.data.message
        });
      });
  };

  render() {
    return (
      <div className="register-box">
        <div className="register-logo">
          <a href="/">
            {this.state.done ? <Redirect to="/" /> : <></>}
            <b>HR</b>MS{" "}
            <small style={{ fontSize: "10px" }}>by Mantzaris Vasileios</small>
          </a>
        </div>
        <div className="card">
          <div className="card-body register-card-body">
            {this.state.hasError ? (
              <Alert variant="danger">{this.state.errorMessage}</Alert>
            ) : null}
            <p className="login-box-msg">Login</p>
            <form onSubmit={this.onSubmit}>
              <div>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    placeholder="Username"
                    value={this.state.username}
                    onChange={this.onChange}
                    required
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-user" />
                    </div>
                  </div>
                </div>
                <div className="input-group mb-3">
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    id="password"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.onChange}
                    required
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-lock" />
                    </div>
                  </div>
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span
                        className={
                          this.state.passwordShow
                            ? "fas fa-eye"
                            : "fas fa-eye-slash"
                        }
                        onClick={this.passwordVisibilityHandler}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-8"></div>
                {/* /.col */}
                <div className="col-4">
                  <button type="submit" className="btn btn-primary btn-block">
                    Login
                  </button>
                </div>
                {/* /.col */}
              </div>
            </form>
            <a href="/register" className="text-center mt-1">
              Don't have an account? Register
            </a>
            <hr className="mt-3" />
            <p className="mb-0">by Mantzaris Vasileios</p>
          </div>
          {/* /.form-box */}
        </div>
        {/* /.card */}
      </div>
    );
  }
}

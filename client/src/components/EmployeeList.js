import React, { Component } from "react";
import {Button, Card} from 'react-bootstrap'

export default class EmployeeList extends Component {

  render() {
    return (
      <div className="container-fluid pt-5">
        <h4><a className="fa fa-plus mb-2 ml-2" href="#">Add Employee</a></h4>
        <div className="col-sm-12">
            <Card>
                <Card.Header style={{backgroundColor: "#515e73", color: "white"}}>
                    <div className="panel-title"><strong>Employee List</strong></div>
                </Card.Header>
                <Card.Body>
                    <div className="row mt-3 mb-2">
                        <div className="col-sm-6">
                            <select>
                                <option value="10" selected>10</option>
                                <option value="20">20</option>
                                <option value="30">30</option>
                            </select>
                            <span> Records Per Page</span>
                        </div>
                        <div className="col-sm-6">
                            <div className="myDiv">
                                <span>Search:</span>
                                <input type="search" className="form-control input-sm" id="search"></input>
                            </div>
                        </div>
                    </div>
                    <table className="table table-bordered" id="employee-list-table">
                        <thead className="thead">
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">First</th>
                            <th scope="col">Last</th>
                            <th scope="col">Handle</th>
                            <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            <td><Button>Test</Button></td>
                            </tr>
                            <tr>
                            <th scope="row">2</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                            <td><Button>Test</Button></td>
                            </tr>
                            <tr>
                            <th scope="row">3</th>
                            <td>Larry</td>
                            <td>the Bird</td>
                            <td>@twitter</td>
                            <td><Button>Test</Button></td>
                            </tr>
                        </tbody>
                    </table>
                </Card.Body>
            </Card>
        </div>
      </div>
    );
  }
}

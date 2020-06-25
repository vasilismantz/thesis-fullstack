import * as React from "react";
import axios from "axios";

export default class RecentApplications extends React.Component {
  
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      recentApplications: [],
    };
  }

  componentDidMount() {
    this._isMounted = true
    let deptId = JSON.parse(localStorage.getItem('user')).departmentId
    //Fetch Applications Recent
    axios({
      method: "get",
      url: "/api/applications/recent/department/" + deptId,
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }).then((res) => {
      if(this._isMounted) {
        this.setState({ recentApplications: res.data });
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <div className="card">
        <div className="mt-1" style={{ textAlign: "center" }}></div>
        <div>
          <ul>
            {this.state.recentApplications.map((app) => (
                <li style={{ listStyle: "none", height: '50px'}} key={app.id} className="mt-1 mb-2">
                  <h5>
                    <div className="float-left mr-1">
                      <img src={process.env.PUBLIC_URL + '/user-40.png'}></img>
                    </div>
                    <span>{app.user.fullName} </span>
                    <small>({app.type})</small>
                    <div className="float-right mt-2 mr-3">
                      <small style={{
                        color: (app.status === 'Approved' ? 'green' :
                                app.status === 'Rejected' ? 'red' :
                                'orange'
                        )
                      }}>{app.status}</small>
                    </div>
                    <p></p>
                  </h5>
                <hr className="mt-2 mb-2"/>
                </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

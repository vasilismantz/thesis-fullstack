import * as React from 'react';
import { Bar } from "react-chartjs-2"
import axios from 'axios'

export default class NewChartsPage extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      chartData: [],
      expenseYear: 2020
    };

  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = () => {
    axios({
      method: 'get',
      url: 'api/expense/year/' + this.state.expenseYear,
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(res => {
        let data = this.transformData(res.data)
        let array = this.makeArrayStructure(data);
        this.setState({ chartData: array })
        console.log(array)
      })
      .catch(err => {
        console.log('err', err)
      })
  }

  transformData = (data) => {
    data.forEach(obj => {
      obj.expenses = parseInt(obj.expenses)
    })
    return data;
  }

  makeArrayStructure = (data) => {
    let array = {
      labels: data.map(d => d.month),
      datasets: [{
        data: [...data.map(d => d.expenses)],
        backgroundColor: '#007fad'
      }]
    }
    return array
  }

  render() {
    return (
      <div className="card">
        <div className="mt-1" style={{ textAlign: "center" }}>
          <span className="ml-4">Select Year: </span>
          <select>
            <option value="2020">2020</option>
            <option value="2019">2019</option>
            <option value="2018">2018</option>
            <option value="2017">2017</option>
          </select>
        </div>
        <div>
          <Bar
            data={this.state.chartData}
            height={300}
            options={{ maintainAspectRatio: false }}
          />
        </div>
      </div>
    );
  }
}

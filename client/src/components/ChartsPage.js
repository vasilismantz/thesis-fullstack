import * as React from 'react';
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
} from '@devexpress/dx-react-chart-bootstrap4';
import '@devexpress/dx-react-chart-bootstrap4/dist/dx-react-chart-bootstrap4.css';
import { Animation } from '@devexpress/dx-react-chart';

const data = [
  { month: 'January', expenses: 2.525 },
  { month: 'February', expenses: 3.018 },
  { month: 'March', expenses: 3.682 },
  { month: 'April', expenses: 4.440 },
  { month: 'May', expenses: 5.310 },
  { month: 'June', expenses: 6.127 },
  { month: 'July', expenses: 6.930 },
  { month: 'August', expenses: 6.930 },
  { month: 'September', expenses: 6.930 },
  { month: 'Ocotober', expenses: 6.930 },
  { month: 'November', expenses: 6.930 },
  { month: 'December', expenses: 6.930 },
];

export default class NewChartsPage extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data,
    };
  }

  render() {
    const { data: chartData } = this.state;

    return (
      <div className="card">
        <div className="mt-1" style={{textAlign: "center"}}>
            <span className="ml-4">Select Year: </span>
            <select>
                <option value="2020">2020</option>
                <option value="2019">2019</option>
                <option value="2018">2018</option>
                <option value="2017">2017</option>
            </select>
        </div>
        <Chart
          data={chartData}
          height={300}
          options={{ maintainAspectRatio: false }}
        >
          <ArgumentAxis />
          <ValueAxis max={12} />

          <BarSeries
            valueField="expenses"
            argumentField="month"
          />
          <Title text="Expenses" />
          <Animation />
        </Chart>
      </div>
    );
  }
}

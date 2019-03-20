/******** DO NOT DELETE THESE LINES ********/

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './assets/stylesheets/style.css'
import { LineChart, Line } from 'recharts';

const baseURL = process.env.ENDPOINT;

/****** ADD YOUR CODE AFTER THIS LINE ******/

const getGreetingFromBackend = async () => {
  try {
    const url = `${baseURL}/api/sensors`
    console.log("Getting sensor from "+url)
    const response = await fetch(url);
    return response.json()
  } catch (error) {
    console.error(error);
  }
  return { sensor :"Could not get sensor from backend"};
};


const BackendGreeting = (props) => (
  <div><p>Backend says: {props.sensor[12].temperature}</p></div>
);


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sensor: [],
    };
  }

  async componentWillMount() {
    const response = await getGreetingFromBackend();
    console.log(response.results);
    this.setState({sensor: response.results});
  }

  render() {
    console.log(this.state.sensor);
    const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400},];
    return (
      <div>
      <table>
        <tr>
          <th>Aikaleima</th>
          <th>Lämpötila</th>
          <th>Kosteus</th>
        </tr>
        {this.state.sensor.map(sensorPoint => <tr  key={sensorPoint.id}>
          <td>{sensorPoint.timestamp}</td>
          <td>{sensorPoint.temperature}</td>
          <td>{sensorPoint.humidity}</td>
        </tr>)}
      </table>
      <LineChart width={400} height={400} data={data}>
      <Line type="monotone" dataKey="uv" stroke="#8884d8" />
    </LineChart>
    </div>
    );
  }
}

/****** DO NOT DELETE AFTER THIS LINE ******/

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

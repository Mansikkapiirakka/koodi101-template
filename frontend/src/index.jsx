/******** DO NOT DELETE THESE LINES ********/

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './assets/stylesheets/style.css'

const baseURL = process.env.ENDPOINT;

/****** ADD YOUR CODE AFTER THIS LINE ******/

const getGreetingFromBackend = async () => {
  try {
    const url = `${baseURL}/api/sensors`
    console.log("Getting sensors from "+url)
    const response = await fetch(url);
    return response.json()
  } catch (error) {
    console.error(error);
  }
  return { sensors :"Could not get sensors from backend"};
};


const BackendGreeting = (props) => (
  <div><p>Backend says: {props.sensors}</p></div>
);


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sensors: "",
    };
  }

  async componentWillMount() {
    const response = await getGreetingFromBackend();
    this.setState({sensors: response.sensors});
  }

  render() {

    return (
      <BackendGreeting sensors={this.state.sensors} />
    );
  }
}

/****** DO NOT DELETE AFTER THIS LINE ******/

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

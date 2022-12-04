import React from "react";
import "./App.css";
const apiKEY = process.env.REACT_APP_API_KEY;

class ActualTemperature extends React.Component {
  state = {
    temp: "",
    name: "",
    speed: "",
    sky: "",
    fail: "",
  };
  onClickChange = () => {
    const value = document.querySelector(".searchBar") as HTMLInputElement;
    const inputValue = value.value;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${apiKEY}&units=metric`;
    fetch(apiUrl)
      .then((res) => {
        if (res.ok) {
          return res;
        }
        throw Error(res.statusText);
      })
      .then((res) => res.json())
      .then((data) =>
        this.setState({
          name: `City: ${data.name}`,
          temp: `Temperature: ${data.main.temp}`,
          sky: `Sky: ${data.weather[0].main}(${data.weather[0].description})`,
          speed: `Wind speed: ${data.wind.speed} m/s`,
        })
      )
      .catch((err) => {
        this.setState({
          name: ``,
          temp: ``,
          sky: ``,
          speed: "City is not specified",
          fail: `${err}`,
        });
      });
  };
  render() {
    return (
      <div className="Main">
        <div className="search">
          <input type="text" className="searchBar" placeholder="City"></input>
          <button className="button-6" onClick={this.onClickChange}>
            Search
          </button>
        </div>
        <div className="result">
          <p>{this.state.name}</p>
          <p>{this.state.temp}</p>
          <p>{this.state.sky}</p>
          <p>{this.state.speed}</p>
          <p>{this.state.fail}</p>
        </div>
      </div>
    );
  }
}

class Main extends React.Component {
  render() {
    return (
      <div className="App">
        <ActualTemperature></ActualTemperature>
      </div>
    );
  }
}

function App() {
  return <Main />;
}

export default App;

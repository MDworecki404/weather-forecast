import React from "react";
import "./App.css";

class ActualTemperature extends React.Component {
  state = {
    temp: "",
    name: "",
  };
  onClickChange = () => {
    const value = document.querySelector(".searchBar").value;
    console.log(value);
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=e099e7dd0be9664e07a2c9b917e48e73&units=metric`
    )
      .then((res) => res.json())
      .then(
        (data) =>
          this.setState({
            city: data.name,
            temperature: data.main.temp,
          }),
        console.log(this.data)
      )
      .catch((err) => console.log(err));
  };
  render() {
    return (
      <div>
        <input type="text" className="searchBar" placeholder="City"></input>
        <button className="searchButton" onClick={this.onClickChange}>
          Search
        </button>
        <div className="result">
          <p>Miasto: {this.state.city}</p>
          <p>Temperatura: {this.state.temperature}</p>
        </div>
      </div>
    );
  }
}

class Main extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="grid item-1">
          <ActualTemperature></ActualTemperature>
        </div>
        <div className="grid item-2"></div>
        <div className="grid item-3"></div>
      </div>
    );
  }
}

function App() {
  return <Main />;
}

export default App;

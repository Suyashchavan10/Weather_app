import "./styles.css";
import { useState } from "react";
import logo from "../Weather_app_logo.png";

function WeatherApp() {
  const [city, setCity] = useState("Paris");
  const [response, setResponse] = useState(null);

  const sendRequest = async () => {
    try {
      let url;
      if (city) {
        url = `https://api.weatherapi.com/v1/current.json?key=5941b3a6fb8c48dd92250721231206&q=${city}`;
      } else {
        url = `https://api.weatherapi.com/v1/current.json?key=5941b3a6fb8c48dd92250721231206&q=Paris`;
      }
      const res = await fetch(url);
      const json = await res.json();
      setResponse(json);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <div className="title">
        <h1 className="titleName">
          {" "}
          <img src={logo} alt="Weather Logo" className="logo" /> Weather Play{" "}
        </h1>
      </div>
      <form className="form">
        <div>
          <label htmlFor="city"> City Name : </label>
          <input
            type="text"
            className="selectButton"
            name="cityName"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        {/* <div> {city} </div> */}
        <div>
          <button
            className="submitButton"
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              sendRequest();
            }}
          >
            Get Weather
          </button>
        </div>
      </form>
      <div className="weatherResponse">
        <ul>
          <li>Location-name : {response?.location.name}</li>
          <li>
            Region : {response?.location.region}, Country :{" "}
            {response?.location.country}
          </li>
          <li>
            Latitude : {response?.location.lat}, Longitude :{" "}
            {response?.location.lon}
          </li>
          <li>
            Temperature (celcius) : {response?.current.temp_c}, Temperature
            (fahrenheit) : {response?.current.temp_f}
          </li>
          <li>Condition : {response?.current.condition.text}</li>
          <li>
            <img
              src={response?.current.condition.icon}
              alt="Weather condtion"
            />
          </li>
          <li>
            Wind-Speed (mph) : {response?.current.wind_mph}, Wind-Speed (kph) :{" "}
            {response?.current.wind_kph}, Wind-Direction :{" "}
            {response?.current.wind_dir}
          </li>
          <li>
            Pressure (mb) : {response?.current.pressure_mb}, Pressure (inch) :{" "}
            {response?.current.pressure_in}
          </li>
          <li>
            Precipitation (mm) : {response?.current.precip_mm}, Precipitation
            (inch): {response?.current.precip_in}
          </li>
          <li>
            Humidity : {response?.current.humidity}, Cloud :{" "}
            {response?.current.cloud}{" "}
          </li>
        </ul>
      </div>
    </>
  );
}

export default function App() {
  return (
    <>
      <div>
        <WeatherApp />
      </div>
    </>
  );
}

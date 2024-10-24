import React, { useState } from "react";
import axios from "axios";
import { WiThermometer, WiDaySunny, WiRaindrop, WiStrongWind } from 'react-icons/wi';
//import './App.css';

const App = () => {

   //state to store the city entered by the user
   const [city, setCity] = useState('');
   //state to store weather fetched from the API
   const [weather, setWeather]= useState(null);
   //State to store error
   const [error, setError] = useState('');

  //OpenWeather API key 
   const API_KEY = '0e458ff892f42c8171c455d007e8b535';

   //Fuction to fetch weather data from OpenWeatherAPI
   const getWeather = async (e) => {
    e.preventDefault(); //Prevent form from submitting and refereshing the page.
    //Reset error message on every search
    setError('');

    try {
      //Api request to fetch weather data for the entered city
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      //Store data in state
      setWeather(response.data);
    } catch (error) {
      // if city is not found display an erro
      setError ('City not found');
      //reset the weather data if the city is not found
      setWeather (null);

    }
   };

  return (
    <div className="App">
      <h1>Weather App</h1>
      <form onSubmit={getWeather}>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Get Weather</button>
      </form>

      {error && <p>{error}</p>}

      {/* If weather data is available, display it */}
      {weather && (
        <div className="weather-info">
          <h3>{weather.name} </h3>
          {/* Display temperature with thermometer icon */}
          <p>
          <WiThermometer size={40} /> Temperature: {weather.main.temp}°C
          </p>
          {/* Display weather description with appropriate weather icon */}
          <p>
            <WiDaySunny size={40} /> Weather: {weather.weather[0].description}
          </p>
          {/* Display humidity with raindrop icon */}
          <p>
            <WiRaindrop size={40} /> Humidity: {weather.main.humidity}%
          </p>
          {/* Display wind speed with wind icon */}
          <p>
            <WiStrongWind size={40} /> Wind Speed: {weather.wind.speed} m/s
          </p>
        </div>
      )}
    </div>
  ) ;
 
}
export default App;
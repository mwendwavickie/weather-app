import React, { useState } from "react";
import axios from "axios";
import { WiThermometer, WiDaySunny, WiRaindrop, WiStrongWind } from 'react-icons/wi';
import { MdOutlineDateRange } from 'react-icons/md';
import './App.css';

const App = () => {

   //state to store the city entered by the user
   const [city, setCity] = useState('Nairobi');
   //state to store weather fetched from the API
   const [weather, setWeather]= useState(null);
   //State to store error
   const [error, setError] = useState('');
   //State to store forecast
   const [forecast, setForecast] = useState([]);
  

  //OpenWeather API key 
   const API_KEY = '0e458ff892f42c8171c455d007e8b535';

   //Fuction to fetch weather data from OpenWeatherAPI
   const getWeather = async (e) => {
    e.preventDefault(); //Prevent form from submitting and refereshing the page.
    //Reset error message on every search
    setError('');

    try {
      //Api request to fetch weather data for the entered city
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      //Store data in state
      setWeather(weatherResponse.data);

      //API request to fetch 5-day weather forecast for the entered city
      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
     );
     //Store forecast data in state
     // Filter one forecast per day (12:00 PM)
     const daily = forecastResponse.data.list.filter(reading =>
      reading.dt_txt.includes("12:00:00")
      );
     setForecast(daily); // Limit to 5 data points

    } catch (error) {
      // if city is not found display an erro
      setError ('City not found');
      //reset the weather data if the city is not found
      setWeather (null);
      setForecast ([]);// Reset forecast data

    }
   };

  return (
    <div className="App">
      <div className={'search-container'}>
      {/* Header with title and form to enter city */}

      <form onSubmit={getWeather}>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Get Weather</button>
      </form>
      </div>


      {error && <p className="error">{error}</p>}

      {/* If weather data is available, display it */}
      {weather && (
          <div className="weather-section">
            <h2>{weather.name}, {weather.sys.country}</h2>
            <p className="date">
              <MdOutlineDateRange /> {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
            </p>

            {/* Weather Card Styled Like Forecast */}
            <div className="current-weather-card">
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt="weather icon"
                className="weather-icon"
              />
              <div className="weather-details">
                <p className="temp">{Math.round(weather.main.temp)}°C</p>
                <p>{weather.weather[0].main}</p>
                <p>Humidity: {weather.main.humidity}%</p>
                <p>Wind: {weather.wind.speed} m/s</p>
              </div>
            </div>
          </div>
          )}


      
      {/* If forecast data is available, display it */}
      {forecast.length > 0 && (
        <div className="forecast-section">
          <h3>Next Forecast</h3>
          <div className="forecast-cards">
            {forecast.map((day, index) => (
              <div key={index} className="forecast-card">
                <p>{new Date(day.dt_txt).toLocaleDateString(undefined, { weekday: 'long' })}</p>
                <img
                  src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                  alt="weather icon"
                />
                <p>{Math.round(day.main.temp)}°C</p>
                <p>{day.weather[0].main}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      </div>
  ) ;
};

export default App;
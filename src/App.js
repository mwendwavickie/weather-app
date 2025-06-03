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
      </div>


      {error && <p className="error">{error}</p>}

      {/* If weather data is available, display it */}
      {weather && (
        <div className="weather-section">
          <h2>
            {weather.name}, {weather.sys.country} 
            </h2>
            <p className="date">
              <MdOutlineDateRange /> {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()} 
            </p>
          {/* Display temperature with thermometer icon */}
          <div className="weather-card">
          <p>
            <WiThermometer size={40} />  {weather.main.temp}°C
          </p>
          {/* Display weather description with appropriate weather icon */}
          <p>
            <WiDaySunny size={40} />  {weather.weather[0].description}
          </p>
          {/* Display humidity with raindrop icon */}
          <p>
            <WiRaindrop size={40} />  {weather.main.humidity}%
          </p>
          {/* Display wind speed with wind icon */}
          <p>
            <WiStrongWind size={40} />  {weather.wind.speed} m/s
          </p>
          </div>
        </div>
      )}

      {/* Wave boundary */}
      <div className="wave">
        <svg viewBox="0 0 1440 150" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path
            fill="#0078d7"
            d="M0,192L48,186.7C96,181,192,171,288,165.3C384,160,480,160,576,165.3C672,171,768,181,864,170.7C960,160,1056,128,1152,117.3C1248,107,1344,117,1392,122.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>

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
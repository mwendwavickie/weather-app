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
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      //Store data in state
      setWeather(response.data);

      //API request to fetch 5-day weather forecast for the entered city
      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
     );
     //Store forecast data in state
     setForecast(forecastResponse.data.list.slice(0, 5)); // Limit to 5 data points

    } catch (error) {
      // if city is not found display an erro
      setError ('City not found');
      //reset the weather data if the city is not found
      setWeather (null);
      setForecast (null);

    }
   };

  return (
    <div className="App">
      <div className={`App ${weather ? weather.weather[0].main.toLowerCase() : ''}`}>
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
        <div className="weather-card">
          <h1>
            {weather.name}, {weather.sys.country} 
            </h1>
            <p className="date">
              <MdOutlineDateRange /> {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()} 
            </p>
          {/* Display temperature with thermometer icon */}
          <div className="weather-info">
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
      
      {/* If forecast data is available, display it */}
      {forecast.length > 0 && (
               <div className="forecast">
                  <h2>5-Day Forecast</h2>
                  <div className="forecast-cards">
                     {forecast.map((day, index) => (
                        <div key={index} className="forecast-card">
                           <p>{new Date(day.dt_txt).toLocaleDateString()}</p>
                           <p>
                              <WiThermometer size={30} /> {day.main.temp}°C
                           </p>
                           <p>
                              <WiDaySunny size={30} /> {day.weather[0].description}
                           </p>
                           <p>
                              <WiRaindrop size={30} /> Humidity: {day.main.humidity}%
                           </p>
                           <p>
                              <WiStrongWind size={30} /> Wind: {day.wind.speed} m/s
                           </p>
                        </div>
                     ))}
                  </div>
               </div>
            )}
      </div>
    </div>
  ) ;
 
}
export default App;
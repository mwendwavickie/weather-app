import React, { useState } from "react";
import axios from "axios";


const App = () => {

   //state to store the city entered by the user
   const [city, setCity] = useState('');
   //state to store weather fetched from the API
   const [weather, setWeather]= useState(null);
   //State to store error
   const [error, setError] = useState('');

  //OpenWeather API key 
   const API_KEY = 'cb08b2626e2363dd221092fe48899015';

   //Fuction to fetch weather data from OpenWeatherAPI
   const getWeather = async (e) => {
    e.preventDefault(); //Prevent form from submitting and refereshing the page.
    //Reset error message on every search
    setError('');

    try {
      //Api request to fetch weather data for the entered city
      const response = await axios.get(
        'https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric'
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
    <div style={{textAlign: 'center', marginTop: '50px'}}>
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
  ) ;
 
}
export default App;

  import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [unit, setUnit] = useState('C');
  const [forecastData, setForecastData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const apiKey = '9133cee7bcde4363a7571647232108'; // Replace with your actual API key

  const fetchWeather = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3`);
      const data = await response.json();
      setWeatherData(data.current);
      setForecastData(data.forecast.forecastday);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setWeatherData(null);
      setForecastData([]);
      setIsLoading(false);
    }
  };

  const handleUnitChange = () => {
    setUnit(unit === 'C' ? 'F' : 'C');
  };

  const getLocationWeather = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            setIsLoading(true);
            const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${latitude},${longitude}&days=3`);
            const data = await response.json();
            setWeatherData(data.current);
            setForecastData(data.forecast.forecastday);
            setIsLoading(false);
          } catch (error) {
            console.error('Error fetching weather data:', error);
            setWeatherData(null);
            setForecastData([]);
            setIsLoading(false);
          }
        },
        (error) => {
          console.error('Error getting geolocation:', error);
        }
      );
    }
  };

  useEffect(() => {
    getLocationWeather();
  }, []); // Runs once when the component mounts

  return (
    <div className="App">
      <h1>Weather App</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
      />
      <button onClick={fetchWeather}>Search</button>
      <button onClick={getLocationWeather}>Use My Location</button>
      {isLoading && <p>Loading...</p>}
      {weatherData && (
        <div className="weather-card">
          <h2>{city}</h2>
          <p>{unit === 'C' ? `${weatherData.temp_c}°C` : `${weatherData.temp_f}°F`}</p>
          <p>{weatherData.condition.text}</p>
          <img src={weatherData.condition.icon} alt="Weather Icon" />
          <button onClick={handleUnitChange}>Toggle {unit === 'C' ? 'Fahrenheit' : 'Celsius'}</button>
        </div>
      )}
      <div className="forecast">
        <h2>3-Day Forecast</h2>
        <ul>
          {forecastData.map((day) => (
            <li key={day.date}>
              <p>{day.date}</p>
              <p>{day.day.avgtemp_c}°C | {day.day.avgtemp_f}°F</p>
              <p>{day.day.condition.text}</p>
              <img src={day.day.condition.icon} alt="Weather Icon" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

import React, { useState } from 'react'
import Search from './components/search/search'
import CurrentWeather from './components/current-weather/current-weather';
// import { WEATHER_API_KEY, WEATHER_API_URL } from './api';
import Forecast from './components/forecast/forecast';
import './App.css'

const App = () => {

  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);


  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)
    const forecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)

    Promise.all([currentWeatherFetch, forecastFetch])
    .then(async (response) => {
      const weatherResponse = await response[0].json();
      const forecastResponse = await response[1].json();

      setCurrentWeather({ city: searchData.label , ...weatherResponse });
      setForecast({ city: searchData.label, ...forecastResponse});
    })
    .catch((error) => {
      console.log(error);
    })

  }

  console.log(currentWeather);
    console.log(forecast);

  return (
    <div className='container w-full flex flex-col justify-center h-[90vh] gap-5'>
      <Search onSearchChange={handleOnSearchChange} />
      <div className="flex flex-row justify-between items-center w-full
      gap-10">
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
      </div>
      <div className=""></div>
    </div>
  )
}

export default App

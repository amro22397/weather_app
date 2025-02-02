import React, { useState } from 'react'
import Search from './components/search/search'
import CurrentWeather from './components/current-weather/current-weather';
// import { WEATHER_API_KEY, WEATHER_API_URL } from './api';
import Forecast from './components/forecast/forecast';
import './App.css'


const App = () => {

  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  
  console.log(process.env.WEATHER_STACK_API_KEY_ANOTHER)
console.log(process.env.WEATHER_API_URL_ANOTHER, process.env.WEATHER_API_KEY_ANOTHER)


  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(`${process.env.WEATHER_API_URL_ANOTHER}/weather?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API_KEY_ANOTHER}&units=metric`)
    const forecastFetch = fetch(`${process.env.WEATHER_API_URL_ANOTHER}/forecast?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API_KEY_ANOTHER}&units=metric`)

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
    <div className='container w-full flex flex-col justify-center h-[90vh] gap-5
    mx-4'>
      <Search onSearchChange={handleOnSearchChange} />
      <div className="flex xl:flex-row justify-between items-center w-full
      gap-10 flex-col">
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
      </div>
      <div className=""></div>
    </div>
  )
}

export default App

import React, { useEffect, useState } from "react";
import "./App.css";
import Cards from "./components/Cards";
import { getIconName, uppercaseFirstLetterOfWord } from "./utilFunctions";
import ipAdress from "public-ip";
import { getCityAndRegion, getCurrentWeatherFromCity } from "./APICalls";
import { getFiveDayForecast } from "./APICalls";

const currentTime = new Date().getHours();
export default function App() {
  const [weatherData, setWeatherData] = useState([]);
  const [location, setLocation] = useState({});
  const [currWeather, setCurrWeather] = useState(null);
  const [isDay, setIsDay] = useState(null);

  useEffect(() => {
    async function getWeatherData() {
      let ip = await ipAdress.v4();

      setIsDay(currentTime >= 6 && currentTime <= 17);
      console.log(currentTime);

      const cityAndRegion = await getCityAndRegion(ip);
      const { city } = cityAndRegion;

      setLocation(cityAndRegion);

      const currentWeather = await getCurrentWeatherFromCity(city);
      setCurrWeather(currentWeather);

      const weatherData = await getFiveDayForecast(city);

      console.log(weatherData);

      setWeatherData(weatherData);
    }

    getWeatherData();
  }, []);

  return (
    <>
      <video
        src={isDay ? "./Videos/clouds.mp4" : "./Videos/video-1.mp4"}
        autoPlay
        loop
        muted
      ></video>
      <div className="App">
        <div className="weather-info">
          <h1>
            {location.city}, {location.region_code}
          </h1>
          {currWeather ? (
            <div>
              <h1>
                {uppercaseFirstLetterOfWord(currWeather.description)}
                <i className={getIconName(currWeather.description)}></i>
              </h1>
              <h1>{parseInt(currWeather.temp)} &#176; </h1>
            </div>
          ) : null}
        </div>
        <h1 className="title">Your Five Day Forecast</h1>
        <Cards weatherData={weatherData} isDay={isDay} />
      </div>
    </>
  );
}

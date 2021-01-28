import React from "react";
import { getIconName, uppercaseFirstLetterOfWord } from "../utilFunctions";
import "./Cards.css";

export default function Cards({ weatherData, isDay }) {
  return (
    <div class="cards">
      {weatherData.map((item) => {
        return (
          <div
            className="card"
            style={{ backgroundColor: !isDay ? "rgba(34,34,34,1.0)" : "none" }}
          >
            <div className="container">
              <div className={!isDay ? "cards-title-night" : "cards-title"}>
                <h1 className="day">{item.day}</h1>
                <h1>
                  {uppercaseFirstLetterOfWord(item.description)}
                  <i className={getIconName(item.description)}></i>
                </h1>
              </div>
              <div className={!isDay ? "cards-info-night" : "cards-info"}>
                <p>
                  <i class="far fa-calendar-alt"></i> {item.date}
                </p>
                <p>
                  <i class="fas fa-temperature-low"></i> {item.min}
                </p>
                <p>
                  <i class="fas fa-temperature-high"></i> {item.max}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

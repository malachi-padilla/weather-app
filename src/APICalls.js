import axios from "axios";

export async function getCurrentWeatherFromCity(city) {
  let curWeatherUrl = ` https://api.weatherbit.io/v2.0/current?city=${city}&key=adc572b5a79c435198c8c4e9fa65b050&units=I`;

  return new Promise(async (resolve, reject) => {
    await axios.get(curWeatherUrl).then((response) => {
      const info = {
        temp: response.data.data[0].temp,
        description: response.data.data[0].weather.description,
        date: response.data.data[0].datetime,
      };
      resolve(info);
    });
  });
}
export async function getFiveDayForecast(city) {
  let weatherDataUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=adc572b5a79c435198c8c4e9fa65b050&units=I&city=${city}&days=5`;

  return new Promise(async (resolve, reject) => {
    await axios.get(weatherDataUrl).then((response) => {
      if (response) {
        let days = [];
        response.data.data.map((item) => {
          const [year, month, day] = item.valid_date.split("-");
          var options = {
            weekday: "long",
            month: "long",
            day: "numeric",
          };

          const date = new Date(`${year} ${month} ${day}`).toLocaleTimeString(
            "en-us",
            options
          );
          const curDayOfWeek = date.split(",")[0];

          const returnObject = {
            min: item.app_min_temp,
            max: item.app_max_temp,
            date: item.valid_date,
            description: item.weather.description,
            icon: item.weather.icon,
            day: curDayOfWeek,
          };
          days.push(returnObject);
          return item;
        });

        resolve(days);
      }
    });
  });
}

export async function getCityAndRegion(ip) {
  return new Promise(async (resolve, reject) => {
    await axios.get(`https://ipapi.co/${ip}/json/`).then(async (response) => {
      const {
        data: { city },
        data: { region_code },
      } = response;

      const returnObject = {
        city,
        region_code,
      };

      resolve(returnObject);
    });
  });
}

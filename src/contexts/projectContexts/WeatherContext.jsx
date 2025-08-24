import React, { createContext, useContext, useEffect, useState } from "react";

export const WeatherContext = createContext();

export default function WeatherProvider({ children }) {
  /* Example structure of the "current" object from the weather API:
  "current": {
    "last_updated_epoch": 1724452800,
    "last_updated": "2025-08-23 15:00",
    "temp_c": 28.0,
    "temp_f": 82.4,
    "is_day": 1,
    "condition": {
      "text": "Partly cloudy",
      "icon": "//cdn.weatherapi.com/weather/64x64/day/116.png",
      "code": 1003
    },
    "wind_mph": 6.9,
    "wind_kph": 11.2, average wind speed
    "wind_degree": 120,
    "wind_dir": "ESE",
    "pressure_mb": 1009,
    "pressure_in": 29.8,
    "precip_mm": 0.0,
    "precip_in": 0.0,
    "humidity": 74,
    "cloud": 40,
    "feelslike_c": 31.2,
    "feelslike_f": 88.1,
    "vis_km": 10.0,  how far ahead yu can clearly see
    "vis_miles": 6.0, how far ahead yu can clearly see
    "uv": 7.0,
    "gust_mph": 10.5, short-term maximum wind speed
    "gust_kph": 16.9
  }
    */
  const [currentWeather, setCurrentWeather] = useState({});
  const [location, setLocation] = useState("Mahendraganj"); // Default location

  // sunrise, sunset, moonrise, moonset, moon_phase, moon_illumination, is_moon_up, is_sun_up

  //   is_moon_up
  // 1 → The moon is currently above the horizon (visible in the sky).
  // 0 → The moon is below the horizon (not visible).

  //   is_sun_up
  // 1 → The sun is currently above the horizon (daytime).
  // 0 → The sun is below the horizon (nighttime).

  const [currentDayAstros, setCurrentDayAstros] = useState({});

  /* Example structure of the "location" object from the weather API:
  "location": {
    "name": "Mahendraganj",
    "region": "Meghalaya",
    "country": "India",
    "lat": 25.55,
    "lon": 89.83,
    "tz_id": "Asia/Kolkata",
    "localtime_epoch": 1724456400,
    "localtime": "2025-08-23 15:30"
  },
  */
  const [localisedData, setLocalisedData] = useState({});

  /* Example structure of the "day" object from the weather API:
  
  {
  "maxtemp_c": 32.0,
  "maxtemp_f": 89.6,
  "mintemp_c": 25.5,
  "mintemp_f": 77.9,
  "avgtemp_c": 28.3,
  "avgtemp_f": 82.9,
  "maxwind_mph": 9.8,
  "maxwind_kph": 15.8,
  "totalprecip_mm": 3.2,
  "totalprecip_in": 0.13,
  "totalsnow_cm": 0.0,
  "avgvis_km": 9.0,
  "avgvis_miles": 5.0,
  "avghumidity": 82,
  "daily_will_it_rain": 1,
  "daily_chance_of_rain": 75,
  "daily_will_it_snow": 0,
  "daily_chance_of_snow": 0,
  "condition": {
    "text": "Patchy rain possible",  ["Sunny", "Partly cloudy", "Light drizzle",
                                        "Moderate rain",
                                        "Patchy snow", "Mist", "Overcast",
                                        "Thundery outbreaks possible".]

    "icon": "//cdn.weatherapi.com/weather/64x64/day/176.png",
    "code": 1063
  },
  "uv": 6.0
}
*/
  const [overallDayForecasting, setOverallDayForecasting] = useState({});

  /* 24 hour forecast data--> data.forecast.forecastday[0].hour[0]
  {
  "time_epoch": 1698883200,
  "time": "2023-11-01 00:00",
  "temp_c": 15.2,
  "temp_f": 59.4,
  "is_day": 0,
  "condition": {
    "text": "Clear",
    "icon": "//cdn.weatherapi.com/weather/64x64/night/113.png",
    "code": 1000
  },
  "wind_mph": 6.9,
  "wind_kph": 11.2,
  "wind_degree": 187,
  "wind_dir": "S",
  "pressure_mb": 1016.0,
  "pressure_in": 30.0,
  "precip_mm": 0.0,
  "precip_in": 0.0,
  "humidity": 75,
  "cloud": 0,
  "feelslike_c": 15.2,
  "feelslike_f": 59.4,
  "windchill_c": 15.2,
  "windchill_f": 59.4,
  "heatindex_c": 15.2,
  "heatindex_f": 59.4,
  "dewpoint_c": 10.9,
  "dewpoint_f": 51.6,
  "will_it_rain": 0,
  "chance_of_rain": 0,
  "will_it_snow": 0,
  "chance_of_snow": 0,
  "vis_km": 10.0,
  "vis_miles": 6.0,
  "gust_mph": 11.2,
  "gust_kph": 18.0,
  "uv": 1.0
  // The "air_quality" object is NOT here because you are on the free plan.
}
*/

  const [twentyFourHourForecasting, setTwentyFourHourForecasting] = useState(
    {}
  );

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        // You may need to define 'location' or replace it with a default value
        const response = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=adf4dc20307142739ab25947250108&q=${location}&days=15`
        );
        const data = await response.json();
        setCurrentWeather(data.current);
        setCurrentDayAstros(data.forecast.forecastday[0].astro);
        setLocalisedData(data.location);
        setOverallDayForecasting(data.forecast.forecastday[0].day);
        setTwentyFourHourForecasting(data.forecast.forecastday[0].hour);
      } catch (error) {
        console.error("Failed to fetch weather data:", error);
      }
    };

    fetchWeatherData();
  }, [location]);

  return (
    <WeatherContext.Provider
      value={{
        currentWeather,
        setCurrentWeather,
        currentDayAstros,
        setCurrentDayAstros,
        location,
        setLocation,
        setLocalisedData,
        localisedData,
        setTwentyFourHourForecasting,
        twentyFourHourForecasting,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}

export const useWeather = () => useContext(WeatherContext);

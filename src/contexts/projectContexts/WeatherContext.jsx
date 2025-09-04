import React, { createContext, useContext, useEffect, useState } from "react";

export const WeatherContext = createContext();

export default function WeatherProvider({ children }) {
  const [currentWeather, setCurrentWeather] = useState({});
  const [location, setLocation] = useState(null); // start as null
  const [previousValidLocation, setPreviousValidLocation] =
    useState("Bengaluru");
  const [error, setError] = useState(null);
  const [currentDayAstros, setCurrentDayAstros] = useState({});
  const [localisedData, setLocalisedData] = useState({});
  const [overallDayForecasting, setOverallDayForecasting] = useState({});
  const [twentyFourHourForecasting, setTwentyFourHourForecasting] = useState(
    {}
  );
  const [geoError, setGeoError] = useState(null);

  //The below code tracts current device location:latitude and longitude
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;
          setLocation(`${lat},${lon}`); // prefer device location
        },
        (err) => {
          setGeoError(
            "Please allow location access to see current weather of your area."
          );
          setLocation("Bengaluru"); // fallback if denied
        }
      );
    } else {
      setGeoError("Geolocation not supported in this browser.");
      setLocation("Bengaluru"); // fallback if unsupported
    }
  }, []);

  // Fetch weather whenever location changes
  useEffect(() => {
    if (!location) return; // wait until location is set

    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=adf4dc20307142739ab25947250108&q=${location}&days=5`
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error?.message || "Location not found");
        }

        const data = await response.json();

        setCurrentWeather(data.current);
        setCurrentDayAstros(data.forecast.forecastday[0].astro);
        setLocalisedData(data.location);
        setOverallDayForecasting(data.forecast.forecastday[0].day);
        setTwentyFourHourForecasting(data?.forecast?.forecastday[0]?.hour);

        setTimeout(() => setError(null), 4000);

        setPreviousValidLocation(location);
      } catch (error) {
        setError("No Matching Location Found");
        console.error("Error fetching weather data:", error);
        setLocation(previousValidLocation); // revert
      }
    };

    fetchWeatherData();
  }, [location, previousValidLocation]);

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
        error,
        setError,
        overallDayForecasting,
        setOverallDayForecasting,
        previousValidLocation,
        geoError,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}

export const useWeather = () => useContext(WeatherContext);

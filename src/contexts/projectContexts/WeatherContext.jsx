import React, { createContext, useContext, useEffect, useState } from "react";

export const WeatherContext = createContext();

export default function WeatherProvider({ children }) {
  const [currentWeather, setCurrentWeather] = useState({});
  const [location, setLocation] = useState("Bengaluru");
  const [previousValidLocation, setPreviousValidLocation] =
    useState("Bengaluru");
  const [error, setError] = useState(null);
  const [currentDayAstros, setCurrentDayAstros] = useState({});
  const [localisedData, setLocalisedData] = useState({});
  const [overallDayForecasting, setOverallDayForecasting] = useState({});
  const [twentyFourHourForecasting, setTwentyFourHourForecasting] = useState(
    {}
  );

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=adf4dc20307142739ab25947250108&q=${location}&days=15`
        );

        // Check if the API returned an error
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error?.message || "Location not found");
        }

        const data = await response.json();
        setCurrentWeather(data.current);
        setCurrentDayAstros(data.forecast.forecastday[0].astro);
        setLocalisedData(data.location);
        setOverallDayForecasting(data.forecast.forecastday[0].day);
        setTwentyFourHourForecasting(data.forecast.forecastday[0].hour);

        setTimeout(() => {
          setError(null); // Clear any previous errors
        }, 4000);

        setPreviousValidLocation(location); // Store the valid location
      } catch (error) {
        setError("No Matching Location Found");
        console.error("Error fetching weather data:", error);
        // Revert to the previous valid location
        setLocation(previousValidLocation);
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
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}

export const useWeather = () => useContext(WeatherContext);

import { useWeather } from "../../../contexts/projectContexts/WeatherContext";
import DayAstros from "./DayAstros";
import { useNavigate } from "react-router-dom";
import HourlyData from "./HourlyData";
import { useState, useEffect } from "react";

function OverallDayData() {
  const navigate = useNavigate();

  const [isHourly, setIsHourly] = useState(false);
  const { overallDayForecasting, currentWeather, twentyFourHourForecasting } =
    useWeather();

  // This array stores 24 hour temperature data of the current day
  const TwentyFourhoursTemps = twentyFourHourForecasting.map(
    (hour) => hour.temp_c
  );
  // Extracting min and max temperature of the current day from 24 hour temperature data
  const minTemperature = Math.min(...TwentyFourhoursTemps);
  const maxTemperature = Math.max(...TwentyFourhoursTemps);

  // Making temperature for human understandable
  function maxTemp(temp) {
    if (temp > maxTemperature) {
      let max_temp = temp + 0.4;
      return max_temp;
    } else {
      return maxTemperature;
    }
  }

  function minTemp(temp) {
    if (temp < minTemperature) {
      return temp + 0.4;
    } else {
      return minTemperature;
    }
  }

  // This array stores 24 hour humidity data of the current day
  const twentyFourHoursHumidities = twentyFourHourForecasting.map(
    (hour) => hour.humidity
  );
  const minHumidity = Math.min(...twentyFourHoursHumidities);
  const maxHumidity = Math.max(...twentyFourHoursHumidities);

  // Making humidity for human understandable
  function maxHum(hum) {
    if (hum > maxHumidity) {
      let max_hum = hum + 0.4;
      return max_hum;
    } else {
      return maxHumidity;
    }
  }

  function minHum(hum) {
    if (hum < minHumidity) {
      return hum + 0.4;
    } else {
      return minHumidity;
    }
  }

  const twentyFourHoursUVIndices = twentyFourHourForecasting.map(
    (hour) => hour.uv
  );

  const maxUVIndex = Math.max(...twentyFourHoursUVIndices);

  // Extracting time epoch of the object from twentyFourHourForecasting array whose uv is maxUVIndex
  const timeEpochOfMaxUV = twentyFourHourForecasting.find(
    (hour) => hour.uv === maxUVIndex
  )?.time_epoch;

  function formatedTime(timeEpochOfMaxUV) {
    const date = new Date(timeEpochOfMaxUV * 1000);
    let hours = date.getHours();
    let mins = date.getMinutes();

    let ampm = hours >= 12 ? "PM" : "AM";
    let twelveFormat = hours % 12;
    hours = hours % 12 ? twelveFormat : 12;

    mins = mins < 10 ? "0" + mins : mins;
    hours = hours < 10 ? "0" + hours : hours;

    return `${hours}:${mins}${ampm}`;
  }

  // Hourly button click handler
  function handleHourlyClick() {
    setIsHourly(true);
  }

  const iconOfOverAllday = overallDayForecasting.condition.icon;

  function getCurrentHourEpoch() {
    const date = new Date();
    date.setMinutes(0, 0, 0);
    return Math.floor(date.getTime() / 1000);
  }

  let currentEpoch = getCurrentHourEpoch();

  const currentForecastingObj = twentyFourHourForecasting.find(
    (hour) => hour.time_epoch == currentEpoch
  );

  function bgTemperatureAccordingly(temp, isRain, isDay) {
    if (isRain) {
      if (isDay) return "bg-slate-300 text-gray-800";
      if (!isDay) return "bg-slate-400 text-white";
      return "bg-gray-500 text-white";
    }

    if (isDay) {
      if (temp >= 35) return "bg-red-400 text-white";
      if (temp >= 25) return "bg-yellow-400 text-gray-800";
      if (temp >= 15) return "bg-blue-400 text-white";
      return "bg-indigo-300 text-white";
    }

    if (!isDay) {
      if (temp >= 25) return "bg-orange-600 text-white";
      if (temp >= 15) return "bg-indigo-700 text-white";
      return "bg-gray-800 text-white";
    }

    return "bg-slate-400 text-white";
  }

  // Screen-width tracker
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Background colors for different humidity percentages
  function bgHumidity(humi) {
    if (humi > 80) return "bg-purple-700 text-white";
    if (humi > 60) return "bg-blue-300 text-gray-800";
    if (humi > 40) return "bg-teal-300 text-gray-800";
    if (humi > 20) return "bg-green-200 text-gray-800";
    if (humi > 0) return "bg-yellow-200 text-gray-800";
    return "bg-gray-200 text-gray-800";
  }

  // Background colors for different visibility distances
  function bgVisibility(visible) {
    if (visible > 10) return "bg-gray-100 text-gray-800";
    if (visible > 5) return "bg-gray-300 text-gray-800";
    if (visible > 3) return "bg-gray-500 text-white";
    if (visible > 1) return "bg-gray-700 text-white";
    return "bg-gray-900 text-white";
  }

  // Background colors for different UV index values
  function bgUVIndex(uv) {
    if (uv > 10) return "bg-purple-800 text-white";
    if (uv >= 8) return "bg-red-600 text-white";
    if (uv >= 6) return "bg-orange-500 text-white";
    if (uv >= 3) return "bg-yellow-400 text-gray-800";
    if (uv >= 0) return "bg-green-400 text-gray-800";
    return "bg-gray-200 text-gray-800";
  }

  // Animation for wind-div
  function getWindAnimationSpeed(windKph) {
    if (windKph > 50) return "1s ease-in";
    if (windKph > 30) return "2s ease-in";
    if (windKph > 15) return "3s ease-in";
    if (windKph > 5) return "5s ease-in";
    return "8s ease-in";
  }

  function width_control(width) {
    if (width > 1370) return "xl:min-w-[27rem] xl:text-3xl xl:p-4";
    if (width > 1360) return "xl:min-w-[26.6rem] xl:text-2xl xl:p-4";
    if (width > 1330) return "xl:min-w-[26rem] xl:text-2xl xl:p-4";
    if (width > 1300) return "xl:min-w-[25.8rem] xl:text-2xl xl:p-3";
    if (width > 1280) return "xl:min-w-[25rem] xl:text-xl xl:p-3";
    if (width > 1250) return "lg:min-w-[24.5rem] lg:text-2xl lg:p-4";
    if (width > 1220) return "lg:min-w-[23.7rem] lg:text-xl lg:p-4";
    if (width > 1210) return "lg:min-w-[23rem] lg:text-xl lg:p-3";
    if (width > 1200) return "lg:min-w-[22.8rem] lg:text-lg lg:p-3";
    if (width > 1190) return "lg:min-w-[22.6rem] lg:text-lg lg:p-3";
    if (width > 1180) return "lg:min-w-[22.4rem] lg:text-base lg:p-3";
    if (width > 1170) return "lg:min-w-[22.1rem] lg:text-base lg:p-3";
    if (width > 1160) return "lg:min-w-[21.9rem] lg:text-base lg:p-2";
    if (width > 1150) return "lg:min-w-[21.7rem] lg:text-base lg:p-2";
    if (width > 1140) return "lg:min-w-[21.5rem] lg:text-sm lg:p-2";
    if (width > 1130) return "lg:min-w-[21.2rem] lg:text-sm lg:p-2";
    if (width > 1120) return "lg:min-w-[21rem] lg:text-sm lg:p-2";
    if (width > 1110) return "lg:min-w-[20.8rem] lg:text-sm lg:p-2";
    if (width > 1100) return "lg:min-w-[20.6rem] lg:text-xs lg:p-2";
    if (width > 1090) return "lg:min-w-[20.4rem] lg:text-xs lg:p-2";
    if (width > 1080) return "lg:min-w-[20.2rem] lg:text-xs lg:p-1";
    if (width > 1070) return "lg:min-w-[20rem] lg:text-xs lg:p-1";
    if (width > 1060) return "lg:min-w-[19.8rem] lg:text-xs lg:p-1";
    if (width > 1050) return "lg:min-w-[19.6rem] lg:text-xs lg:p-1";
    if (width > 1040) return "lg:min-w-[19.4rem] lg:text-xs lg:p-1";
    if (width > 1030) return "lg:min-w-[19.2rem] lg:text-xs lg:p-1";
    if (width > 1024) return "lg:min-w-[19rem] lg:text-xs lg:p-1";
    if (width > 1010) return "md:min-w-[18.8rem] md:text-lg md:p-3";
    if (width > 1000) return "md:min-w-[18.6rem] md:text-base md:p-3";
    if (width > 990) return "md:min-w-[18.4rem] md:text-base md:p-2";
    if (width > 980) return "md:min-w-[18.2rem] md:text-base md:p-2";
    if (width > 970) return "md:min-w-[18rem] md:text-sm md:p-2";
    if (width > 960) return "md:min-w-[17.8rem] md:text-sm md:p-2";
    if (width > 950) return "md:min-w-[17.6rem] md:text-sm md:p-2";
    if (width > 940) return "md:min-w-[17.4rem] md:text-xs md:p-2";
    if (width > 930) return "md:min-w-[17.2rem] md:text-xs md:p-1";
    if (width > 920) return "md:min-w-[17rem] md:text-xs md:p-1";
    if (width > 910) return "md:min-w-[16.8rem] md:text-xs md:p-1";
    if (width > 900) return "md:min-w-[16.6rem] md:text-xs md:p-1";
    if (width > 890) return "md:min-w-[16.4rem] md:text-xs md:p-1";
    if (width > 880) return "md:min-w-[16.2rem] md:text-xs md:p-1";
    if (width > 870) return "md:min-w-[16rem] md:text-xs md:p-1";
    if (width > 860) return "md:min-w-[15.8rem] md:text-xs md:p-1";
    if (width > 850) return "md:min-w-[15.6rem] md:text-xs md:p-1";
    if (width > 840) return "md:min-w-[15.4rem] md:text-xs md:p-1";
    if (width > 830) return "md:min-w-[15.2rem] md:text-xs md:p-1";
    if (width > 820) return "md:min-w-[15rem] md:text-xs md:p-1";
    if (width > 810) return "md:min-w-[14.8rem] md:text-xs md:p-1";
    if (width > 800) return "md:min-w-[14.6rem] md:text-xs md:p-1";
    if (width > 790) return "md:min-w-[14.4rem] md:text-xs md:p-1";
    if (width > 780) return "md:min-w-[14.2rem] md:text-xs md:p-1";
    if (width > 770) return "md:min-w-[14rem] md:text-xs md:p-1";
    if (width > 768) return "md:min-w-[13.8rem] md:text-xs md:p-1";
    return "md:min-w-[13.5rem] md:text-xs md:p-1";
  }

  // Animation speed based on precipitation
  function getRainAnimationSpeed(isRain, rainPrecip) {
    if (isRain === null || isRain === undefined) return "6s ease-in";
    if (rainPrecip === null || rainPrecip === undefined || rainPrecip < 0) {
      rainPrecip = 0;
    }

    if (!isRain) return "6s ease-in";
    if (rainPrecip === 0) return "6s ease-in";
    if (rainPrecip < 0.1) return "5s ease-in";
    if (rainPrecip < 0.3) return "4s ease-in";
    if (rainPrecip < 0.5) return "3s ease-in";
    if (rainPrecip < 1.0) return "2s ease-in";
    return "1s ease-in";
  }

  return (
    <>
      {isHourly ? (
        <HourlyData />
      ) : (
        <div className="border-4 flex flex-col border-blue-300 rounded-lg p-2 gap-3 xl:border-none xl:rounded-xl xl:p-4 xl:gap-4 lg:rounded-lg lg:p-3 lg:gap-3 md:rounded-md md:p-2 md:gap-2 bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="flex flex-row justify-between items-center pl-[0.12rem] pr-1 xl:pl-2 xl:pr-3 xl:pb-2 lg:pl-1 lg:pr-2 lg:pb-1 md:pl-1 md:pr-1">
            <div className="flex flex-row justify-items-start gap-1 xl:gap-2 lg:gap-2 md:gap-1">
              <button
                className="bg-blue-500 p-2 rounded-md text-lg text-white font-semibold hover:bg-blue-800 active:bg-blue-950 transition xl:p-3 xl:text-xl xl:rounded-lg lg:p-2 lg:text-lg lg:rounded-md md:p-1 md:text-base md:rounded-sm"
                onClick={() => navigate("/projects/weather")}
              >
                current
              </button>
              <button
                className="bg-blue-500 p-2 rounded-md text-lg text-white font-semibold hover:bg-blue-800 active:bg-blue-950 transition xl:p-3 xl:text-xl xl:rounded-lg lg:p-2 lg:text-lg lg:rounded-md md:p-1 md:text-base md:rounded-sm"
                onClick={handleHourlyClick}
              >
                hourly
              </button>
            </div>

            <div>
              <p
                className={`text-2xl cursor-default font-bold ${
                  currentWeather?.is_day ? "text-yellow-400" : "text-gray-400"
                } xl:text-3xl lg:text-2xl md:text-xl`}
              >
                {currentWeather.is_day ? "☀️ Day" : "🌛 Night"}
              </p>
            </div>
          </div>

          {/* Main content area */}
          <div className="flex flex-col gap-2 xl:flex-row xl:justify-between xl:pl-2 xl:pr-2 xl:gap-4 lg:flex-row lg:justify-between lg:pl-1 lg:pr-1 lg:gap-3 md:flex-row md:justify-between md:pl-1 md:pr-1 md:gap-2">
            {/* Temperature section */}
            <div
              className={`flex flex-row justify-between items-center p-2 rounded-md ${bgTemperatureAccordingly(
                currentForecastingObj?.temp_c,
                currentForecastingObj?.will_it_rain,
                currentForecastingObj?.is_day
              )} xl:flex-col xl:justify-around xl:p-4 xl:rounded-xl lg:flex-col lg:justify-around lg:p-3 lg:rounded-lg md:flex-col md:justify-around md:p-2 md:rounded-md ${width_control(
                width
              )}`}
            >
              <div className="flex flex-col justify-between items-center gap-2 xl:gap-3 lg:gap-2 md:gap-1">
                <p className="text-2xl font-bold text-white xl:text-5xl xl:font-extrabold lg:text-4xl lg:font-bold md:text-3xl">
                  {minTemp(currentWeather?.temp_c)}&deg;C-
                  {maxTemp(currentWeather?.temp_c)}&deg;C
                </p>
                <p className="font-semibold text-white text-xl xl:text-4xl xl:font-bold lg:text-[1.8rem] lg:font-bold md:text-xl">
                  <span>currTemp:</span>
                  <span> {currentWeather.temp_c}</span>
                  <span className="text-xl font-semibold text-white xl:text-2xl lg:text-xl md:text-lg">
                    &deg;C
                  </span>
                </p>
                <p className="text-white xl:text-lg lg:text-base md:text-sm">
                  width : {width}
                </p>
              </div>
              <div className="flex flex-col items-center xl:gap-1 lg:gap-1 md:gap-0">
                <img
                  className="size-32 xl:size-48 xl:my-2 lg:size-40 lg:my-1 md:size-32"
                  src={iconOfOverAllday}
                  alt="icon"
                />
                <p className="text-sm font-semibold text-white xl:text-2xl xl:mt-2 lg:text-xl lg:mt-1 md:text-base">
                  {overallDayForecasting.condition.text}
                </p>
              </div>
            </div>

            {/* Weather metrics section */}
            <div
              className={`flex flex-col gap-2 bg-slate-600 rounded-md p-2 xl:gap-3 xl:p-3 xl:rounded-xl lg:gap-2 lg:p-2 lg:rounded-lg md:gap-1 md:p-1 md:rounded-md ${width_control(
                width
              )}  lg:gap-5`}
            >
              {/* Humidity */}
              <div
                className={`flex flex-row justify-between items-center py-1 px-2 border-2 border-blue-300 rounded-lg ${bgHumidity(
                  currentWeather?.humidity
                )} xl:py-2 xl:px-3 xl:rounded-xl lg:py-1 lg:px-2 lg:rounded-lg md:py-1 md:px-1 md:rounded-md`}
              >
                <p className="text-white font-semibold text-2xl xl:text-2xl lg:text-xl md:text-lg">
                  Humidity:
                </p>
                <p className="flex flex-col items-end xl:gap-1 lg:gap-0 md:gap-0">
                  <span className="text-white font-semibold text-2xl xl:text-2xl lg:text-xl md:text-lg">
                    {minHum(currentWeather.humidity)}% -{" "}
                    {maxHum(currentWeather.humidity)}%
                  </span>

                  {currentWeather.humidity ? (
                    <span className="text-white font-semibold text-xl xl:text-xl lg:text-lg md:text-base">
                      currHum : {currentWeather.humidity}%
                    </span>
                  ) : (
                    <span className="hidden"></span>
                  )}
                </p>
              </div>

              {/* Visibility */}
              <div
                className={`flex flex-row justify-between items-center py-1 px-2 border-2 border-blue-300 rounded-lg ${bgVisibility(
                  currentWeather?.vis_km
                )} xl:py-2 xl:px-3 xl:rounded-xl lg:py-1 lg:px-2 lg:rounded-lg md:py-1 md:px-1 md:rounded-md`}
              >
                <p
                  className={`text-white font-semibold text-2xl xl:text-2xl lg:text-xl md:text-lg ${
                    width > 768 && width < 860 ? "md:text-sm" : "md-text-lg"
                  }`}
                >
                  Visibility
                  <span className="text-sm xl:text-base lg:text-sm md:text-xs">
                    avg
                  </span>
                  :
                </p>
                <p
                  className={`text-white font-semibold text-2xl xl:text-2xl lg:text-xl md:text-lg ${
                    width > 768 && width < 860 ? "md:text-sm" : "md-text-lg"
                  }`}
                >
                  {overallDayForecasting.avgvis_km} km |{" "}
                  {overallDayForecasting.avgvis_miles} miles
                </p>
              </div>

              {/* UV Index */}
              <div
                className={`flex flex-row justify-between items-center py-1 px-2 border-2 border-blue-300 rounded-lg ${bgUVIndex(
                  currentWeather?.uv
                )} xl:py-2 xl:px-3 xl:rounded-xl lg:py-1 lg:px-2 lg:rounded-lg md:py-1 md:px-1 md:rounded-md`}
              >
                <p className="text-white font-semibold text-2xl xl:text-2xl lg:text-xl md:text-lg">
                  UV
                  <span className="text-xs xl:text-sm lg:text-xs md:text-xs">
                    max
                  </span>{" "}
                  :
                </p>
                <p
                  className={`text-xl text-white font-semibold xl:text-xl lg:text-lg md:text-base  ${
                    width > 768 && width < 860 ? "md:text-sm" : "md-text-base"
                  }`}
                >
                  at {formatedTime(timeEpochOfMaxUV)}
                </p>
                <p className="flex flex-col items-end xl:gap-1 lg:gap-0 md:gap-0">
                  <span
                    className={`text-white font-semibold text-2xl xl:text-2xl lg:text-xl md:text-lg  ${
                      width > 768 && width < 860 ? "md:text-sm" : "md-text-lg"
                    }`}
                  >
                    {maxUVIndex}
                  </span>

                  {currentWeather.uv ? (
                    <span
                      className={`text-white font-semibold text-xl xl:text-xl lg:text-lg md:text-base  ${
                        width > 768 && width < 860
                          ? "md:text-sm"
                          : "md-text-base"
                      }`}
                    >
                      currUV : {currentWeather.uv}
                    </span>
                  ) : (
                    <span className="hidden"></span>
                  )}
                </p>
              </div>

              {/* Wind Speed */}
              <div
                className={`flex flex-row justify-between items-center py-1 px-2 border-2 border-blue-300 rounded-lg 
                          bg-gradient-to-tr from-red-300 via-blue-200 to-blue-400 bg-[length:200%_100%]
                       animate-wind-flow xl:py-2 xl:px-3 xl:rounded-xl lg:py-1 lg:px-2 lg:rounded-lg md:py-1 md:px-1 md:rounded-md`}
                style={{
                  animationDuration: getWindAnimationSpeed(
                    currentWeather?.wind_kph || 0
                  ),
                }}
              >
                <p className="text-white font-semibold text-2xl xl:text-2xl lg:text-xl md:text-lg">
                  Wind
                  <span className="text-xs xl:text-sm lg:text-xs md:text-xs">
                    max
                  </span>{" "}
                  :
                </p>
                <p className="text-2xl font-semibold text-white xl:text-2xl lg:text-xl md:text-lg">
                  {overallDayForecasting.maxwind_kph} km/h
                </p>
              </div>

              {/* Rain Possibility */}
              {overallDayForecasting.daily_will_it_rain ? (
                <div
                  className={`flex flex-row justify-between items-center py-1 px-2 border-2 border-blue-300 rounded-lg 
                  bg-gradient-to-br from-slate-500 via-violet-300 to-slate-700 bg-[length:200%_300%]
                       animate-wind-flow xl:py-2 xl:px-3 xl:rounded-xl lg:py-1 lg:px-2 lg:rounded-lg md:py-1 md:px-1 md:rounded-md`}
                  style={{
                    animationDuration: getRainAnimationSpeed(
                      overallDayForecasting.daily_will_it_rain,
                      overallDayForecasting.totalprecip_in
                    ),
                  }}
                >
                  <p
                    className={`text-white font-semibold text-2xl xl:text-2xl lg:text-xl md:text-lg ${
                      width > 768 && width < 860 ? "md:text-sm" : "md-text-lg"
                    }`}
                  >
                    Rain Possibility:
                  </p>
                  <p
                    className={`text-white font-semibold text-xl xl:text-xl lg:text-lg md:text-base ${
                      width > 768 && width < 860 ? "md:text-sm" : "md:text-base"
                    } `}
                  >
                    {overallDayForecasting.daily_chance_of_rain}% |{" "}
                    {overallDayForecasting.daily_will_it_rain
                      ? "rain-yes"
                      : "rain-no"}
                  </p>
                </div>
              ) : (
                <div className="hidden"></div>
              )}

              {/* Precipitation */}
              {overallDayForecasting.daily_will_it_rain ? (
                <div
                  className="flex flex-row justify-between items-center py-1 px-2 border-2 border-blue-300 rounded-lg bg-gradient-to-br from-emerald-300 via-blue-400 to-slate-100 bg-[length:200%_300%]
                       animate-wind-flow xl:py-2 xl:px-3 xl:rounded-xl lg:py-1 lg:px-2 lg:rounded-lg md:py-1 md:px-1 md:rounded-md"
                >
                  <p className="text-white text-2xl font-semibold xl:text-2xl lg:text-xl md:text-lg">
                    Precipitation :
                  </p>
                  <p className="text-white font-semibold text-2xl xl:text-2xl lg:text-xl md:text-lg">
                    {overallDayForecasting.totalprecip_in} inch
                  </p>
                </div>
              ) : (
                <div className="hidden"></div>
              )}

              {/* Snowy Possibility */}
              {overallDayForecasting.totalsnow_cm ? (
                <div className="flex flex-row justify-between items-center py-1 px-2 border-2 border-blue-300 rounded-lg bg-slate-400 xl:py-2 xl:px-3 xl:rounded-xl lg:py-1 lg:px-2 lg:rounded-lg md:py-1 md:px-1 md:rounded-md">
                  <p className="text-white text-2xl font-semibold xl:text-2xl lg:text-xl md:text-lg">
                    snow-precip :{" "}
                  </p>
                  <p className="text-white font-semibold text-2xl xl:text-2xl lg:text-xl md:text-lg">
                    {overallDayForecasting.totalsnow_cm} cm
                  </p>
                </div>
              ) : (
                <div className="hidden"></div>
              )}
            </div>

            {/* Astronomy section */}
            <DayAstros />
          </div>
        </div>
      )}
    </>
  );
}

export default OverallDayData;

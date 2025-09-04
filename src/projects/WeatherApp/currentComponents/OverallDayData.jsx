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

  //   //This state is to store 24 hour temperature data of the current day
  //   const [tempTwentyFourHour, setTempTwentyFourHour] = useState(
  //     twentyFourHourForecasting.map((hour) => hour.temp_c)
  //   );
  //this array store 24 hour temperature data of the current day
  const TwentyFourhoursTemps = twentyFourHourForecasting.map(
    (hour) => hour.temp_c
  );
  //extracting min and max temperature of the current day from 24 hour temperature data
  const minTemperature = Math.min(...TwentyFourhoursTemps);
  const maxTemperature = Math.max(...TwentyFourhoursTemps);

  //   making temperature for human understandable
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

  //this array store 24 hour humidity data of the current day
  const twentyFourHoursHumidities = twentyFourHourForecasting.map(
    (hour) => hour.humidity
  );
  const minHumidity = Math.min(...twentyFourHoursHumidities);
  const maxHumidity = Math.max(...twentyFourHoursHumidities);
  //   making humidity for human understandable
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

  //Extracting time epoch of the object from twentyFourHourForecasting array whose uv is maxUVIndex
  const timeEpochOfMaxUV = twentyFourHourForecasting.find(
    (hour) => hour.uv === maxUVIndex //THIS RETURNS THE OBJECT WHOSE UV === maxUVIndex
  )?.time_epoch; //this specifies the time epoch of that object whose UV === maxUVIndex

  function formatedTime(timeEpochOfMaxUV) {
    const date = new Date(timeEpochOfMaxUV * 1000);
    let hours = date.getHours();
    let mins = date.getMinutes();

    let ampm = hours >= 12 ? "PM" : "AM";

    let twelveFormat = hours % 12;

    hours = hours % 12 ? twelveFormat : 12; //now hours is into 12-format

    mins = mins < 10 ? "0" + mins : mins;

    hours = hours < 10 ? "0" + hours : hours;

    return `${hours}:${mins}${ampm}`; // Fixed return statement
  }

  //hourly button click handler
  function handleHourlyClick() {
    setIsHourly(true);
  }

  const iconOfOverAllday = overallDayForecasting.condition.icon;

  function getCurrentHourEpoch() {
    const date = new Date(); // current time
    date.setMinutes(0, 0, 0); // reset minutes, seconds, milliseconds → 00:00:00
    return Math.floor(date.getTime() / 1000); // convert ms → seconds
  }

  let currentEpoch = getCurrentHourEpoch();

  const currentForecastingObj = twentyFourHourForecasting.find(
    (hour) => hour.time_epoch == currentEpoch
  );

  // console.log(currentForecastingObj);

  function bgTemperatureAccordingly(temp, isRain, isDay) {
    // Rain overrides background but still respects time of day
    if (isRain) {
      if (isDay) return "bg-slate-300"; // rainy day
      if (!isDay) return "bg-slate-400"; // rainy night
      return "bg-gray-500"; // rainy (fallback)
    }

    // Daytime logic
    if (isDay) {
      if (temp >= 35) return "bg-red-400"; // very hot daytime
      if (temp >= 25) return "bg-yellow-400"; // warm sunny
      if (temp >= 15) return "bg-blue-400"; // cool day
      return "bg-indigo-300"; // cold day
    }

    // Nighttime logic
    if (!isDay) {
      if (temp >= 25) return "bg-orange-600"; // warm night
      if (temp >= 15) return "bg-indigo-700"; // cool night
      return "bg-gray-800"; // cold night
    }

    // Default fallback
    return "bg-slate-400";
  }

  // screen-width tracker
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth); // update state with new width
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // bgHumidity for different humidity percentages

  function bgHumidity(humi) {
    if (humi > 80) {
      return "bg-purple-700";
    } else if (humi > 60) {
      return "bg-blue-300";
    } else if (humi > 40) {
      return "bg-teal-300";
    } else if (humi > 20) {
      return "bg-green-200";
    } else if (humi > 0) {
      return "bg-yellow-200";
    }
  }

  //bgVisibility for different visible distances
  function bgVisibility(visible) {
    if (visible > 10) {
      return "bg-gray-100";
    } else if (visible > 5) {
      return "bg-gray-300";
    } else if (visible > 3) {
      return "bg-gray-500";
    } else if (visible > 1) {
      return "bg-gray-700";
    }
  }
  console.log(currentWeather?.uv);
  //bgUVIndex for different uv index values
  function bgUVIndex(uv) {
    if (uv > 10) {
      return "bg-purple-800";
    } else if (uv >= 8) {
      return "bg-red-600";
    } else if (uv >= 6) {
      return "bg-orange-500";
    } else if (uv >= 3) {
      return "bg-yellow-400";
    } else if (uv >= 0) {
      return "bg-green-400";
    }
  }

  //Animation for wind-div
  function getWindAnimationSpeed(windKph) {
    if (windKph > 50) return "1s ease-in"; // Very windy - fast animation
    if (windKph > 30) return "2s ease-in"; // Windy - medium fast
    if (windKph > 15) return "3s ease-in"; // Breezy - normal
    if (windKph > 5) return "5s ease-in"; // Light breeze - slow
    return "8s ease-in"; // Calm - very slow
  }

  function width_control_xl(width) {
    if (width > 1370) {
      return "xl:min-w-[27rem]";
    } else if (width > 1360) {
      return "xl:min-w-[26.6rem]";
    } else if (width > 1330) {
      return "xl:min-w-[26rem]";
    } else if (width > 1300) {
      return "xl:min-w-[25.8rem]";
    } else if (width > 1280) {
      return "xl:min-w-[25rem]";
    }
  }

  return (
    <>
      {isHourly ? (
        <HourlyData />
      ) : (
        <div className="border-4 flex flex-col border-blue-300 rounded-lg p-2 gap-3 xl:border-none">
          <div className="flex flex-row justify-between items-center pl-[0.12rem] pr-1 xl:pl-1 xl:pr-2">
            <div className="flex flex-row justify-items-start gap-1">
              <button
                className="bg-blue-500 p-2 rounded-md text-lg text-white font-semibold hover:bg-blue-800 active:bg-blue-950 transition"
                onClick={() => navigate("/projects/weather")}
              >
                current
              </button>
              <button
                className="bg-blue-500 p-2 rounded-md text-lg text-white font-semibold hover:bg-blue-800 active:bg-blue-950 transition"
                onClick={handleHourlyClick}
              >
                hourly
              </button>
            </div>

            <div>
              <p
                className={`text-2xl cursor-default font-bold ${
                  currentWeather?.is_day ? "text-yellow-400" : "text-gray-400"
                }`}
              >
                {currentWeather.is_day ? "☀️ Day" : "🌛 Night"}
              </p>
            </div>
          </div>

          {/* top-most section */}

          {/* Temperature data */}

          <div className="flex flex-col gap-2 xl:flex-row xl:justify-between xl:pl-2 xl:pr-2">
            <div
              className={`flex flex-row justify-between items-center p-2 rounded-md ${bgTemperatureAccordingly(
                currentForecastingObj?.temp_c,
                currentForecastingObj?.will_it_rain,
                currentForecastingObj?.is_day
              )} xl:flex-col xl:justify-around ${width_control_xl(width)}`}
            >
              <div className="flex flex-col justify-between items-center gap-2">
                <p className="text-2xl font-bold text-white xl:text-5xl">
                  {minTemp(currentWeather?.temp_c)}&deg;C-
                  {maxTemp(currentWeather?.temp_c)}&deg;C
                </p>
                <p className="font-semibold text-white text-xl xl:text-4xl xl:font-bold">
                  <span>currTemp:</span>
                  <span> {currentWeather.temp_c}</span>
                  <span className="text-xl font-semibold text-white">
                    &deg;C
                  </span>
                </p>
                <p>width : {width}</p>
              </div>
              <div className="flex flex-col items-center">
                <img
                  className="size-32 xl:size-48"
                  src={iconOfOverAllday}
                  alt="icon"
                />
                <p className="text-sm font-semibold text-white xl:text-2xl">
                  {overallDayForecasting.condition.text}
                </p>
              </div>
            </div>

            <div
              className={`flex flex-col gap-2  bg-slate-600 rounded-md p-2 ${width_control_xl(
                width
              )}`}
            >
              {/* Humidity */}
              <div
                className={`flex flex-row justify-between items-center py-1 px-2 border-2 border-blue-300 rounded-lg ${bgHumidity(
                  currentWeather?.humidity
                )}`}
              >
                <p className="text-white font-semibold text-2xl">Humidity:</p>
                <p className="flex flex-col items-end">
                  <span className="text-white font-semibold text-2xl">
                    {minHum(currentWeather.humidity)}% -{" "}
                    {maxHum(currentWeather.humidity)}%
                  </span>

                  {currentWeather.humidity ? (
                    <span className="text-white font-semibold text-xl">
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
                )}`}
              >
                <p className="text-white font-semibold text-2xl">
                  Visibility<span className="text-sm">avg</span>:
                </p>
                <p className="text-white font-semibold text-2xl">
                  {overallDayForecasting.avgvis_km} km |{" "}
                  {overallDayForecasting.avgvis_miles} miles
                </p>
              </div>
              {/* UV Index */}
              <div
                className={`flex flex-row justify-between items-center py-1 px-2 border-2 border-blue-300 rounded-lg ${bgUVIndex(
                  currentWeather?.uv
                )} `}
              >
                <p className="text-white font-semibold text-2xl">
                  UV<span className="text-xs">max</span> :
                </p>
                <p className="text-xl text-white font-semibold">
                  at {formatedTime(timeEpochOfMaxUV)}
                </p>
                <p className="flex flex-col items-end">
                  <span className="text-white font-semibold text-2xl">
                    {maxUVIndex}
                  </span>

                  {currentWeather.uv ? (
                    <span className="text-white font-semibold text-xl">
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
                       animate-wind-flow
                      `}
                style={{
                  animationDuration: getWindAnimationSpeed(
                    currentWeather?.wind_kph || 0
                  ),
                }}
              >
                <p className="text-white font-semibold text-2xl">
                  Wind<span className="text-xs">max</span> :
                </p>
                <p className="text-2xl font-semibold text-white">
                  {overallDayForecasting.maxwind_kph} km/h
                </p>
              </div>

              {/* rain Possibility */}
              {overallDayForecasting.daily_will_it_rain ? (
                <div className="flex flex-row justify-between items-center py-1 px-2 border-2 border-blue-300 rounded-lg bg-slate-400">
                  <p className="text-white font-semibold text-2xl">
                    Rain Possibility:
                  </p>
                  <p className="text-white font-semibold text-xl">
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
                <div className="flex flex-row justify-between items-center py-1 px-2 border-2 border-blue-300 rounded-lg bg-slate-400">
                  <p className="text-white text-2xl font-semibold">
                    Precipitation :
                  </p>
                  <p className="text-white font-semibold text-2xl">
                    {overallDayForecasting.totalprecip_in} inch
                  </p>
                </div>
              ) : (
                <div className="hidden"></div>
              )}

              {/* Snowy Possibility */}
              {overallDayForecasting.totalsnow_cm ? (
                <div className="flex flex-row justify-between items-center py-1 px-2 border-2 border-blue-300 rounded-lg bg-slate-400">
                  <p className="text-white text-2xl font-semibold">
                    snow-precip :{" "}
                  </p>
                  <p className="text-white font-semibold text-2xl">
                    {overallDayForecasting.totalsnow_cm} cm
                  </p>
                </div>
              ) : (
                <div className="hidden"></div>
              )}
            </div>
            <DayAstros />
          </div>
        </div>
      )}
    </>
  );
}

export default OverallDayData;

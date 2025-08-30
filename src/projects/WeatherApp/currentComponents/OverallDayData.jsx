import { useWeather } from "../../../contexts/projectContexts/WeatherContext";
import DayAstros from "./DayAstros";
import { useNavigate } from "react-router-dom";
import HourlyData from "./HourlyData";
import { useState } from "react";

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

  return (
    <>
      {isHourly ? (
        <HourlyData />
      ) : (
        <div className="border-4 flex flex-col border-blue-300 rounded-lg p-2 gap-3">
          {/* top-most section */}
          <div className="flex flex-col gap-2  bg-slate-400 rounded-md p-2">
            {/* Temperature data */}
            <div className="flex flex-row justify-between items-center py-5">
              <div className="flex flex-col justify-between items-center gap-2">
                <div className="self-baseline ml-[-2px] flex flex-row gap-2 mt-[-29px]">
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
                <p className="text-3xl font-bold text-white">
                  {minTemp(currentWeather?.temp_c)}&deg;C-
                  {maxTemp(currentWeather?.temp_c)}&deg;C
                </p>
                <p>
                  <span className="text-2xl text-white font-semibold">
                    currTemp:
                  </span>
                  <span className="text-3xl text-white font-semibold ">
                    {" "}
                    {currentWeather.temp_c}
                  </span>
                  <span className="text-lg font-semibold text-white">
                    &deg;C
                  </span>
                </p>
              </div>
              <div className="flex flex-col items-center">
                <p className="self-end text-2xl text-white font-semibold mr-4 mt-[-27px]">
                  {currentWeather.is_day ? "Day" : "Night"}
                </p>
                <img className="size-32" src={iconOfOverAllday} alt="icon" />
                <p className="text-lg font-semibold text-white">
                  {overallDayForecasting.condition.text}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2  bg-slate-600 rounded-md p-2">
            {/* Humidity */}
            <div className="flex flex-row justify-between items-center py-1 px-2 border-2 border-blue-300 rounded-lg bg-slate-400">
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
            <div className="flex flex-row justify-between items-center py-1 px-2 border-2 border-blue-300 rounded-lg bg-slate-400">
              <p className="text-white font-semibold text-2xl">
                Visibility<span className="text-sm">avg</span>:
              </p>
              <p className="text-white font-semibold text-2xl">
                {overallDayForecasting.avgvis_km} km |{" "}
                {overallDayForecasting.avgvis_miles} miles
              </p>
            </div>
            {/* UV Index */}
            <div className="flex flex-row justify-between items-center py-1 px-2 border-2 border-blue-300 rounded-lg bg-slate-400">
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
            <div className="flex flex-row justify-between items-center py-1 px-2 border-2 border-blue-300 rounded-lg bg-slate-400">
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
                  rain Possibility:
                </p>
                <p className="text-white font-semibold text-2xl">
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

          {/* bottom section */}
          <DayAstros />
        </div>
      )}
    </>
  );
}

export default OverallDayData;

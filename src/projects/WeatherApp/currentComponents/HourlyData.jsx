import { useEffect, useState } from "react";
import { useWeather } from "../../../contexts/projectContexts/WeatherContext";
import { useNavigate } from "react-router-dom";
import OverallDayData from "./OverallDayData";

function HourlyData() {
  const { twentyFourHourForecasting } = useWeather();
  const [isOverallDay, setIsOverallDay] = useState(false);

  const navigate = useNavigate();

  function handleOveralDayButton() {
    setIsOverallDay(true);
  }

  if (
    !Array.isArray(twentyFourHourForecasting) ||
    twentyFourHourForecasting?.length === 0
  ) {
    return (
      <div className="text-center text-gray-500">Loading hourly forecast…</div>
    );
  }

  function getCurrentHourEpoch() {
    const date = new Date(); // current time
    date.setMinutes(0, 0, 0); // reset minutes, seconds, milliseconds → 00:00:00
    return Math.floor(date.getTime() / 1000); // convert ms → seconds
  }

  let nowEpoch = getCurrentHourEpoch();

  let nextHourIndex =
    twentyFourHourForecasting?.findIndex((h) => h.time_epoch > nowEpoch) || 0;

  const [indexOfHour, setIndexOfHour] = useState(nextHourIndex);

  const HourlyData = twentyFourHourForecasting[indexOfHour];

  // Label generator
  function formatHourRange(epoch) {
    const start = new Date(epoch * 1000);
    const end = new Date(start.getTime() + 60 * 60 * 1000);

    const startLabel = start.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    const endLabel = end.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    return `${startLabel} - ${endLabel}`;
  }

  // function getFloodCondition(precip_in) {
  //   if (precip_in > 2) return "Severe Flood Risk 🚨";
  //   if (precip_in > 1) return "High Flood Risk ⚠️";
  //   if (precip_in > 0.5) return "Moderate Risk";
  //   return "Low Risk";
  // }

  const hourlyIcon = HourlyData?.condition?.icon;

  //Finding Max UV FOR A DAY and extracting epoch whose uv is max
  const UV24 = twentyFourHourForecasting?.map((hour) => hour.uv);
  const maxUV = Math.max(...UV24);
  const epoch_of_max_uv = twentyFourHourForecasting.find(
    (hour) => hour.uv === maxUV
  ).time_epoch;

  function formateTimeOfMaxEpoch() {
    const date = new Date(epoch_of_max_uv * 1000);

    const format = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    return format;
  }

  function formatedDate(epoch) {
    const DATE = new Date(epoch * 1000);
    return DATE.toLocaleDateString([], {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }

  // UV Index State
  function uvIndexState(uv) {
    if (uv >= 0 && uv <= 2) return "Low";
    if (uv >= 3 && uv <= 5) return "Moderate";
    if (uv >= 6 && uv <= 7) return "High";
    if (uv >= 8 && uv <= 10) return "Very High";
    return "Extreme";
  }

  function getWindFlowDirection(dir) {
    const map = {
      N: "N to S",
      NNE: "N-NE to S-SW",
      NE: "NE to SW",
      ENE: "E-NE to W-SW",
      E: "E to W",
      ESE: "E-SE to W-NW",
      SE: "SE to NW",
      SSE: "S-SE to N-NW",
      S: "S to N",
      SSW: "S-SW to N-NE",
      SW: "SW to NE",
      WSW: "W-SW to E-NE",
      W: "W to E",
      WNW: "W-NW to E-SE",
      NW: "NW to SE",
      NNW: "N-NW to S-SE",
    };

    return map[dir] ? `${map[dir]}` : "Direction unknown";
  }

  return (
    <>
      {!isOverallDay ? (
        <div className="flex flex-col bg-gradient-to-b from-blue-500 via-sky-400 to-slate-200 rounded-2xl shadow-lg p-4 w-full mx-auto relative overflow-hidden">
          {/* Floating Day/Night Badge */}
          <div className="absolute top-16 right-3 bg-orange-300 text-gray-800 font-bold rounded-lg shadow-md px-3 py-1 text-sm">
            {HourlyData?.is_day === 1 ? "☀️ Day" : "🌙 Night"}
          </div>
          <div className="absolute top-16 right-72 bg-orange-300 text-gray-800 font-bold rounded-lg shadow-md px-3 py-1 text-sm">
            {formatedDate(HourlyData?.time_epoch)}
          </div>

          {/* Time Selector */}
          <div className="flex flex-row justify-between items-center mb-4">
            <button
              className="bg-blue-600 px-4 py-2 rounded-xl text-white text-sm font-semibold shadow hover:bg-blue-700 transition"
              onClick={() => navigate("/projects/weather")}
            >
              Current
            </button>
            <select
              value={indexOfHour}
              onChange={(e) => setIndexOfHour(parseInt(e.target.value))}
              className="bg-white appearance-none text-gray-800 text-sm px-3 py-2 rounded-xl shadow hover:shadow-md cursor-pointer"
            >
              {twentyFourHourForecasting?.map((h, index) => (
                <option key={index} value={index}>
                  {formatHourRange(h.time_epoch)}
                </option>
              ))}
            </select>
            <button
              className="bg-green-600 px-4 py-2 rounded-xl text-white text-sm font-semibold shadow hover:bg-green-700 transition"
              onClick={handleOveralDayButton}
            >
              Overall Day
            </button>
          </div>

          {/* Weather Info */}
          <div className="flex flex-row justify-between items-center bg-white/20 rounded-2xl p-4 shadow-inner">
            <div className="flex flex-col">
              <p className="text-5xl font-bold text-white leading-tight">
                {HourlyData?.temp_c}
                <span className="text-2xl">°C</span>
              </p>
              <p className="text-lg text-white mt-2">
                <span className="font-bold">Feels like:</span>{" "}
                {HourlyData?.feelslike_c}
                <span className="text-sm">°C</span>
              </p>
            </div>

            <div className="flex flex-col items-center">
              <img
                className="w-20 h-20 drop-shadow-lg"
                src={hourlyIcon}
                alt="skyicon"
              />
              <p className="text-white font-semibold mt-2 text-sm">
                {HourlyData?.condition.text}
              </p>
            </div>
          </div>
          {/* Humidity */}
          <div className="flex flex-row justify-between items-center bg-white/20 rounded-2xl p-4 shadow-inner">
            <p className="text-2xl text-white font-bold">Humidity : </p>
            <p className="text-2xl text-white font-bold">
              {HourlyData?.humidity}%
            </p>
          </div>

          {/* Cloudy */}
          <div className="flex flex-row justify-between items-center bg-white/20 rounded-2xl p-4 shadow-inner">
            <p className="text-2xl text-white font-bold">Cloudy : </p>
            <p className="text-2xl text-white font-bold">
              {HourlyData?.cloud}%
            </p>
          </div>

          {/* Snowy */}
          {HourlyData?.will_it_snow ? (
            <div className="flex flex-row justify-between items-center bg-white/20 rounded-2xl p-4 shadow-inner">
              <p className="text-4xl text-white font-bold">Snowy : </p>
              <div className="flex flex-col justify-center items-center text-2xl text-white font-bold">
                <p>{HourlyData?.chance_of_snow}%</p>
                <p>{HourlyData?.will_it_snow ? "yes" : "no"}</p>
                <p>{HourlyData?.snow_cm} cm</p>
              </div>
            </div>
          ) : (
            <div className="hidden"></div>
          )}

          {/* Atmospheric Pressure */}
          <div className="flex flex-row justify-between items-center bg-white/20 rounded-2xl p-4 shadow-inner">
            <p className="text-2xl text-white font-bold">Atm Pressure : </p>
            <p className="flex flex-col  justify-center items-center text-2xl text-white font-bold">
              <span>{HourlyData?.pressure_in} inHg</span>
              <span>{HourlyData?.pressure_mb} mb</span>
            </p>
          </div>
          {/* Visibility */}
          <div className="flex flex-row justify-between items-center bg-white/20 rounded-2xl p-4 shadow-inner">
            <p className="text-2xl text-white font-bold">Visibility : </p>
            <p className="flex flex-col justify-center items-center text-2xl text-white font-bold">
              <span>{HourlyData?.vis_km} km</span>
              <span>{HourlyData?.vis_miles} miles</span>
            </p>
          </div>

          {/* UV INdex */}
          <div className="flex flex-row justify-between items-center bg-white/20 rounded-2xl p-4 shadow-inner">
            <p className=" text-xl text-white font-bold">UV-Index : </p>
            <p className="flex flex-col justify-center items-center text-white font-semibold text-sm bg-slate-400 p-1 rounded-md">
              <span>max at {formateTimeOfMaxEpoch(epoch_of_max_uv)}</span>
              <span>{maxUV}</span>
            </p>
            <p className=" text-white font-bold">
              <span className="text-lg">{HourlyData?.uv}</span> |{" "}
              <span className="text-sm">{uvIndexState(HourlyData?.uv)}</span>
            </p>
          </div>

          {/* wind speed */}
          <div className="flex flex-row justify-between items-center bg-white/20 rounded-2xl p-4 shadow-inner">
            <p className="text-2xl font-bold text-white">Wind : </p>
            <p className="text-lg text-white font-bold">
              {HourlyData?.wind_degree}&deg;
            </p>
            <p className="flex flex-col justify-center items-center text-xl text-white font-bold">
              <span>{HourlyData?.wind_kph} km/h</span>{" "}
              <span>{getWindFlowDirection(HourlyData?.wind_dir)}</span>
            </p>
          </div>

          {/* Precipitation */}

          {HourlyData?.will_it_rain ? (
            <div className="flex flex-row justify-between items-center bg-white/20 rounded-2xl p-4 shadow-inner">
              <p className="text-2xl text-white font-bold">
                Rain :{" "}
                <span className="text-lg font-bold">
                  {HourlyData?.chance_of_rain} %
                </span>{" "}
              </p>
              <p>
                <span className="text-xl text-white font-bold">
                  precip : {HourlyData?.precip_mm} mm |
                </span>{" "}
                <span className="font-bold text-lg text-white">
                  {HourlyData?.will_it_rain ? "Yes" : "No"}
                </span>
              </p>
            </div>
          ) : (
            <div className="hidden"></div>
          )}
        </div>
      ) : (
        <OverallDayData />
      )}
    </>
  );
}

export default HourlyData;

import { useEffect, useState } from "react";
import { useWeather } from "../../../contexts/projectContexts/WeatherContext";
import { useNavigate } from "react-router-dom";
import OverallDayData from "./OverallDayData";
import DayAstros from "./DayAstros";

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

  let nextHourIndex = twentyFourHourForecasting?.findIndex(
    (h) => h.time_epoch > nowEpoch
  );

  nextHourIndex = nextHourIndex < 0 ? 0 : nextHourIndex;

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

  function widthControlxl(width) {
    if (width <= 1396 && width >= 1300) {
      return "xl:min-w-[26rem]";
    } else if (width <= 1299.99 && width >= 1209) {
      return "xl:min-w-[24rem]";
    } else {
      return "xl:min-w-[21.8rem]";
    }
  }

  function widthControllg(width) {
    if (width <= 1280 && width >= 1200) {
      return "lg:min-w-[20.8rem]";
    } else if (width <= 1199.99 && width >= 1109) {
      return "lg:min-w-[20rem]";
    } else {
      return "lg:min-w-[19.8rem]";
    }
  }

  function widthControlmd(width) {
    if (width <= 1023.99 && width >= 1000) {
      return "md:min-w-[19rem]";
    } else if (width <= 999.99 && width >= 990) {
      return "md:min-w-[18.5rem]";
    } else if (width <= 989.99 && width >= 970) {
      return "md:min-w-[18rem]";
    } else if (width <= 969.99 && width >= 900) {
      return "md:min-w-[17.3rem]";
    } else if (width <= 899.99 && width >= 850) {
      return "md:min-w-[16rem]";
    } else if (width <= 849.99 && width >= 800) {
      return "md:min-w-[15.5rem]";
    } else {
      return "md:min-w-[14.5rem]";
    }
  }

  // conditianal shadow for temperatures

  function shadow_for_temp(temp) {
    if (temp <= 50 && temp >= 40) {
      return "shadow-red-700";
    } else if (temp <= 39.99 && temp >= 28) {
      return "shadow-red-400";
    } else if (temp <= 27.999 && temp >= 21) {
      return "shadow-red-300";
    } else {
      return "shadow-gray-400";
    }
  }

  return (
    <>
      {!isOverallDay ? (
        <div
          className="flex flex-col bg-gradient-to-b from-blue-500 via-sky-400 to-slate-200 rounded-2xl shadow-lg p-4 w-full mx-auto relative overflow-hidden 
      
        "
        >
          <div>
            {/* Floating Day/Night Badge */}
            <div className="absolute top-16 right-3 bg-orange-300 text-gray-800 font-bold rounded-lg shadow-md px-3 py-1 text-sm">
              {HourlyData?.is_day === 1 ? "☀️ Day" : "🌙 Night"}
            </div>

            {/* current-date */}
            <div className="absolute top-16 right-73 bg-orange-300 text-gray-800 font-bold rounded-lg shadow-md px-3 py-1 text-sm">
              {formatedDate(HourlyData?.time_epoch)}
            </div>
          </div>
          {/* Time Selector, current-button and overallday-button */}
          <div className="flex flex-row justify-between items-center mb-4 gap-2">
            <button
              className="bg-blue-600 px-4 py-2 rounded-md text-white text-sm font-semibold shadow hover:bg-blue-700 transition"
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
              className="bg-green-600 px-2 py-2 rounded-md text-white text-sm text-nowrap font-semibold shadow hover:bg-green-700 transition"
              onClick={handleOveralDayButton}
            >
              Overall Day
            </button>
          </div>
          {/* Weather Info */}
          {/* holder for temperature-temperature-feels-like, humudity-cloudy-precipitation-snowy-uv-index-etc and astros */}
          <div className="xl:flex xl:flex-row xl:justify-evenly xl:gap-1 lg:flex lg:flex-row lg:justify-evenly lg:gap-[0.5rem] md:flex md:flex-row md:gap-2">
            {/* temperature, temperature-feels like and skyicon | sky-condition text */}
            <div
              className={`flex flex-row justify-between items-center bg-white/20 rounded-2xl p-3 shadow-inner xl:flex-col xl:justify-around xl:p-8 ${widthControlxl(
                width
              )} lg:flex-col lg:justify-around ${widthControllg(
                width
              )} md:flex md:flex-col md:justify-around ${widthControlmd(
                width
              )} `}
            >
              {/* temperature and feels-like */}
              <div className="flex flex-col ">
                <p
                  className={`text-5xl shadow-xl p-2 rounded-md ${shadow_for_temp(
                    HourlyData?.temp_c
                  )} font-bold text-white leading-tight xl:text-7xl lg:text-6xl md:text-4xl`}
                >
                  {HourlyData?.temp_c}
                  <span className="text-2xl xl:text-3xl lg:text-3xl md:text-2xl">
                    °C
                  </span>
                  {/* <p>width {width}</p> */}
                </p>
                <p className="text-lg text-white mt-2 xl:text-2xl lg:text-2xl md:text-xl">
                  <span className="font-bold">Feels like:</span>{" "}
                  <span className="font-bold">{HourlyData?.feelslike_c}</span>
                  <span className="text-sm xl:font-bold lg:font-bold md:font-bold">
                    °C
                  </span>
                </p>
              </div>
              {/* sky-icon and sky-conditional-text */}
              <div className="flex flex-col items-center xl:justify-between">
                <img
                  className="w-20 h-20 drop-shadow-2xl xl:size-40 lg:size-36 md:size-32"
                  src={hourlyIcon}
                  alt="skyicon"
                />
                <p
                  className="text-white font-semibold mt-2 text-sm xl:text-[1.7rem] xl:text-slate-600 xl:font-bold xl:shadow-inner xl:shadow-slate-400 xl:p-2
                  lg:text-slate-500 lg:font-bold lg:shadow-inner lg:shadow-slate-400 lg:p-2 md:text-slate-500 md:font-bold md:shadow-inner md:shadow-slate-400 md:p-2
                "
                >
                  {HourlyData?.condition.text}
                </p>
              </div>
            </div>
            {/* humidity cloudy snowy atmosphere visibility uv index,  wind speed precipitation */}
            <div
              className={`${widthControlxl(
                width
              )} xl:flex xl:flex-col xl:gap-[0.1rem] lg:flex lg:flex-col lg:gap-[0.1rem]  ${widthControllg(
                width
              )} ${widthControlmd(width)}`}
            >
              {/* Humidity */}
              <div className="flex flex-row justify-between items-center bg-white/20 rounded-2xl p-4 shadow-inner md:p-2 md:rounded-md">
                <p className="text-2xl text-white font-bold xl:text-xl lg:text-lg md:text-sm ">
                  Humidity :{" "}
                </p>
                <p className="text-2xl text-white font-bold xl:text-xl lg:text-lg md:text-sm">
                  {HourlyData?.humidity}%
                </p>
              </div>

              {/* Cloudy */}
              <div className="flex flex-row justify-between items-center bg-white/20 rounded-2xl p-4 shadow-inner md:p-2 md:rounded-md">
                <p className="text-2xl text-white font-bold xl:text-xl lg:text-lg md:text-sm">
                  Cloudy :{" "}
                </p>
                <p className="text-2xl text-white font-bold xl:text-xl lg:text-lg md:text-sm">
                  {HourlyData?.cloud}%
                </p>
              </div>

              {/* Snowy */}
              {HourlyData?.will_it_snow ? (
                <div className="flex flex-row justify-between items-center bg-white/20 rounded-2xl p-4 shadow-inner md:p-2 md:rounded-md">
                  <p className="text-4xl text-white font-bold xl:text-xl lg:text-lg md:text-sm">
                    Snowy :{" "}
                  </p>
                  <div className="flex flex-col justify-center items-center text-2xl text-white font-bold xl:text-xl lg:text-lg md:text-sm">
                    <p>{HourlyData?.chance_of_snow}%</p>
                    <p>{HourlyData?.will_it_snow ? "yes" : "no"}</p>
                    <p>{HourlyData?.snow_cm} cm</p>
                  </div>
                </div>
              ) : (
                <div className="hidden"></div>
              )}

              {/* Atmospheric Pressure */}
              <div className="flex flex-row justify-between items-center bg-white/20 rounded-2xl p-4 shadow-inner lg:pt-2 lg:pb-2 md:p-2 md:rounded-md">
                <p className="text-2xl text-white font-bold xl:text-xl lg:text-lg md:text-sm">
                  Atm Pressure :{" "}
                </p>
                <p className="flex flex-col  justify-center items-center text-2xl text-white font-bold xl:text-xl lg:text-lg md:text-sm">
                  <span>{HourlyData?.pressure_in} inHg</span>
                  <span>{HourlyData?.pressure_mb} mb</span>
                </p>
              </div>

              {/* Visibility */}
              <div className="flex flex-row justify-between items-center bg-white/20 rounded-2xl p-4 shadow-inner lg:pt-2 lg:pb-2 md:p-2 md:rounded-md">
                <p className="text-2xl text-white font-bold xl:text-xl lg:text-lg md:text-sm">
                  Visibility :{" "}
                </p>
                <p className="flex flex-col justify-center items-center text-2xl text-white font-bold xl:text-xl lg:text-lg md:text-sm">
                  <span>{HourlyData?.vis_km} km</span>
                  <span>{HourlyData?.vis_miles} miles</span>
                </p>
              </div>

              {/* UV INdex */}
              <div className="flex flex-row justify-between items-center bg-white/20 rounded-2xl p-4 shadow-inner lg:pt-2 lg:pb-2 md:p-2 md:rounded-md">
                <p className=" text-xl text-white font-bold xl:text-xl lg:text-[1.1rem] md:text-[0.75rem]">
                  UV-Index :{" "}
                </p>
                <p className="flex flex-col justify-center items-center text-white font-semibold text-sm shadow-inner shadow-black p-1 rounded-md xl:text-sm lg:text-[0.7rem] md:text-[0.5rem]">
                  <span>max at {formateTimeOfMaxEpoch(epoch_of_max_uv)}</span>
                  <span>{maxUV}</span>
                </p>
                <p className=" text-white font-bold ">
                  <span className="text-lg xl:text-xl lg:text-[1.1rem] md:text-xs">
                    {HourlyData?.uv}
                  </span>{" "}
                  |{" "}
                  <span className="text-sm xl:text-xl lg:text-[1.1rem] md:text-xs">
                    {uvIndexState(HourlyData?.uv)}
                  </span>
                </p>
              </div>

              {/* wind speed */}
              <div className="flex flex-row justify-between items-center bg-white/20 rounded-2xl p-4 shadow-inner lg:pt-2 lg:pb-2 md:p-2 md:rounded-md">
                <p className="text-2xl font-bold text-white xl:text-xl lg:text-lg md:text-sm">
                  Wind :{" "}
                </p>
                <p className="text-lg text-white font-bold xl:text-xl lg:text-lg md:text-sm">
                  {HourlyData?.wind_degree}&deg;
                </p>
                <p className="flex flex-col justify-center items-center text-xl text-white font-bold xl:text-xl lg:text-lg md:text-sm">
                  <span>{HourlyData?.wind_kph} km/h</span>{" "}
                  <span>{getWindFlowDirection(HourlyData?.wind_dir)}</span>
                </p>
              </div>

              {/* Precipitation */}

              {HourlyData?.will_it_rain ? (
                <div className="flex flex-row justify-between items-center bg-white/20 rounded-2xl p-4 shadow-inner md:p-2 md:rounded-md">
                  <p className="text-2xl text-white font-bold xl:text-xl lg:text-lg md:text-sm">
                    Rain :
                    <span className="text-lg font-bold xl:text-xl text-center lg:text-sm md:text-xs">
                      {HourlyData?.chance_of_rain}%
                    </span>{" "}
                  </p>
                  <p>
                    <span className="text-xl text-white font-bold xl:text-xl lg:text-sm md:text-sm">
                      precip : {HourlyData?.precip_mm} mm |
                    </span>{" "}
                    <span className="font-bold text-lg text-white xl:text-xl lg:text-sm md:text-sm">
                      {HourlyData?.will_it_rain ? "Yes" : "No"}
                    </span>
                  </p>
                </div>
              ) : (
                <div className="hidden"></div>
              )}
            </div>
            {/* current-day astros section */}
            <DayAstros />
          </div>
        </div>
      ) : (
        <OverallDayData />
      )}
    </>
  );
}

export default HourlyData;

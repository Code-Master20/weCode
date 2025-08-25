import { useState } from "react";
import { useWeather } from "../../contexts/projectContexts/WeatherContext";
import HourlyData from "./currentComponents/HourlyData";
import OverallDayData from "./currentComponents/OverallDayData";
import DayAstros from "./currentComponents/DayAstros";

function CurrentWeather() {
  const {
    currentWeather,

    location,
    setLocation,
    setLocalisedData,
    localisedData,
    setTwentyFourHourForecasting,
    twentyFourHourForecasting,
    error,
    setError,
  } = useWeather();

  const [locationInput, setLocationInput] = useState("");

  const [isHourly, setIsHourly] = useState(false);
  const [isOverallDay, setIsOverallDay] = useState(false);

  function handleHourlyButton() {
    setIsHourly(true);
    setIsOverallDay(false);
  }

  function handleOverAllDayButton() {
    setIsOverallDay(true);
    setIsHourly(false);
  }

  function handleInputLocation(e) {
    e.preventDefault();
    const trimmedInput = locationInput.trim();
    if (trimmedInput && !error) {
      setLocation(trimmedInput);
      setLocationInput("");
    } else if (error) {
      setLocation((prev) => prev); // Revert to previous valid location
      setLocationInput("");
    }
  }

  const currentDataIcon = currentWeather?.condition?.icon;

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

  function day_night_tracker(is_day) {
    if (is_day === 1) {
      return "Day";
    } else {
      return "Night";
    }
  }

  function rainPossibilityTracker() {
    const time = new Date();
    const hours = time.getHours();

    if (
      twentyFourHourForecasting[hours] &&
      twentyFourHourForecasting[hours]?.will_it_rain === 1
    ) {
      return "Rain-possible";
    } else if (
      twentyFourHourForecasting[hours] &&
      twentyFourHourForecasting[hours]?.will_it_snow !== 1
    ) {
      return "No-rain";
    }
  }

  function snowPossibilityTracker() {
    const time = new Date();
    const hours = time.getHours();

    if (
      twentyFourHourForecasting[hours] &&
      twentyFourHourForecasting[hours]?.will_it_snow === 1
    ) {
      return "Snow-possible";
    } else if (
      twentyFourHourForecasting[hours] &&
      twentyFourHourForecasting[hours]?.will_it_snow !== 1
    ) {
      return "No-snow";
    }
  }

  //this function returns current hours in 24-format
  function hours() {
    const date = new Date();
    const hours = date.getHours();
    return hours;
  }

  // UV Index State
  function uvIndexState(uv) {
    if (uv >= 0 && uv <= 2) return "Low";
    if (uv >= 3 && uv <= 5) return "Moderate";
    if (uv >= 6 && uv <= 7) return "High";
    if (uv >= 8 && uv <= 10) return "Very High";
    return "Extreme";
  }

  console.log(currentWeather);
  return (
    <>
      {/* at very first isHourly=true and isOverallDay=false so HourlyData component will be rendered
    at second isHourly=false and isOverallDay=true so OverallDayData component will be rendered
    at last if both are false so current data will be rendered */}
      {isHourly ? (
        <HourlyData />
      ) : isOverallDay ? (
        <OverallDayData />
      ) : (
        // current data
        <div className="border-4 flex flex-col border-blue-300 rounded-lg p-2 gap-3">
          {/* First Section */}
          <div className="flex flex-col gap-2">
            {/* Top-Most temperature data */}
            <div className="flex flex-row items-center justify-between bg-slate-400 p-4 pt-0 rounded-md">
              <div className="flex flex-col items-center justify-between">
                <div className="mt-[-30px] self-start flex gap-2">
                  <button
                    className="bg-blue-500 text-white p-2 text-lg rounded-md font-semibold
                   hover:bg-blue-800 transition active:bg-blue-950"
                    onClick={handleHourlyButton}
                  >
                    hourly
                  </button>
                  <button
                    className="text-white bg-blue-500 p-2 text-lg rounded-md font-semibold 
                    hover:bg-blue-800 transition active:bg-blue-950"
                    onClick={handleOverAllDayButton}
                  >
                    overallday
                  </button>
                </div>
                <p className=" text-3xl self-start font-bold text-white">
                  <span className="text-7xl">{currentWeather?.temp_c}</span>
                  &deg;C
                </p>
                <p className="text-xl text-white font-semibold pt-2">
                  Feels Like:{currentWeather?.feelslike_c}&deg;C
                </p>
              </div>

              <div className="flex flex-col items-center justify-between mb-10">
                <p className="self-end text-white font-bold">
                  {day_night_tracker(currentWeather?.is_day)}
                </p>
                <img
                  className="size-28 h-28"
                  src={currentDataIcon}
                  alt="icon"
                />
                <p className="text-lg text-white font-semibold">
                  {currentWeather?.condition?.text}
                </p>
              </div>
            </div>
            <div className="self-center w-full flex flex-col items-center gap-2 mt-2">
              {error && (
                <p className="text-red-500 font-semibold text-center">
                  {error}
                </p>
              )}
              <form
                onSubmit={handleInputLocation}
                className="flex w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden"
              >
                <input
                  className="flex-1 bg-slate-100 p-3 text-lg outline-none focus:ring-2 focus:ring-blue-400 transition rounded-none"
                  type="text"
                  placeholder="Enter a location"
                  value={locationInput}
                  onChange={(e) => setLocationInput(e.target.value)}
                  required
                />
                <button
                  className="bg-blue-500 text-white px-6 py-2 text-lg font-semibold hover:bg-blue-700 active:bg-blue-900 transition"
                  type="submit"
                >
                  Enter
                </button>
              </form>
            </div>

            <div className="flex flex-col bg-slate-500 rounded-md p-4 gap-2">
              {/* humidity */}
              <div className="flex flex-row justify-between  bg-slate-600 p-3 rounded-md">
                <p className="text-white text-2xl font-semibold">Humidity:</p>
                <p className="text-white text-2xl font-semibold">
                  {currentWeather?.humidity}%
                </p>
              </div>

              {/* wind-speed */}
              <div className="flex flex-row justify-between items-center   bg-slate-600 p-3 rounded-md">
                <p className="text-white text-2xl font-semibold">
                  Wind<span className="text-sm">Avg </span>:
                  {currentWeather?.wind_degree}&deg;
                </p>
                <p className="text-white  font-semibold ml-10 flex flex-col justify-center items-center">
                  <span className="self-end text-xl">
                    {currentWeather?.wind_kph} km/h
                  </span>
                  <span className="text-xl font-normal">
                    {getWindFlowDirection(currentWeather?.wind_dir)}
                  </span>
                </p>
              </div>

              {/* UV Index */}
              {currentWeather?.uv ? (
                <div className="flex flex-row justify-between items-center  bg-slate-600 p-3 rounded-md">
                  <p className="text-white text-2xl font-semibold">UV Index:</p>
                  <p className="text-white text-2xl font-semibold">
                    {currentWeather?.uv} | {uvIndexState(currentWeather?.uv)}
                  </p>
                </div>
              ) : (
                <div className="hidden"></div>
              )}

              {/* cloud cover */}
              <div className="flex flex-row justify-between items-center  bg-slate-600 p-3 rounded-md">
                <p className="text-white text-2xl font-semibold">Cloudy:</p>
                <p className="text-white text-2xl font-semibold">
                  {currentWeather?.cloud}%
                </p>
              </div>

              {/* atmospheric pressure */}
              <div className="flex flex-row justify-between items-center  bg-slate-600 p-3 rounded-md">
                <p className="text-white text-2xl font-semibold">
                  Atm pressure:
                </p>
                <p className="flex flex-col text-white text-xl font-semibold">
                  <span>{currentWeather?.pressure_mb} mb</span>
                  <span> {currentWeather?.pressure_in} inHg</span>
                </p>
              </div>

              {/* Visibility */}
              <div className="flex flex-row justify-between items-center  bg-slate-600 p-3 rounded-md">
                <p className="text-white text-2xl font-semibold">Visibility:</p>
                <p className="text-white text-2xl font-semibold">
                  {currentWeather?.vis_km} km | {currentWeather?.vis_miles}{" "}
                  miles
                </p>
              </div>

              {/* Precipitation */}

              {currentWeather?.precip_mm ? (
                <div className="flex flex-row justify-between items-center  bg-slate-600 p-3 rounded-md">
                  <p className="text-white text-2xl font-semibold">
                    Precipitation:
                  </p>
                  <p className="text-white text-xl font-semibold">
                    {currentWeather?.precip_mm} mm |{" "}
                    <span className="text-sm">{rainPossibilityTracker()}</span>
                  </p>
                </div>
              ) : (
                <div className="hidden"></div>
              )}

              {/* Snow Possibility */}

              {twentyFourHourForecasting &&
              twentyFourHourForecasting[hours()]?.will_it_snow ? (
                <div className="flex flex-row justify-between items-center  bg-slate-600 p-3 rounded-md">
                  <p className="text-white text-2xl font-semibold">Snowy:</p>
                  <p className="text-white text-2xl font-semibold">
                    {snowPossibilityTracker()}
                  </p>
                </div>
              ) : (
                <div className="hidden"></div>
              )}
            </div>
          </div>

          {/* Second Section */}
          <DayAstros />
        </div>
      )}
    </>
  );
}

export default CurrentWeather;

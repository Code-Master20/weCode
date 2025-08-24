import { useState } from "react";
import { useWeather } from "../../contexts/projectContexts/WeatherContext";

function CurrentWeather() {
  const {
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
  } = useWeather();

  const [locationInput, setLocationInput] = useState("");

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

  return (
    <>
      {/* current data */}
      <div className="border-4 flex flex-col border-blue-300 rounded-lg p-2 gap-3 width-[50%]">
        {/* First Section */}
        <div className="flex flex-col gap-2">
          {/* Top-Most temperature data */}
          <div className="flex flex-row items-center justify-between bg-slate-400 p-4 pt-0 rounded-md">
            <div className="flex flex-col items-center justify-between">
              <p className=" text-3xl self-start font-bold text-white">
                <span className="text-7xl">{currentWeather.temp_c}</span>&deg;C
              </p>
              <p className="text-xl text-white font-semibold pt-2">
                Feels Like:{currentWeather.feelslike_c}&deg;C
              </p>
            </div>

            <div className="flex flex-col items-center justify-between mb-10">
              <p className="self-end text-white font-bold">
                {day_night_tracker(currentWeather.is_day)}
              </p>
              <img className="size-28 h-28" src={currentDataIcon} alt="icon" />
              <p className="text-lg text-white font-semibold">
                {currentWeather?.condition?.text}
              </p>
            </div>
          </div>
          <div className="self-center w-full flex flex-col items-center gap-2 mt-2">
            {error && (
              <p className="text-red-500 font-semibold text-center">{error}</p>
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
                className="bg-blue-500 text-white px-6 py-2 text-lg font-semibold hover:bg-blue-700 transition"
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
                {currentWeather.humidity}%
              </p>
            </div>

            {/* wind-speed */}
            <div className="flex flex-row justify-between items-center   bg-slate-600 p-3 rounded-md">
              <p className="text-white text-2xl font-semibold">
                <span className="text-sm">Avg </span>Wind:
                {currentWeather.wind_degree}&deg;
              </p>
              <p className="text-white  font-semibold ml-10 flex flex-col justify-center items-center">
                <span className="self-end text-2xl">
                  {currentWeather.wind_kph} km/h
                </span>
                <span className="text-xl font-normal">
                  {getWindFlowDirection(currentWeather.wind_dir)}
                </span>
              </p>
            </div>

            {/* UV Index */}
            <div className="flex flex-row justify-between items-center  bg-slate-600 p-3 rounded-md">
              <p className="text-white text-2xl font-semibold">UV Index:</p>
              <p className="text-white text-2xl font-semibold">
                {currentWeather.uv}
              </p>
            </div>

            {/* cloud cover */}
            <div className="flex flex-row justify-between items-center  bg-slate-600 p-3 rounded-md">
              <p className="text-white text-2xl font-semibold">Cloudy:</p>
              <p className="text-white text-2xl font-semibold">
                {currentWeather.cloud}%
              </p>
            </div>

            {/* atmospheric pressure */}
            <div className="flex flex-row justify-between items-center  bg-slate-600 p-3 rounded-md">
              <p className="text-white text-2xl font-semibold">Atm pressure:</p>
              <p className="flex flex-col text-white text-xl font-semibold">
                <span>{currentWeather.pressure_mb} mb</span>
                <span> {currentWeather.pressure_in} inHg</span>
              </p>
            </div>

            {/* Visibility */}
            <div className="flex flex-row justify-between items-center  bg-slate-600 p-3 rounded-md">
              <p className="text-white text-2xl font-semibold">Visibility:</p>
              <p className="text-white text-2xl font-semibold">
                {currentWeather.vis_km} km | {currentWeather.vis_miles} miles
              </p>
            </div>

            {/* Precipitation */}
            <div className="flex flex-row justify-between items-center  bg-slate-600 p-3 rounded-md">
              <p className="text-white text-2xl font-semibold">
                Precipitation:
              </p>
              <p className="text-white text-2xl font-semibold">
                {currentWeather.precip_mm} mm |{" "}
                <span className="text-sm">{rainPossibilityTracker()}</span>
              </p>
            </div>

            {/* Snow Possibility */}
            <div className="flex flex-row justify-between items-center  bg-slate-600 p-3 rounded-md">
              <p className="text-white text-2xl font-semibold">Snowy:</p>
              <p className="text-white text-2xl font-semibold">
                {snowPossibilityTracker()}
              </p>
            </div>
          </div>
        </div>

        {/* Second Section */}
        <div>
          <p>sunrise</p>
          <p>sunset</p>
          <p>moonrise</p>
          <p>moonset</p>
          <p>moon phase</p>
          <p>moon illumination</p>
          <p>is sun up</p>
          <p>is moon up</p>
        </div>
      </div>
    </>
  );
}

export default CurrentWeather;

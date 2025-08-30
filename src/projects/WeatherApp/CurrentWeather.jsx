import { useState, useEffect } from "react";
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
      return "☀️ Day";
    } else {
      return "🌙 Night";
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

  // Gradient backgrounds for wind
  function getWindBackground(windKph) {
    if (windKph <= 10) {
      // Calm
      return "linear-gradient(to top, #e0f7fa, #80deea)"; // light cyan
    } else if (windKph <= 30) {
      // Moderate
      return "linear-gradient(to top, #b2fefa, #0ed2f7)"; // aqua blue
    } else if (windKph <= 60) {
      // Strong
      return "linear-gradient(to top, #f7971e, #ffd200)"; // yellow-orange
    } else {
      // Storm
      return "linear-gradient(to top, #373b44, #4286f4)"; // dark stormy
    }
  }

  // Function for humidity backgrounds
  function getHumidityBackground(humidity) {
    if (humidity < 30) {
      // Dry air
      return "linear-gradient(to top, #fddb92, #d1fdff)"; // warm dry yellow-orange
    } else if (humidity >= 30 && humidity < 70) {
      // Comfortable
      return "linear-gradient(to top, #a1c4fd, #c2e9fb)"; // light blue
    } else {
      // Humid / Sticky
      return "linear-gradient(to top, #00c6fb, #005bea)"; // deep blue (moist air)
    }
  }

  function getTemperatureBackground(temp) {
    if (temp < 10) {
      return "linear-gradient(to top, #00c6fb, #005bea)"; // cold blue
    } else if (temp >= 10 && temp < 25) {
      return "linear-gradient(to top, #fbc2eb, #a6c1ee)"; // mild pink-purple
    } else {
      return "linear-gradient(to top, #fddb92, #d1fdff)"; // hot yellow-orange
    }
  }

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

        <div
          className="border-4 flex flex-col border-blue-300 rounded-lg p-2 gap-3 xl:flex xl:flex-row xl:mt-28 xl:max-w-full xl:justify-between xl:border-none 
        lg:flex lg:flex-row lg:mt-24 lg:max-w-full lg:justify-between lg:border-none
        "
        >
          {/* First Section */}
          <div
            className="flex flex-col gap-2 xl:flex xl:flex-row xl:gap-3 xl:w-[67%] 
          lg:flex lg:flex-row lg:gap-2 lg:w-[67%]
          "
          >
            {/* Top-Most temperature data */}
            <div
              className="flex flex-row items-center justify-between p-4  rounded-md xl:flex xl:flex-col xl:w-[30rem] pt-8 xl:shadow-2xl
              lg:flex lg:flex-col lg:w-[22rem] lg:shadow-lg
            
            "
              style={{
                backgroundImage: getTemperatureBackground(
                  currentWeather?.temp_c
                ),
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="flex flex-col items-center justify-between">
                {/*Hourly and overallday buttons */}
                <div
                  className="mt-[-30px] self-start flex gap-2 xl:absolute xl:top-80 xl:z-30
                lg:absolute lg:top-80 lg:z-30
                "
                >
                  <button
                    className="bg-blue-500 text-white p-2 cursor-pointer text-lg rounded-md font-semibold
                   hover:bg-blue-800 transition active:bg-blue-950 xl:cursor-pointer
                   "
                    onClick={handleHourlyButton}
                  >
                    hourly
                  </button>
                  <button
                    className="text-white bg-blue-500 p-2 text-lg rounded-md font-semibold 
                    hover:bg-blue-800 transition active:bg-blue-950 "
                    onClick={handleOverAllDayButton}
                  >
                    overallday
                  </button>
                </div>

                {/* temp_c and feelslike_c */}
                <p
                  className=" text-3xl self-start font-bold text-white xl:text-6xl
                lg:text-5xl
                "
                >
                  <span className="text-7xl lg:text-8xl xl:text-9xl">
                    {currentWeather?.temp_c}
                  </span>
                  &deg;C
                </p>
                <p className="text-xl text-white font-semibold pt-2 xl:text-3xl lg:text-3xl">
                  Feels Like : {currentWeather?.feelslike_c}&deg;C
                </p>
              </div>

              <div className="flex flex-col items-center justify-between mb-10 xl:pt-8 lg:pt-6">
                {/* day and night tracker */}
                <p
                  className="self-end cursor-default text-white font-bold xl:absolute xl:top-72 xl:right-12 xl:z-30
                 xl:text-white xl:bg-purple-500 xl:p-2 xl:w-32 xl:text-center xl:rounded-lg
                  xl:shadow-2xl xl:text-3xl xl:cursor-default
                  lg:absolute lg:top-72 lg:right-10 lg:z-30 lg:text-white lg:bg-purple-500 lg:w-28 lg:text-center lg:rounded-lg lg:p-2
                  "
                >
                  {day_night_tracker(currentWeather?.is_day)}
                </p>

                {/* sky-icon and text */}
                <img
                  className="size-28 h-28 xl:size-36 xl:h-36 lg:size-32 lg:h-32"
                  src={currentDataIcon}
                  alt="icon"
                />
                <p className="text-lg text-white font-semibold xl:text-4xl xl:font-bold lg:text-3xl lg:font-bold">
                  {currentWeather?.condition?.text}
                </p>
              </div>
            </div>

            {/* Form for input of location */}
            <div
              className="self-center w-full flex flex-col items-center gap-2 mt-2 xl:absolute xl:top-72 xl:w-full
            lg:absolute lg:top-72 lg:w-full
            "
            >
              {error && (
                <p className="text-red-500 font-semibold text-center">
                  {error}
                </p>
              )}
              <form
                onSubmit={handleInputLocation}
                className="flex w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden xl:max-w-3xl"
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

            <div className="flex flex-col bg-slate-500 rounded-md p-4 gap-2 xl:w-[33rem]">
              {/* humidity */}
              <div
                className="flex flex-row justify-between  bg-slate-600 p-3 rounded-md"
                style={{
                  backgroundImage: getHumidityBackground(
                    currentWeather?.humidity
                  ),
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <p className="text-white text-2xl font-semibold">Humidity:</p>
                <p className="text-white text-2xl font-semibold lg:text-lg">
                  {currentWeather?.humidity}%
                </p>
              </div>

              {/* wind-speed */}
              <div
                className="flex flex-row justify-between items-center   bg-slate-600 p-3 rounded-md"
                style={{
                  backgroundImage: getWindBackground(currentWeather?.wind_kph),
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <p className="text-white text-2xl font-semibold lg:text-lg">
                  Wind<span className="text-sm">Avg </span>:
                  {currentWeather?.wind_degree}&deg;
                </p>
                <p className="text-white  font-semibold ml-10 flex flex-col justify-center items-center">
                  <span className="self-end text-xl lg:text-lg">
                    {currentWeather?.wind_kph} km/h
                  </span>
                  <span className="text-xl font-normal lg:text-lg">
                    {getWindFlowDirection(currentWeather?.wind_dir)}
                  </span>
                </p>
              </div>

              {/* UV Index */}
              {currentWeather?.uv ? (
                <div className="flex flex-row justify-between items-center  bg-slate-600 p-3 rounded-md">
                  <p className="text-white text-2xl font-semibold">UV Index:</p>
                  <p className="text-white text-2xl font-semibold lg:text-lg">
                    {currentWeather?.uv} | {uvIndexState(currentWeather?.uv)}
                  </p>
                </div>
              ) : (
                <div className="hidden"></div>
              )}

              {/* cloud cover */}
              <div className="flex flex-row justify-between items-center  bg-slate-600 p-3 rounded-md">
                <p className="text-white text-2xl font-semibold">Cloudy:</p>
                <p className="text-white text-2xl font-semibold lg:text-lg">
                  {currentWeather?.cloud}%
                </p>
              </div>

              {/* atmospheric pressure */}
              <div className="flex flex-row justify-between items-center  bg-slate-600 p-3 rounded-md">
                <p className="text-white text-2xl font-semibold lg:text-lg">
                  Atm pressure:
                </p>
                <p className="flex flex-col text-white text-xl font-semibold lg:text-lg">
                  <span>{currentWeather?.pressure_mb} mb</span>
                  <span> {currentWeather?.pressure_in} inHg</span>
                </p>
              </div>

              {/* Visibility */}
              <div className="flex flex-row justify-between items-center  bg-slate-600 p-3 rounded-md">
                <p className="text-white text-2xl font-semibold lg:text-lg">
                  Visibility:
                </p>
                <p className="text-white text-2xl font-semibold lg:text-lg">
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
          {/* <p>Width : {width}</p> */}
        </div>
      )}
    </>
  );
}

export default CurrentWeather;

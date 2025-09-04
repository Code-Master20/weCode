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
      return "❄️ Snow-possible";
    } else if (
      twentyFourHourForecasting[hours] &&
      twentyFourHourForecasting[hours]?.will_it_snow !== 1
    ) {
      return "☀️ No-snow";
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

  // background gradient for different temperatures
  function getTemperatureBackground(temp) {
    if (temp < 10) {
      return "linear-gradient(to top, #00c6fb, #005bea)"; // cold blue
    } else if (temp >= 10 && temp < 25) {
      return "linear-gradient(to top, #fbc2eb, #a6c1ee)"; // mild pink-purple
    } else {
      return "linear-gradient(to top, #fddb92, #d1fdff)"; // hot yellow-orange
    }
  }

  // background gradient for different uv indices
  function getUVBackground(uv) {
    if (uv <= 2) {
      // Low UV (safe)
      return "linear-gradient(to top, #a8edea, #fed6e3)";
      // soft blue-pink
    } else if (uv <= 5) {
      // Moderate UV
      return "linear-gradient(to top, #fceabb, #f8b500)";
      // yellow-orange
    } else if (uv <= 7) {
      // High UV
      return "linear-gradient(to top, #f6d365, #fda085)";
      // bright orange-red
    } else if (uv <= 10) {
      // Very High UV
      return "linear-gradient(to top, #f5576c, #f093fb)";
      // pink-red-purple
    } else {
      // Extreme UV
      return "linear-gradient(to top, #8e2de2, #4a00e0)";
      // deep purple
    }
  }

  // background gradient for different atmospheric pressures
  function getPressureBackground(pressure) {
    if (pressure < 990) {
      // Very Low Pressure - stormy
      return "linear-gradient(to top, #0f2027, #203a43, #2c5364)";
      // dark bluish storm
    } else if (pressure < 1005) {
      // Low Pressure - cloudy/rainy
      return "linear-gradient(to top, #757f9a, #d7dde8)";
      // gray tones
    } else if (pressure <= 1020) {
      // Normal Pressure - balanced
      return "linear-gradient(to top, #a1c4fd, #c2e9fb)";
      // calm blue sky
    } else if (pressure <= 1035) {
      // High Pressure - clear & sunny
      return "linear-gradient(to top, #56ccf2, #2f80ed)";
      // bright clear blue
    } else {
      // Very High Pressure - dry, hot
      return "linear-gradient(to top, #f2994a, #f2c94c)";
      // golden/yellow sunny tones
    }
  }

  function getVisibilityBackground(visibility) {
    if (visibility < 1) {
      // Very low visibility - dense fog/snowstorm
      return "linear-gradient(to top, #434343, #000000)";
      // almost black/gray
    } else if (visibility < 4) {
      // Low visibility - fog/rain
      return "linear-gradient(to top, #606c88, #3f4c6b)";
      // dark bluish fog
    } else if (visibility < 10) {
      // Medium visibility - haze
      return "linear-gradient(to top, #bdc3c7, #2c3e50)";
      // hazy gray sky
    } else {
      // High visibility - clear
      return "linear-gradient(to top, #56ccf2, #2f80ed)";
      // bright clear sky
    }
  }

  function getSnowBackground(snowFlag) {
    if (snowFlag === 1) {
      return "linear-gradient(to top, #c9d6ff, #e2e2e2)";
      // snowy sky (grey-blue-white)
    } else {
      return "linear-gradient(to top, #83a4d4, #b6fbff)";
      // clear cold sky
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

  const [isRain, setIsrain] = useState(null);
  function getCurrentHourEpoch() {
    const date = new Date(); // current time
    date.setMinutes(0, 0, 0); // reset minutes, seconds, milliseconds → 00:00:00
    return Math.floor(date.getTime() / 1000); // convert ms → seconds
  }

  const hourEpoch = getCurrentHourEpoch();

  useEffect(() => {
    const timer = setTimeout(() => {
      const obj = twentyFourHourForecasting.find(
        (hour) => hour.time_epoch == hourEpoch
      ).will_it_rain;

      setIsrain(obj);
    }, 2000);
    return () => clearTimeout(timer);
  }, [twentyFourHourForecasting, hourEpoch]);

  function getRainAnimationSpeed(isRain, rainPrecip) {
    // Handle undefined/null values during loading
    if (isRain === null || isRain === undefined) {
      return "6s ease-in"; // Default while loading
    }

    // Handle invalid precipitation values
    if (rainPrecip === null || rainPrecip === undefined || rainPrecip < 0) {
      rainPrecip = 0; // Set to 0 if invalid
    }

    if (!isRain) return "6s ease-in";
    if (rainPrecip === 0) return "6s ease-in"; // No rain
    if (rainPrecip < 0.1) return "5s ease-in"; // Very light rain
    if (rainPrecip < 0.3) return "4s ease-in"; // Light rain
    if (rainPrecip < 0.5) return "3s ease-in"; // Moderate rain
    if (rainPrecip < 1.0) return "2s ease-in"; // Heavy rain
    return "1s ease-in"; // Very heavy rain
  }

  function getCloudAnimationSpeed(cloud) {
    // Handle undefined/null values
    if (cloud === null || cloud === undefined) {
      return "8s ease-in"; // Default while loading
    }

    // Cloud percentage-based animation speeds (0-100%)
    if (cloud === 0) return "0s ease-in"; // Clear sky - no animation
    if (cloud <= 10) return "20s ease-in"; // Few clouds - very slow drift
    if (cloud <= 25) return "15s ease-in"; // Scattered clouds - slow
    if (cloud <= 40) return "12s ease-in"; // Partly cloudy - moderate slow
    if (cloud <= 60) return "8s ease-in"; // Mostly cloudy - normal
    if (cloud <= 75) return "6s ease-in"; // Broken clouds - moderate fast
    if (cloud <= 90) return "4s ease-in"; // Overcast - fast movement
    return "2s ease-in"; // Dense overcast - very fast
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
        lg:flex lg:flex-row lg:mt-24 lg:max-w-full lg:justify-between lg:border-none md:flex md:flex-row md:mt-24 md:max-w-full md:justify-between md:border-none
        "
        >
          {/* First Section */}
          <div
            className="flex flex-col gap-2 xl:flex xl:flex-row xl:gap-3 xl:w-[67%] 
          lg:flex lg:flex-row lg:gap-2 lg:w-[67%] md:flex md:flex-row md:gap-1 md:w-[67%]
          "
          >
            {/* Top-Most temperature data */}
            <div
              className="flex flex-row items-center justify-between p-4  rounded-md xl:flex xl:flex-col xl:w-[30rem] pt-8 xl:shadow-2xl
              lg:flex lg:flex-col lg:w-[22rem] lg:shadow-lg md:flex md:flex-col md:w-[16rem] md:shadow-lg 
            
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
                lg:absolute lg:top-80 lg:z-30 md:absolute md:top-80 md:z-30 md:
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
                  md:absolute md:top-72 md:right-3 md:z-30 md:text-white md:bg-purple-500 md:w-28 md:text-center md:rounded-lg md:p-2
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
              className="self-center w-full flex flex-col items-center gap-2 mt-2 xl:absolute xl:top-72 xl:w-full xl:ml-9
            lg:absolute lg:top-72 lg:w-full lg:ml-8 md:absolute md:top-72 md:w-[20rem] md:ml-[19rem]
            "
            >
              {error && (
                <p className="text-red-500 font-semibold text-center">
                  {error}
                </p>
              )}
              <form
                onSubmit={handleInputLocation}
                className="flex w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden xl:max-w-3xl xl:h-12 lg:max-w-xl lg:h-9 md:max-w-xl md:h-9"
              >
                <input
                  className="flex-1 bg-slate-100 p-3 text-lg outline-none focus:ring-2 focus:ring-blue-400 transition rounded-none md:text-sm"
                  type="text"
                  placeholder="Enter a location"
                  value={locationInput}
                  onChange={(e) => setLocationInput(e.target.value)}
                  required
                />
                <button
                  className="bg-blue-500 text-white px-6 py-2 text-lg font-semibold hover:bg-blue-700 active:bg-blue-900 transition md:pt-2 md:text-sm"
                  type="submit"
                >
                  Enter
                </button>
              </form>
            </div>

            <div className="flex flex-col bg-slate-200 shadow-lg rounded-md p-4 gap-2  xl:w-[33rem] lg:w-[24rem] md:w-[17rem]">
              {/* humidity */}
              <div
                className="flex flex-row justify-between shadow-lg p-3 rounded-md"
                style={{
                  backgroundImage: getHumidityBackground(
                    currentWeather?.humidity
                  ),
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <p className="text-white text-2xl font-semibold lg:text-xl md:text-sm">
                  Humidity:
                </p>
                <p className="text-white text-2xl font-semibold lg:text-lg md:text-sm">
                  {currentWeather?.humidity}%
                </p>
              </div>

              {/* wind-speed */}
              <div
                className={`flex flex-row justify-between items-center p-3 shadow-xl rounded-md md:pt-1 md:pb-1 bg-[length:200%_100%]
                   animate-wind-flow bg-gradient-to-tr from-red-300 via-blue-200 to-blue-400`}
                style={{
                  animationDuration: getWindAnimationSpeed(
                    currentWeather?.wind_kph || 0
                  ),
                }}
              >
                <p className="text-white text-2xl font-semibold lg:text-xl md:text-sm">
                  Wind
                  <span className="text-sm lg:text-xs md:text-[0.5rem]">
                    Avg{" "}
                  </span>
                  :{currentWeather?.wind_degree}&deg;
                </p>
                <p className="text-white  font-semibold ml-10 flex flex-col justify-center items-center">
                  <span className="self-end text-xl lg:text-xl md:text-sm">
                    {currentWeather?.wind_kph} km/h
                  </span>
                  <span className="text-xl font-normal lg:text-xl md:text-xs">
                    {getWindFlowDirection(currentWeather?.wind_dir)}
                  </span>
                </p>
              </div>

              {/* UV Index */}
              {currentWeather?.uv ? (
                <div
                  className="flex flex-row justify-between items-center p-3 shadow-xl rounded-md"
                  style={{
                    background: getUVBackground(currentWeather?.uv),
                    padding: "20px",
                    borderRadius: "12px",
                    color: "white",
                  }}
                >
                  <p className="text-white text-2xl font-semibold lg:text-xl md:text-sm">
                    UV Index:
                  </p>
                  <p className="text-white text-2xl font-semibold lg:text-xl md:text-xs">
                    {currentWeather?.uv} | {uvIndexState(currentWeather?.uv)}
                  </p>
                </div>
              ) : (
                <div className="hidden"></div>
              )}

              {/* cloud cover */}
              <div
                className={`flex flex-row justify-between items-center shadow-xl p-3 rounded-md md:pt-2 md:pb -2 
                  bg-gradient-to-tl from-gray-400 via-slate-50 to-blue-300
                  bg-[length:300%_300%] animate-wind-flow`}
                style={{
                  animationDuration: getCloudAnimationSpeed(
                    currentWeather?.cloud || 0
                  ),
                }}
              >
                <p className="text-slate-500 text-2xl font-semibold xl:text-xl md:text-sm">
                  Cloudy:
                </p>
                <p className="text-slate-400 text-2xl font-semibold xl:text-xl lg:text-lg md:text-sm">
                  {currentWeather?.cloud}%
                </p>
              </div>

              {/* atmospheric pressure */}
              <div
                className="flex flex-row justify-between items-center p-3 shadow-xl rounded-md md:pt-1 md:pb-1"
                style={{
                  background: getPressureBackground(
                    currentWeather?.pressure_mb
                  ),
                  // padding: "20px",
                  // borderRadius: "12px",
                  color: "white",
                }}
              >
                <p className="text-white text-2xl font-semibold lg:text-xl md:text-sm">
                  Atm pressure:
                </p>
                <p className="flex flex-col text-white text-xl font-semibold lg:text-xl md:text-xs">
                  <span>{currentWeather?.pressure_mb} mb</span>
                  <span> {currentWeather?.pressure_in} inHg</span>
                </p>
              </div>

              {/* Visibility */}
              <div
                className="flex flex-row justify-between items-center p-3 shadow-xl rounded-md"
                style={{
                  background: getVisibilityBackground(currentWeather?.vis_km),
                  color: "white",
                }}
              >
                <p className="text-white text-2xl font-semibold lg:text-xl md:text-sm">
                  Visibility:
                </p>
                <p className="text-white text-2xl font-semibold lg:text-xl md:text-sm">
                  {currentWeather?.vis_km} km | {currentWeather?.vis_miles}{" "}
                  miles
                </p>
              </div>

              {/* Precipitation */}

              {currentWeather?.precip_mm ? (
                <div
                  className={`flex flex-row justify-between items-center p-3 shadow-xl rounded-md md:pt-1 md:pb-1 bg-gradient-to-tl from-lime-400 via-zinc-300 to-green-500
                   bg-[length:300%_300%] animate-wind-flow
                    `}
                  style={{
                    animationDuration: getRainAnimationSpeed(
                      isRain,
                      currentWeather?.precip_in
                    ),
                  }}
                >
                  <p className="text-white text-2xl font-semibold xl:text-xl xl:font-bold lg:text-xl lg:font-bold md:text-sm">
                    Precipitation:
                  </p>
                  <p
                    className="text-white flex  text-xl flex-col justify-between items-center font-semibold xl:font-bold xl:text-lg xl:flex xl:flex-col xl:justify-between xl:items-center 
                  lg:flex lg:flex-col lg:justify-between lg:items-center md:text-sm "
                  >
                    <span className="lg:text-xl self-end">
                      {currentWeather?.precip_in} in{" "}
                    </span>
                    <span className="text-sm lg:text-xl md:text-xs ">
                      {rainPossibilityTracker()}
                    </span>
                  </p>
                </div>
              ) : (
                <div className="hidden"></div>
              )}

              {/* Snow Possibility */}

              {twentyFourHourForecasting &&
              twentyFourHourForecasting[hours()]?.will_it_snow ? (
                <div
                  className="flex flex-row justify-between items-center p-3 rounded-md"
                  style={{
                    background: getSnowBackground(
                      twentyFourHourForecasting[hours]
                    )?.will_it_snow,
                    padding: "20px",
                    borderRadius: "12px",
                    color: "white",
                  }}
                >
                  <p className="text-white text-2xl font-semibold lg:text-xl">
                    Snowy:
                  </p>
                  <p className="text-white text-2xl font-semibold lg:text-xl">
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

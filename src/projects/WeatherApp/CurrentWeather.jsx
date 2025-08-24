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
  } = useWeather();
  console.log(currentWeather);

  const currentDataIcon = currentWeather?.condition?.icon;

  function getWindFlowDirection(dir) {
    const map = {
      N: "North to South",
      NNE: "North-Northeast to South-Southwest",
      NE: "Northeast to Southwest",
      ENE: "East-Northeast to West-Southwest",
      E: "East to West",
      ESE: "East-Southeast to West-Northwest",
      SE: "Southeast to Northwest",
      SSE: "South-Southeast to North-Northwest",
      S: "South to North",
      SSW: "South-Southwest to North-Northeast",
      SW: "Southwest to Northeast",
      WSW: "West-Southwest to East-Northeast",
      W: "West to East",
      WNW: "West-Northwest to East-Southeast",
      NW: "Northwest to Southeast",
      NNW: "North-Northwest to South-Southeast",
    };

    return map[dir] ? `${map[dir]}` : "Direction unknown";
  }

  return (
    <>
      <div className="flex flex-row nowrap justify-between gap-4 pl-6 pr-6 width-[100%] pt-6">
        {/* current data */}
        <div className="border-4 flex flex-col border-blue-300 rounded-lg p-4 gap-3 width-[50%]">
          {/* First Section */}
          <div className="flex flex-col gap-2">
            {/* Top-Most temperature data */}
            <div className="flex flex-row gap-4 items-center justify-between bg-slate-400 p-8 rounded-md">
              <div className="flex flex-col items-center justify-between">
                <p className="text-6xl self-start font-bold text-white">
                  {currentWeather.temp_c}&deg;C
                </p>
                <p className="text-3xl text-white font-semibold pt-2">
                  Feels Like:{currentWeather.feelslike_c}&deg;C
                </p>
              </div>
              <div className="flex flex-col items-center">
                <img
                  className="size-28 h-28"
                  src={currentDataIcon}
                  alt="icon"
                />
                <p className="text-2xl text-white font-semibold">
                  {currentWeather?.condition?.text}
                </p>
              </div>
            </div>

            {/* Other current data */}
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
                <p className="text-white text-2xl font-semibold">Wind:</p>
                <p className="text-white text-2xl font-semibold ml-48 flex flex-col justify-center items-center">
                  <span className="self-end">
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
              <p>visibility</p>
              <p>cloud cover</p>
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

        {/* day's hourly data */}
        <div className="border-4 border-blue-300 rounded-lg p-4 width-[50%]">
          <p>hsadsdjifodkgg</p>
          <p>hsadsdjifodkgg</p>
          <p>hsadsdjifodkgg</p>
          <p>hsadsdjifodkgg</p>
          <p>hsadsdjifodkgg</p>
        </div>
      </div>
    </>
  );
}

export default CurrentWeather;

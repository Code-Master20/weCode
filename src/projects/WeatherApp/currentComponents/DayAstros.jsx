import { useWeather } from "../../../contexts/projectContexts/WeatherContext";

function DayAstros() {
  const { currentDayAstros, setCurrentDayAstros } = useWeather();
  // Moon Phases
  function moonPhases(phase) {
    const moon = {
      "New Moon": "🌑",
      "Waxing Crescent": "🌒",
      "First Quarter": "🌓",
      "Waxing Gibbous": "🌔",
      "Full Moon": "🌕",
      "Waning Gibbous": "🌖",
      "Last Quarter": "🌗",
      "Waning Crescent": "🌘",
    };
    return moon[phase] ?? "🌙 Unknown";
  }

  function moonIllumination(illumination) {
    const leftOverMoon = 100 - illumination;
    return `${illumination}% lit | ${leftOverMoon}% dark`;
  }

  return (
    <>
      <div className="flex flex-col gap-2 bg-slate-300 rounded-md p-2 xl:flex xl:flex-col xl:w-[33rem] xl:gap-9 lg:w-[28rem] lg:gap-8">
        {/* Sun Astro */}
        <div
          className="flex flex-row justify-between items-center  bg-slate-400 p-3 rounded-md xl:flex xl:flex-row xl:justify-between xl:items-center xl:h-32
        lg:flex lg:flex-row lg:justify-between lg:items-center lg:h-28"
        >
          <p className="text-2xl font-semibold text-white xl:text-3xl lg:text-2xl lg:text-center">
            Sun:
          </p>
          <p className="text-xl flex flex-col justify-center items-center font-semibold text-white xl:text-2xl xl:font-bold lg:text-lg lg:font-bold">
            <span>🌞{currentDayAstros.sunrise}</span>{" "}
            <span> 🌄{currentDayAstros.sunset}</span>
          </p>
        </div>

        {/* Moon Astro */}
        <div className="flex flex-row justify-between items-center  bg-slate-400 p-3 rounded-md xl:h-32 lg:h-28">
          <p className="text-2xl font-semibold text-white xl:text-3xl lg:text-xl">
            Moon:
          </p>
          <p className="text-lg flex flex-col justify-center items-center font-semibold text-white xl:text-2xl xl:font-bold">
            <span>🌙⬆️{currentDayAstros.moonrise}</span>{" "}
            <span>🌙⬇️{currentDayAstros.moonset}</span>
          </p>
        </div>

        {/* Moon Phase */}
        <div className="flex flex-row justify-between items-center  bg-slate-400 p-3 rounded-md xl:h-32 lg:h-28">
          <p className="text-2xl font-semibold text-white xl:text-3xl lg:text-xl">
            Moon-Ph:
          </p>

          <div className="flex flex-col items-center">
            <p className="text-lg font-semibold text-white xl:text-xl xl:font-bold lg:text-lg lg:font-bold">
              {currentDayAstros.moon_phase}(
              {moonPhases(currentDayAstros.moon_phase)})
            </p>
            <p className="text-xl font-semibold text-white xl:text-xl xl:font-bold lg:text-lg lg:font-bold">
              {moonIllumination(currentDayAstros.moon_illumination)}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
export default DayAstros;

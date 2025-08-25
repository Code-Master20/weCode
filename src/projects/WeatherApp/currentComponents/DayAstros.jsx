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
      <div className="flex flex-col gap-2 bg-slate-300 rounded-md p-2">
        {/* Sun Astro */}
        <div className="flex flex-row justify-between items-center  bg-slate-400 p-3 rounded-md">
          <p className="text-2xl font-semibold text-white">Sun:</p>
          <p className="text-xl font-semibold text-white">
            R({currentDayAstros.sunrise}){"->"}S({currentDayAstros.sunset})
          </p>
        </div>

        {/* Moon Astro */}
        <div className="flex flex-row justify-between items-center  bg-slate-400 p-3 rounded-md">
          <p className="text-2xl font-semibold text-white">Moon:</p>
          <p className="text-lg font-semibold text-white">
            R({currentDayAstros.moonrise}){"->"}S({currentDayAstros.moonset})
          </p>
        </div>

        {/* Moon Phase */}
        <div className="flex flex-row justify-between items-center  bg-slate-400 p-3 rounded-md">
          <p className="text-2xl font-semibold text-white">Moon-Ph:</p>

          <div className="flex flex-col items-center">
            <p className="text-lg font-semibold text-white">
              {currentDayAstros.moon_phase}(
              {moonPhases(currentDayAstros.moon_phase)})
            </p>
            <p className="text-xl font-semibold text-white">
              {moonIllumination(currentDayAstros.moon_illumination)}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
export default DayAstros;

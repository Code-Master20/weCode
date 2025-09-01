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

  // Moon Phase → Gradient Map
  const moonPhaseGradients = {
    "New Moon": "linear-gradient(to bottom, #0f2027, #203a43, #2c5364)",
    "Waxing Crescent": "linear-gradient(to right, #2c3e50, #34495e)",
    "First Quarter": "linear-gradient(to right, #3a6073, #16222a)",
    "Waxing Gibbous": "linear-gradient(to right, #283048, #485563)",
    "Full Moon": "linear-gradient(to bottom, #1e3c72, #2a5298)",
    "Waning Gibbous": "linear-gradient(to right, #232526, #414345)",
    "Last Quarter": "linear-gradient(to right, #485563, #29323c)",
    "Waning Crescent": "linear-gradient(to right, #141e30, #243b55)",
  };

  // Pick gradient based on current phase
  const moonPhaseBg =
    moonPhaseGradients[currentDayAstros?.moon_phase] ||
    "linear-gradient(to bottom, #0f2027, #203a43, #2c5364)"; // fallback

  return (
    <>
      <div className="flex flex-col gap-2 bg-slate-300 rounded-md shadow-lg p-2 xl:flex xl:flex-col xl:w-[33rem] xl:gap-9 lg:w-[28rem] lg:gap-8 md:w-[27rem] md:gap-8">
        {/* Sun Astro */}
        <div
          className="flex flex-row justify-between items-center p-3 rounded-md shadow-xl xl:flex xl:flex-row xl:justify-between xl:items-center xl:h-32
        lg:flex lg:flex-row lg:justify-between lg:items-center lg:h-28 md:h-20 md:p-1"
          style={{
            background: "linear-gradient(to right, #FFCF71, #FDB813, #FD6E6A)",
            padding: "15px",
            borderRadius: "16px",
            color: "white",
            textAlign: "center",
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          <p className="text-2xl font-semibold text-white xl:text-3xl lg:text-2xl lg:text-center">
            Sun:
          </p>
          <p className="text-xl flex flex-col justify-center items-center font-semibold text-white xl:text-2xl xl:font-bold lg:text-lg lg:font-bold md:text-sm">
            <span>🌞{currentDayAstros.sunrise}</span>{" "}
            <span> 🌄{currentDayAstros.sunset}</span>
          </p>
        </div>

        {/* Moon Astro */}
        <div
          className="flex flex-row justify-between items-center shadow-xl  p-3 rounded-md xl:h-32 lg:h-28 md:h-20"
          style={{
            background:
              "linear-gradient(to right, #2C3E50, #0F2027, #203A43, #2C5364)",
            padding: "10px",
            borderRadius: "16px",
            color: "white",
            textAlign: "center",
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          <p className="text-2xl font-semibold text-white xl:text-3xl lg:text-xl md:text-[1.2rem]">
            Moon:
          </p>
          <p className="text-lg flex flex-col justify-center items-center font-semibold text-white xl:text-2xl xl:font-bold md:text-sm">
            <span>🌙⬆️{currentDayAstros.moonrise}</span>{" "}
            <span>🌙⬇️{currentDayAstros.moonset}</span>
          </p>
        </div>

        {/* Moon Phase */}
        <div
          className="flex flex-row justify-between items-center shadow-xl  bg-slate-400 p-3 rounded-md xl:h-32 lg:h-28 md:h-20"
          style={{
            background: moonPhaseBg,
            padding: "15px",
            borderRadius: "16px",
            color: "white",
            textAlign: "center",
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          <p className="text-2xl font-semibold text-white xl:text-3xl lg:text-lg md:text-[1rem]">
            Moon-Ph:
          </p>

          <div className="flex flex-col items-center">
            <p className="text-[1rem] font-semibold text-white xl:text-xl xl:font-bold lg:text-sm lg:font-bold md:text-xs">
              {currentDayAstros.moon_phase}(
              {moonPhases(currentDayAstros.moon_phase)})
            </p>
            <p className="text-[1rem] font-semibold text-white xl:text-xl xl:font-bold lg:text-sm lg:font-bold md:text-xs">
              {moonIllumination(currentDayAstros.moon_illumination)}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
export default DayAstros;

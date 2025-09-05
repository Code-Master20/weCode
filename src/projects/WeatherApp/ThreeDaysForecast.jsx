import { useWeather } from "../../contexts/projectContexts/WeatherContext";
import { useState } from "react";

function ThreeDaysForecast() {
  const { threeDaysForecast } = useWeather();
  const [selectedDay, setSelectedDay] = useState(0);
  const [isHourlyForecast, setIsHourlyForecast] = useState(false);
  const [selectedHourIndex, setSelectedHourIndex] = useState(0);

  if (!threeDaysForecast || threeDaysForecast.length === 0) {
    return (
      <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl shadow-lg">
        <div className="animate-pulse">
          <div className="h-6 bg-blue-200 rounded w-1/2 mb-3"></div>
          <div className="h-8 bg-blue-200 rounded mb-4"></div>
          <div className="h-32 bg-blue-200 rounded"></div>
        </div>
      </div>
    );
  }

  const selectedDayData = threeDaysForecast[selectedDay];
  const hourlyData = selectedDayData.hour; // Get hourly data for the selected day

  const date = new Date(selectedDayData.date);
  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const selectedHour = hourlyData[selectedHourIndex];

  // Format time for display (e.g., "02:00 pm", "08:00 am")
  const formatTime = (timeString) => {
    const time = new Date(timeString);
    return time
      .toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
      .toLowerCase();
  };

  // Format date with time for detailed view
  const formatDateTime = (timeString) => {
    const time = new Date(timeString);
    return time.toLocaleString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl shadow-lg">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-3">
        <h2 className="text-xl font-bold text-gray-800">
          {isHourlyForecast ? "Hourly Forecast" : "3-Day Forecast"}
        </h2>

        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          {!isHourlyForecast ? (
            <select
              value={selectedDay}
              onChange={(e) => {
                setSelectedDay(parseInt(e.target.value));
                setSelectedHourIndex(0); // Reset hour selection when changing days
              }}
              className="w-full sm:w-auto px-3 py-2 bg-white border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-sm text-sm"
            >
              <option value={0}>Today</option>
              <option value={1}>Tomorrow</option>
              <option value={2}>Day After Tomorrow</option>
            </select>
          ) : (
            <select
              value={selectedHourIndex}
              onChange={(e) => setSelectedHourIndex(parseInt(e.target.value))}
              className="w-full sm:w-auto px-3 py-2 bg-white border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-sm text-sm"
            >
              {hourlyData.map((hour, index) => (
                <option key={index} value={index}>
                  {formatTime(hour.time)}
                </option>
              ))}
            </select>
          )}

          <button
            onClick={() => {
              setIsHourlyForecast(!isHourlyForecast);
              setSelectedHourIndex(0); // Reset hour selection when switching views
            }}
            className="w-full sm:w-auto px-3 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors shadow-md text-sm font-medium"
          >
            {isHourlyForecast ? "Daily Forecast" : "Hourly Forecast"}
          </button>
        </div>
      </div>

      {isHourlyForecast ? (
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">
            {formatDateTime(selectedHour.time)}
          </h3>

          <div className="flex items-center justify-between mb-6 xl:justify-around lg:justify-around md:justify-around">
            <div className="text-center">
              <p className="text-4xl font-bold text-indigo-700">
                {selectedHour.temp_c}°C
              </p>

              <p className="text-sm text-gray-500">
                Feels like {selectedHour.feelslike_c}°C
              </p>
            </div>

            <div className="text-center">
              <img
                src={`https:${selectedHour.condition.icon}`}
                alt={selectedHour.condition.text}
                className="w-20 h-20 mr-4"
              />
              <p className="text-lg text-gray-600 capitalize">
                {selectedHour.condition.text.toLowerCase()}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 p-3 rounded-lg text-center">
              <p className="text-sm text-gray-600 mb-1">Humidity</p>
              <p className="text-xl font-semibold text-blue-700">
                {selectedHour.humidity}%
              </p>
            </div>

            <div className="bg-green-50 p-3 rounded-lg text-center">
              <p className="text-sm text-gray-600 mb-1">Wind Speed</p>
              <p className="text-xl font-semibold text-green-700">
                {selectedHour.wind_kph} km/h
              </p>
              <p className="text-xs text-gray-500">{selectedHour.wind_dir}</p>
            </div>

            <div className="bg-purple-50 p-3 rounded-lg text-center">
              <p className="text-sm text-gray-600 mb-1">Rain Chance</p>
              <p className="text-xl font-semibold text-purple-700">
                {selectedHour.chance_of_rain}%
              </p>
            </div>

            <div className="bg-orange-50 p-3 rounded-lg text-center">
              <p className="text-sm text-gray-600 mb-1">UV Index</p>
              <p className="text-xl font-semibold text-orange-700">
                {selectedHour.uv}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm mb-6">
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-gray-600 mb-2">Pressure</p>
              <p className="font-semibold">{selectedHour.pressure_mb} mb</p>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-gray-600 mb-2">Visibility</p>
              <p className="font-semibold">{selectedHour.vis_km} km</p>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-gray-600 mb-2">Dew Point</p>
              <p className="font-semibold">{selectedHour.dewpoint_c}°C</p>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-gray-600 mb-2">Gust Speed</p>
              <p className="font-semibold">{selectedHour.gust_kph} km/h</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-gray-600 mb-2">Wind Chill</p>
              <p className="font-semibold">{selectedHour.windchill_c}°C</p>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-gray-600 mb-2">Heat Index</p>
              <p className="font-semibold">{selectedHour.heatindex_c}°C</p>
            </div>
          </div>

          {selectedHour.will_it_rain === 1 && (
            <div className="mt-4 p-3 bg-blue-100 rounded-lg text-center">
              <p className="text-blue-800 font-medium">
                🌧️ Expected to rain during this hour
              </p>
            </div>
          )}

          {selectedHour.will_it_snow === 1 && (
            <div className="mt-2 p-3 bg-blue-100 rounded-lg text-center">
              <p className="text-blue-800 font-medium">
                ❄️ Expected to snow during this hour
              </p>
            </div>
          )}

          {selectedHour.is_day === 1 ? (
            <div className="mt-4 p-3 bg-yellow-100 rounded-lg text-center">
              <p className="text-yellow-800">☀️ Day-time</p>
            </div>
          ) : (
            <div className="mt-4 p-3 bg-indigo-100 rounded-lg text-center">
              <p className="text-indigo-800">🌙 Night-time</p>
            </div>
          )}
        </div>
      ) : (
        // ... (keep the daily forecast view the same)
        <div className="space-y-4">
          {/* Weather Summary Card */}
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">
              {formattedDate}
            </h3>

            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <img
                  src={`https:${selectedDayData.day.condition.icon}`}
                  alt={selectedDayData.day.condition.text}
                  className="w-12 h-12 mr-3"
                />
                <div>
                  <p className="text-2xl font-bold text-indigo-700">
                    {selectedDayData.day.avgtemp_c}°C
                  </p>
                  <p className="text-xs text-gray-500">
                    {selectedDayData.day.condition.text}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">
                  H: {selectedDayData.day.maxtemp_c}°C
                </p>
                <p className="text-sm text-gray-500">
                  L: {selectedDayData.day.mintemp_c}°C
                </p>
              </div>
            </div>

            {/* Quick stats row */}
            <div className="grid grid-cols-3 gap-2 text-xs border-t pt-2">
              <div className="text-center">
                <p className="text-gray-500">Rain</p>
                <p className="font-semibold">
                  {selectedDayData.day.daily_chance_of_rain}%
                </p>
              </div>
              <div className="text-center">
                <p className="text-gray-500">Humidity</p>
                <p className="font-semibold">
                  {selectedDayData.day.avghumidity}%
                </p>
              </div>
              <div className="text-center">
                <p className="text-gray-500">Wind</p>
                <p className="font-semibold">
                  {selectedDayData.day.maxwind_kph}km/h
                </p>
              </div>
            </div>
          </div>

          {/* Astronomy Card */}
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <h3 className="text-sm font-semibold text-gray-600 mb-3">
              Astronomy
            </h3>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-blue-50 p-2 rounded-lg">
                <div className="flex items-center mb-1">
                  <span className="text-yellow-500 mr-1">☀️</span>
                  <span className="text-gray-600">Sunrise</span>
                </div>
                <p className="font-semibold text-sm">
                  {selectedDayData.astro.sunrise}
                </p>
              </div>

              <div className="bg-orange-50 p-2 rounded-lg">
                <div className="flex items-center mb-1">
                  <span className="text-orange-500 mr-1">🌅</span>
                  <span className="text-gray-600">Sunset</span>
                </div>
                <p className="font-semibold text-sm">
                  {selectedDayData.astro.sunset}
                </p>
              </div>

              <div className="bg-purple-50 p-2 rounded-lg">
                <div className="flex items-center mb-1">
                  <span className="text-purple-500 mr-1">🌙</span>
                  <span className="text-gray-600">Moonrise</span>
                </div>
                <p className="font-semibold text-sm">
                  {selectedDayData.astro.moonrise}
                </p>
              </div>

              <div className="bg-indigo-50 p-2 rounded-lg">
                <div className="flex items-center mb-1">
                  <span className="text-indigo-500 mr-1">🌄</span>
                  <span className="text-gray-600">Moonset</span>
                </div>
                <p className="font-semibold text-sm">
                  {selectedDayData.astro.moonset}
                </p>
              </div>
            </div>
          </div>

          {/* Detailed Weather Card */}
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <h3 className="text-sm font-semibold text-gray-600 mb-3">
              Details
            </h3>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-500">UV Index</span>
                <span className="font-semibold">{selectedDayData.day.uv}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Precipitation</span>
                <span className="font-semibold">
                  {selectedDayData.day.totalprecip_mm}mm
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Visibility</span>
                <span className="font-semibold">
                  {selectedDayData.day.avgvis_km}km
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Will Rain</span>
                <span className="font-semibold">
                  {selectedDayData.day.daily_will_it_rain ? "Yes" : "No"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Moon Phase</span>
                <span className="font-semibold">
                  {selectedDayData.astro.moon_phase}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Moon Light</span>
                <span className="font-semibold">
                  {selectedDayData.astro.moon_illumination}%
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ThreeDaysForecast;

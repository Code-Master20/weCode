
function FourteenDayForecast() {
  return (
    <div className="p-4 bg-white rounded shadow mt-4">
      <h2 className="text-2xl font-bold mb-4">14-Day Forecast</h2>
      <ul className="space-y-2">
        {Array.from({ length: 14 }).map((_, index) => (
          <li key={index} className="flex justify-between">
            <span>Day {index + 1}</span>
            <span>Sunny, 20°C</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FourteenDayForecast;
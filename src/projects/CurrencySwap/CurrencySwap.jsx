import { useState } from "react";
import { useCurrencyRate } from "../../contexts/projectContexts/CurrencyRateContext";

function CurrencySwap() {
  const {
    setReferenceCountry,
    convertedCurrencyRates,
    countryCodes,
    isLoading,
    error,
  } = useCurrencyRate();

  const [from, setFrom] = useState("From");
  const [to, setTo] = useState("To");

  document.body.style.backgroundColor = "#93c5fd";

  function handleSwapButton() {}

  return (
    <div className="min-h-[79vh] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Currency Converter
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Real-time exchange rates
        </p>

        <div className="space-y-6">
          {/* From Currency */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {from}
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="number"
                placeholder="0.00"
                className="flex-1 py-3 px-4 bg-white border border-gray-300 rounded-lg sm:rounded-r-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-lg"
              />
              <select
                className="py-3 px-4 border border-gray-300 rounded-lg sm:rounded-l-none bg-white focus:ring-2 focus:ring-blue-500
               focus:border-blue-500 outline-none text-lg w-full sm:w-auto"
              >
                {countryCodes.map((c_code, idx) => (
                  <option key={idx} value={c_code}>
                    {c_code}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center">
            <button
              className="bg-blue-600 text-white p-3 rounded-full shadow-md hover:bg-blue-700 transition-colors duration-200 transform hover:scale-105"
              onClick={() => handleSwapButton()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                />
              </svg>
            </button>
          </div>

          {/* To Currency */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {to}
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="number"
                placeholder="0.00"
                disabled
                className="flex-1 py-3 px-4 bg-white border border-gray-300 rounded-lg sm:rounded-r-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-lg"
              />
              <select className="py-3 px-4 border border-gray-300 rounded-lg sm:rounded-l-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-lg w-full sm:w-auto">
                {countryCodes.map((c_code, idx) => (
                  <option key={idx} value={c_code}>
                    {c_code}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CurrencySwap;

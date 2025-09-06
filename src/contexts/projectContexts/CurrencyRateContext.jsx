import { createContext, useContext, useEffect, useState } from "react";

export const CurrencyRateContext = createContext();

export default function CurrencyRateProvider({ children }) {
  // https://v6.exchangerate-api.com/v6/99b6ba4a0790af2d70443a65/latest/${currency}

  const [referenceCountry, setReferenceCountry] = useState("USD");
  const [countryCodes, setCountryCodes] = useState([]);
  const [convertedCurrencyRates, setConvertedCurrencyRates] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchCurrencyExchangeRate() {
      setIsLoading(true); // ← Show loading spinner
      setError(null); // ← Clear previous errors
      try {
        const response = await fetch(
          `https://v6.exchangerate-api.com/v6/99b6ba4a0790af2d70443a65/latest/${referenceCountry}`
        );

        // Check if HTTP request itself succeeded
        if (!response.ok) {
          throw new Error(`Something Internal code Error`);
        }

        const jsResponse = await response.json();

        if (jsResponse.result === "success") {
          setCountryCodes(Object.keys(jsResponse.conversion_rates));
          setConvertedCurrencyRates(jsResponse.conversion_rates);
        } else {
          throw new Error("Currency API returned error");
        }
      } catch (error) {
        setError(error.message); // ← Store error for UI
        console.error("Fetch error:", error); // ← For debugging
      } finally {
        setIsLoading(false); // ← Hide loading spinner
      }
    }

    fetchCurrencyExchangeRate();
  }, [referenceCountry]);

  return (
    <CurrencyRateContext.Provider
      value={{
        referenceCountry,
        setReferenceCountry,
        convertedCurrencyRates,
        countryCodes,
        isLoading, // ← Let components show loading states
        error, // ← Let components show error messages
      }}
    >
      {children}
    </CurrencyRateContext.Provider>
  );
}

export const useCurrencyRate = () => {
  return useContext(CurrencyRateContext);
};

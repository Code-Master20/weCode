import { useContext, createContext } from "react";
import todoWebImg from "../../assets/todoImg.png";
import weatherWebImg from "../../assets/weatherImg.png";
import currencyWebImg from "../../assets/currencyImg.png";

export const WeCodeContext = createContext();

export default function WeCodeProvider({ children }) {
  const appsInfo = [
    {
      appName: "do-lists",
      appDescription: "This app tracks your tasks",
      appImg: todoWebImg,
      navigation: "/projects/todo/add-todo",
    },
    {
      appName: "lets-forecast",
      appDescription: "This app tracks weather condition",
      appImg: weatherWebImg,
      navigation: "/projects/weather",
    },
    {
      appName: "currency-swap",
      appDescription:
        "This app shows currency exchange rate of different countries with the referenced one",
      appImg: currencyWebImg,
      navigation: "/projects/currency",
    },
  ];

  return (
    <WeCodeContext.Provider value={{ appsInfo }}>
      {children}
    </WeCodeContext.Provider>
  );
}

export const useWeCode = () => useContext(WeCodeContext);

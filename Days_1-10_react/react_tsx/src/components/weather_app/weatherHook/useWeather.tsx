import { useState, useEffect } from "react";

interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: Array<{
    description: string;
    main: string;
  }>;
}

interface UseWeatherReturn {
  weather: WeatherData | null;
  loading: boolean;
  error: string | null;
}
const useWeather = (city: string): UseWeatherReturn => {
  const API_key = "46934329186a697fde27c2636656ad9c"; // YOUR_API_KEY_HERE

  const [weather, setweather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!city) return;
    async function fetchWeather() {
      setLoading(true);
      setError(null);

      try {
        const respone = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}&units=metric`,
        );
        if (!respone.ok) throw new Error("City not found");

        const data = await respone.json();
        setweather(data);
        console.log(data);
      } catch (error) {
        setError((error as Error).message);
        setLoading(false);
      } finally{
        setLoading(false);
      }
    }

    fetchWeather();
  }, [city]);

  return { weather, loading, error };
};

export default useWeather;
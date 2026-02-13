import { useState, useEffect } from "react";

const useWeather = (city) => {
  const API_key = "YOUR_API_KEY_HERE"; // YOUR_API_KEY_HERE

  const [weather, setweather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
        setError(error.message);
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

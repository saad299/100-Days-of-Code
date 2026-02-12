import { useState, type FormEvent, type ChangeEvent } from "react";
import useWeather from "../weatherHook/useWeather";

const Weather = () => {
  const [city, setCity] = useState<string>("");
  const [searchCity, setSearchCity] = useState<string>("");
  const { weather, loading, error } = useWeather(searchCity);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSearchCity(city);
  }

  return (
    <>
      <h1 className="text-3xl font-bold text-center">Weather App</h1>
      <br />
      <div>
        <form onSubmit={handleSubmit}>
          <input
            value={city}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setCity(e.target.value)}
            type="text"
            placeholder="Enter city name"
            className="border-2 border-gray-400 rounded-md p-2 w-60 mx-auto block"
          />
          <button className="bg-blue-500 text-white rounded-md p-2 mt-2 w-40 mx-auto block">
            Search
          </button>
        </form>
      </div>
      {loading && <p className="text-3xl text-center font-extrabold">Loading....</p>}
      {error && <p className="text-red-500 text-3xl text-center font-extrabold">Error: {error}</p>}
      {weather && (
        <div className="text-center text-2xl font-semibold mt-4">
          <h2>Weather: {weather.name}, {weather.sys.country}</h2>
          <p>Temperature: {weather.main.temp}℃</p>
          <p>Weather: {weather.weather[0].main}</p>
        </div>
      )}
    </>
  );
};

export default Weather;
import { useState } from "react";
import useWeather from "../weatherHook/useWeather";

const Weather = () => {
  const [city, setCity] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const { weather, loading, error } = useWeather(searchCity);

  function handleSubmit(e) {
    e.preventDefault();
    setSearchCity(city);
  }

  console.log(weather);
  

  // if (loading)
  //   return <p className="text-3xl text-center font-extrabold">Loading.....</p>;
  // if (error)
  //   return (
  //     <p className="text-3xl text-red-500 text-center font-extrabold">
  //       Error: {error}
  //     </p>
  //   );

  return (
    <>
      <h1>Weather App</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            type="text"
            placeholder="Enter city name"
            className="border-2 border-gray-400 rounded-md p-2 w-full"
          />
          <button className="bg-blue-500 text-white rounded-md p-2 mt-2 w-full">
            Search
          </button>
        </form>
      </div>
      {loading && <p>Loading....</p>}
      {error && <p>Error: {error}</p>}
      {weather && (
        <div>
          <h2>Weather: {weather.name}, {weather.sys.country}</h2>
          <p>Temperature: {weather.main.temp}℃</p>
          <p>Weather: {weather.weather[0].main}</p>
        </div>
      )}
    </>
  );
};

export default Weather;

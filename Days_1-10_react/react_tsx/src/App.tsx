import Weather from "./components/weather_app/components/Weather";

function App() {
  return (
    <>
      <div className="bg-gray-200">
        <h1 className="text-center underline decoration-pink-500 text-yellow-800 text-4xl font-extrabold">
            Days 1-10: React Refresher (TSX)
          </h1>
        {/* <FormHandling /> */}
        <Weather />
      </div>
    </>
  );
}

export default App;
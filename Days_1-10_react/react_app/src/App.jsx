// import Basics from "./components/Basics";
// import State from "./components/State";
// import ListRendering from "./components/ListRendering";
// import Effect from "./components/Effect";
// import Fetch from "./components/Fetch";
// import CustomHooks from "./components/CustomHook/CustomHooks";
// import FormHandling from "./components/FormHandling";
// import Counter from "./components/Basics";
// import { ThemeContext } from "./components/context/context";
// import Theme from "./components/theme/Theme";
// import { useState } from "react";
import Weather from "./components/weather_app/components/Weather";

function App() {
  // const [theme, setTheme] = useState();
  return (
    <>
      <div className="bg-gray-200">
        <div className="text-yellow-800 text-4xl font-extrabold">
          <h1 className="text-center underline decoration-pink-500">
            Days 1-10: React Refresher
          </h1>
        </div>
        <br />
        {/* <ThemeContext.Provider value={{ theme, setTheme }}>
          <h2>This is coming from App.jsx</h2>
          <Theme />
        </ThemeContext.Provider> */}
        {/* <Basics />
        <br />
        <State />
        <br />
        <ListRendering />
        <br />
        <Effect />
        <br /> */}
        {/* <Fetch /> */}
        {/* <FormHandling /> */}
        <Weather />
      </div>
    </>
  );
}

export default App;

// import { useState } from "react";
import Basics from "../Basics";

const Theme = () => {
//   const [theme, setTheme] = useState("light");
//   const light = {
//     background: "white",
//     textColor: "black",    
//   }
//   const dark = {
//     background: "gray",
//     textColor: "white",
//   }
  return (
    <div>
      <h2>This is Theme.jsx</h2>
      {/* <button
        onClick={() =>
          setTheme(theme === "light" ? dark : light)
        }
      >
        Toggle Theme
      </button> */}
      <Basics />
    </div>
  );
};

export default Theme;

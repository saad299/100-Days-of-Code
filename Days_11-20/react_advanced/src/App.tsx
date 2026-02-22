// import StateManagement from "./components/StateManagement";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "./components/TourProject/pages/About";
import Contact from "./components/TourProject/pages/Contact";
import Home from "./components/TourProject/pages/Home";
import Navbar from "./components/TourProject/components/Navbar";
import Destinations from "./components/TourProject/pages/Destinations";
import Services from "./components/TourProject/pages/Services";
import Booking from "./components/TourProject/pages/Booking";
import Tours from "./components/TourProject/pages/Tours";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "services",
        element: <Services />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "destinations",
        element: <Destinations />
      },
      {
        path: "tours",
        element: <Tours />
      },
      {
        path: "booking",
        element: <Booking />
      }
    ]
  }
])
function App() {
  return (
    <>
      {/* <h1 className="text-4xl font-bold text-center my-8">
        Days 11-20: React Advanced
      </h1> */}
      <RouterProvider router={router} />
      {/* <StateManagement /> */}
    </>
  );
}

export default App;
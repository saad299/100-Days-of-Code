import Footer from "./Footer";
import { Link, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button"

const Navbar = () => {
  return (
    <div>
      <div className="flex justify-between items-center p-4 bg-chart-2 text-white fixed top-0 w-full z-10">
        <h2>Galaxy Tours</h2>
        <ul className="flex justify-center items-center gap-10">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/services">Services</Link>
          </li>
          <li>
            <Link to="/destinations">Destinations</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
        <button
          aria-label="Book Now"
          className="bg-chart-5 text-white px-4 py-2 rounded hover:bg-chart-4 transition duration-300 items-center mt-4 ml-4"
        >
          <Link to="/booking">
            <a href="#booking">Book Now</a>
          </Link>
        </button>
      </div>

      <Outlet />

      <Footer />
    </div>
  );
};

export default Navbar;

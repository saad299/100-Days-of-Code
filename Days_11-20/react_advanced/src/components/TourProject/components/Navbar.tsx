import Footer from "./Footer";
import { Link, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button"

const Navbar = () => {
  return (
    <div>
      <div className="flex justify-between items-center p-4 bg-chart-2 text-white fixed top-0 w-full z-10 shadow-lg">
        <h2 className="font-bold text-xl">Galaxy Tours</h2>
        <ul className="flex justify-center items-center gap-10">
          <li>
            <Link to="/" className="hover:text-gray-200 transition">Home</Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-gray-200 transition">About</Link>
          </li>
          <li>
            <Link to="/services" className="hover:text-gray-200 transition">Services</Link>
          </li>
          <li>
            <Link to="/destinations" className="hover:text-gray-200 transition">Destinations</Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-gray-200 transition">Contact</Link>
          </li>
        </ul>
        <Link to="/booking">
          <button
            aria-label="Book Now"
            className="bg-chart-5 text-white px-4 py-2 rounded hover:bg-chart-4 transition duration-300"
          >
            Book Now
          </button>
        </Link>
      </div>

      <div className="pt-20">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default Navbar;

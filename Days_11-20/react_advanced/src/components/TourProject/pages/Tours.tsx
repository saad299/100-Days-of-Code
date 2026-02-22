import { type FormEvent, type ChangeEvent } from "react";
import { useCountries } from "../hooks/useCountries";
import useTourStore from "../hooks/useTourStore";
import TourCard from "../components/TourCard";

const Tours = () => {
  const { data: countries = [] } = useCountries();
  const {
    search,
    filterSeach,
    setSearch,
    setFilter,
    getFilteredTours,
    isValid,
  } = useTourStore();

  const filteredTours = getFilteredTours(countries);
  const validCountry = isValid(countries);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">Explore Our Tours</h2>
          <p className="text-lg text-gray-600">Discover amazing destinations around the world</p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <div className="max-w-2xl mx-auto">
            <div className="mb-6">
              <input
                value={search}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setSearch(e.target.value)
                }
                type="text"
                placeholder="Search by city or country..."
                className="w-full border-2 border-gray-300 rounded-lg p-3 focus:border-chart-5 focus:outline-none transition"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-3 justify-center flex-wrap">
              <button
                className="bg-chart-2 hover:bg-chart-3 text-white px-6 py-2 rounded-lg font-semibold transition duration-200"
                onClick={() => setFilter("all")}
              >
                All Tours
              </button>
              <button
                className="bg-chart-2 hover:bg-chart-3 text-white px-6 py-2 rounded-lg font-semibold transition duration-200"
                onClick={() => setFilter("city")}
              >
                Search by City
              </button>
              <button
                className="bg-chart-2 hover:bg-chart-3 text-white px-6 py-2 rounded-lg font-semibold transition duration-200"
                onClick={() => setFilter("country")}
              >
                Search by Country
              </button>
            </div>
          </div>
        </div>

        {/* Error Messages */}
        <div className="mb-8">
          {search && !validCountry && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg text-center">
              "{search}" is not a valid country or city
            </div>
          )}

          {search && validCountry && filteredTours.length === 0 && (
            <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-6 py-4 rounded-lg text-center">
              Sorry, no tours available for "{search}" at the moment
            </div>
          )}
        </div>

        {/* Tours Grid */}
        {filteredTours.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        ) : (
          !search && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No tours found</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Tours;

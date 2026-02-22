import { useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
import TourCard from "../components/TourCard";
import testimonials from "../data/testimonials";
import tours from "../data/tours";

const Home = () => {
  const navigate = useNavigate();
  const featuredTours = tours.slice(0, 5);

  return (
    <>
      <Hero />

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Galaxy Tours?</h2>
            <p className="text-lg text-gray-600">
              We're committed to making your travel dreams a reality with exceptional service and unforgettable experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 text-center">
              <div className="text-4xl mb-4">✈️</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Expert Itineraries</h3>
              <p className="text-gray-600 text-sm">Expertly crafted itineraries designed by seasoned travel professionals</p>
            </div>

            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 text-center">
              <div className="text-4xl mb-4">⭐</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Outstanding Service</h3>
              <p className="text-gray-600 text-sm">Exceptional customer service that goes above and beyond expectations</p>
            </div>

            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 text-center">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Unforgettable Memories</h3>
              <p className="text-gray-600 text-sm">Create unforgettable travel experiences you'll cherish forever</p>
            </div>

            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 text-center">
              <div className="text-4xl mb-4">💡</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Local Insights</h3>
              <p className="text-gray-600 text-sm">Get local insights and insider tips from expert guides</p>
            </div>

            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 text-center">
              <div className="text-4xl mb-4">🛟</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">24/7 Support</h3>
              <p className="text-gray-600 text-sm">Round-the-clock customer support whenever you need us</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tours Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Tours & Experiences</h2>
            <p className="text-lg text-gray-600">
              Explore our handpicked selection of incredible destinations around the world.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {featuredTours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>

          <div className="flex justify-center">
            <button 
              onClick={() => navigate("/tours")}
              className="bg-chart-2 hover:bg-chart-3 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200"
            >
              View All Tours →
            </button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600">
              Booking your dream vacation is easy. Follow these simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="relative">
              <div className="bg-chart-5 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-lg">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Browse Tours</h3>
              <p className="text-gray-600 text-center text-sm">
                Explore our extensive catalog of tour packages and destinations.
              </p>
              {/* Connector Line */}
              <div className="hidden md:block absolute top-8 left-1/2 w-full h-1 bg-chart-5 opacity-30 -translate-y-1/2 z-0"></div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="bg-chart-5 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-lg">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Select & Customize</h3>
              <p className="text-gray-600 text-center text-sm">
                Choose your desired tour and customize it according to your preferences.
              </p>
              {/* Connector Line */}
              <div className="hidden md:block absolute top-8 left-1/2 w-full h-1 bg-chart-5 opacity-30 -translate-y-1/2 z-0"></div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="bg-chart-5 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-lg">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Book & Pay</h3>
              <p className="text-gray-600 text-center text-sm">
                Complete your booking and make secure payment through our platform.
              </p>
              {/* Connector Line */}
              <div className="hidden md:block absolute top-8 left-1/2 w-full h-1 bg-chart-5 opacity-30 -translate-y-1/2 z-0"></div>
            </div>

            {/* Step 4 */}
            <div>
              <div className="bg-chart-5 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-lg">
                4
              </div>
              <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Enjoy & Explore</h3>
              <p className="text-gray-600 text-center text-sm">
                Embark on your adventure and create unforgettable memories.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Travelers Say</h2>
            <p className="text-lg text-gray-600">
              Real experiences from real travelers who have explored the world with us.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-linear-to-br from-gray-50 to-gray-100 rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
              >
                {/* Stars */}
                <div className="text-chart-5 text-xl mb-4">⭐⭐⭐⭐</div>

                {/* Testimonial Text */}
                <p className="text-gray-700 italic mb-6">
                  "{testimonial.text}"
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-chart-5"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">Verified Traveler</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;

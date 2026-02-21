import Hero from "../components/Hero";
import testimonials from "../data/testimonials";
const Home = () => {
  return (
    <>
      <Hero />
      <br />
      <div>
        <h2 className="text-3xl font-bold">Why choose us</h2>
        <ul>
          <li>Expertly crafted itineraries</li>
          <li>Exceptional customer service</li>
          <li>Unforgettable travel experiences</li>
          <li>Local insights and insider tips</li>
          <li>24/7 customer support</li>
        </ul>
      </div>

      <div>
        <h2>Feature Tours/Experiences</h2>
        <div>
          <p>Item 1</p>
          <p>Item 2</p>
          <p>Item 3</p>
          <p>Item 4</p>
        </div>
      </div>

      <br />
      <div>
        <h2 className="text-xl font-bold">How It Works Section</h2>
      </div>

      <br />
      <div>
        <h2 className="text-xl font-bold">Testimonials</h2>
        {testimonials.map((testimonial, index) => (
          <div key={index}>
            <p>— {testimonial.name}</p>
            <img src={testimonial.image} alt={testimonial.name} className="w-16 h-16 rounded-full object-cover" />
            <p>{testimonial.text}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;

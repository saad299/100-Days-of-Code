import tours from "../data/tours";

const Destinations = () => {
  return (
    <div id="destinations">
      <h2 className="text-3xl font-bold">Destinations</h2>
        {tours.map((tour) => (
          <div key={tour.id}>
            <h3>{tour.title}</h3>
            <p>{tour.name}</p>
            <p>{tour.destination}</p>
            <p>{tour.rating}</p>
            <p>{tour.info}</p>
            <p>{tour.maxGroupSize}</p>
            <p>{tour.price}</p>
          </div>
        ))}
    </div>
  );
};

export default Destinations;

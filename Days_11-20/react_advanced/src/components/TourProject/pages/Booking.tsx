import BookingForm from "../components/BookingForm";

const Booking = () => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">
        Book your next adventure with us! Fill out the form below to get started on planning your dream tour. Our team will be in touch to help you customize your itinerary and make your travel dreams a reality.
      </h2>
      <BookingForm />
    </div>
  );
};

export default Booking;

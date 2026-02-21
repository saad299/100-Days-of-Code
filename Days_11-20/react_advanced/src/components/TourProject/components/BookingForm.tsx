import { useState, type ChangeEvent, type FormEvent } from "react";

interface FormData {
  name: string;
  email: string;
  tour: string;
}

const BookingForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    tour: "",
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(
      `Thank you for booking the ${formData.tour} tour, ${formData.name}! We will contact you at ${formData.email} with more details.`,
    );
    console.log(formData);
  };

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
        />
        <label htmlFor="tour">Select Tour:</label>
        <select
          id="tour"
          name="tour"
          value={formData.tour}
          onChange={handleChange}
        >
          <option value="paris">Paris, France</option>
          <option value="rome">Rome, Italy</option>
          <option value="ireland">Ireland</option>
          <option value="salzburg-vienna">Salzburg & Vienna</option>
          <option value="poland">Poland</option>
          <option value="lisbon">Lisbon, Portugal</option>
          <option value="amsterdam">Amsterdam, Netherlands</option>
          <option value="barcelona">Barcelona, Spain</option>
          <option value="bali">Bali, Indonesia</option>
          <option value="newyork">New York, USA</option>
        </select>
        <button type="submit">Book Now</button>
      </form>
    </div>
  );
};

export default BookingForm;

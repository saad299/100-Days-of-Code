import { useState } from "react";

const FormHandling = () => {
  const [form, setForm] = useState({
    name: "",
    password: "",
    confirmPassword: "",
  });
  const [submitted, setSubmitted] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(() => ({
      ...form,
      [name]: value,
    }));
  }
  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(form);
    alert(`${form.name}, The form has been submitted`);
    setForm({ name: "", password: "", confirmPassword: "" });
  }

  return (
    <div>
      <h2 className="text-center">Day8: Form Handling in React</h2>
      <br />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 justify-center items-center"
      >
        <input
          type="text"
          placeholder="Enter the name"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="border border-amber-800 rounded-xl p-1"
        ></input>
        <input
          type="password"
          placeholder="Enter the password"
          name="password"
          value={form.password}
          onChange={handleChange}
          className="border border-amber-800 rounded-xl p-1"
        ></input>
        <input
          type="password"
          placeholder="Confirm the password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          className="border border-amber-800 rounded-xl p-1"
        ></input>
        <button type="submit">Submit</button>
      </form>
      <div className="text-center">
        <h2 className="text-2xl font-bold text-blue-700">
          Details as they are being typed
        </h2>
        <p>Name: {form.name}</p>
        <p>Password: {form.password}</p>
        <p>Confirm Password: {form.confirmPassword}</p>
      </div>
      <br />
      {submitted && (
        <div className="text-center">
          <h2 className="text-3xl font-bold text-emerald-600 text-left">
            Details after the form has been submitted.
          </h2>
          <h2 className="text-3xl font-bold text-emerald-600 text-left">
            They will only be shown after the form has been submitted
          </h2>
          <p>Name: {submitted.name}</p>
          <p>Password: {submitted.password}</p>
          <p>Confirm Password: {submitted.confirmPassword}</p>
        </div>
      )}
    </div>
  );
};

export default FormHandling;

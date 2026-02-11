import { useState } from "react";
import { useContext } from "react";
import { ThemeContext } from "./context/context";

const FormHandling = () => {
  const value = useContext(ThemeContext)
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

    // if (name === "email" && !value.includes("@")) {
    //   setError("Invalid email");
    // }

    // if (name === "password" && value.length < 8) {
    //   setError("Password too short");
    // }

    // if (name === "password" && !/[!@#$%]/.test(value)) {
    //   setError("Need special character");
    // }

    // This is how we can add color and other styling in console.log
    console.log(
      `%cThis is value getting typed: ${value}`,
      "color: yellow; font-size: 10px; font-weight: bold;",
    );
    console.log(
      `%cThis is Name getting typed: ${form.name}`,
      "color: red; font-size: 10px; font-weight: bold;",
    );
    console.log(
      `%cThis is Password getting typed: ${form.password}`,
      "color: pink; font-size: 10px; font-weight: bold;",
    );
    console.log(
      `%cThis is Confirm Password getting typed: ${form.confirmPassword}`,
      "font-size: 10px; font-weight: bold;",
    );
  }
  function handleSubmit(e) {
    e.preventDefault();
    console.log("This is the form you typed: ", form);
    setSubmitted(form);
    alert(`${form.name}, The form has been submitted`);
    setForm({ name: "", password: "", confirmPassword: "" });
  }

  const light = {
    background: "white",
    textColor: "black",    
  }
  const dark = {
    background: "gray",
    textColor: "white",
  }
  return (
    <div>
      <h2 className="text-center text-3xl font-bold">Day8: Form Handling in React(JSX)</h2>
      <h2>This is from: {value.theme}</h2>
      <button onClick={() => value.setTheme(value.theme === dark ? dark : light)}>
        Toggle Theme
      </button>
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
        />
        <input
          type="password"
          placeholder="Enter the password"
          name="password"
          value={form.password}
          onChange={handleChange}
          className="border border-amber-800 rounded-xl p-1"
        />
        <p>Strength: {form.password.length > 8 ? "Strong" : "Weak"}</p>
        <input
          type="password"
          placeholder="Confirm the password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          className="border border-amber-800 rounded-xl p-1"
        />
        <p>Strength: {form.password.length > 8 ? "Strong" : "Weak"}</p>
        <button
          type="submit"
          className="border border-amber-300 rounded-xl p-1 m-1 bg-green-700 text-yellow-500 cursor-pointer"
        >
          Submit
        </button>
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

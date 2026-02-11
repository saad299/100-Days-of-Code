import { useState } from "react";
import FormHandling from "../components/FormHandling";

const Counter = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");

  const handleInputChange = (e) => {
    setName(e.target.value);
  };

  return (
    <div>
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Day1: Counter Component</h1>
        <p className="text-3xl font-extrabold text-amber-500">Count: {count}</p>
        <button onClick={() => setCount(count + 1)}>Increase</button>
        <button onClick={() => setCount(0)}>Reset</button>
        <button onClick={() => setCount(count - 1)}>Decrease</button>
      </div>
      <div className="text-center">
        <h2>onChange example</h2>
        <input type="text" value={name} onChange={handleInputChange} className="border-2 rounded-lg border-amber-600"/>
        <p>The text is: {name}</p>
      </div>
      <FormHandling />
    </div>
  );
};

export default Counter;

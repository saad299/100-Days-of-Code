import { useEffect, useState } from "react";

const Effect = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // This effect runs when the component mounts
    console.log("Effect component mounted. It will run only once.");
  }, []); // Empty dependency array means this effect runs once on mount

  useEffect(() => {
    // This effect runs when the count changes
    console.log("It will run every time something changes or on every render");
  });

  useEffect(() => {
    // This effect runs when the count changes
    console.log("It will run when the state of the count changes");
    // console.log(count);
    
  }, [count]);

  return (
    <div>
      <div className="text-center">
        <h2 className="text-3xl font-bold underline text-emerald-800">
          Day 4: useEffect Basics
        </h2>
        <p>
          This component demonstrates the basic usage of useEffect in React.
        </p>
        <p>
          useEffect is a hook that allows you to perform side effects in a
          component.
        </p>
        <p>
          useEffect is called when the component mounts and when the component
          updates.
        </p>
        <p>useEffect is called after the render method.</p>
        <p>useEffect is called before the render method.</p>
        <div className="mt-4 bg-sky-400 border-2 border-sky-400 p-4 rounded">
          <p>There are three types of ways we can use useEffect:</p>
          <ol className="list-decimal list-inside text-left">
            <li>
              useEffect without an empty dependency array runs once on mount
            </li>
            <li>
              useEffect with a dependency array runs when the specified
              dependencies change
            </li>
            <li>useEffect with a dependency array runs on every render</li>
          </ol>
        </div>
        <pre className="bg-gray-500 p-4 rounded text-left">
          {`// useEffect with an empty dependency array runs once on mount
          useEffect(() => {
        // This effect runs when the component mounts
        console.log("Effect component mounted");
    }, []); // Empty dependency array means this effect runs once on mount`}
        </pre>
        <pre className="bg-gray-300 p-4 rounded text-left">
          {`// useEffect with an empty dependency array runs once on mount
          useEffect(() => {
        // This effect runs when the component mounts
        console.log("Effect component mounted");
    }); // No dependency array means this effect runs on every render`}
        </pre>
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">Counter Component</h1>
          <p className="text-3xl font-extrabold text-amber-700">
            Count: {count}
          </p>
          <button onClick={() => setCount(count + 1)}>Increase</button>
          <button onClick={() => setCount(0)}>Reset</button>
          <button onClick={() => setCount(count - 1)}>Decrease</button>
        </div>
        <p>The above counter component triggers the empty dependency array useEffect and the dependency array containing count useEffect</p>
        <pre className="bg-gray-500 p-4 rounded text-left">
          {`// useEffect with an empty dependency array runs once on mount
          useEffect(() => {
        // This effect runs when the counter component gets changed or it gets mounted
        console.log("Effect component mounted");
    }, [count]); // This will run only when the count state changes`}
        </pre>
        <div className="bg-red-300">
            <p>Avoid using useEffect with no dependency array as it will run on every render</p>
        </div>
      </div>
    </div>
  );
};

export default Effect;

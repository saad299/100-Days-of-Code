const State = () => {
  return (
    <div>
      <div className="text-center">
        <h1 className="text-3xl font-bold">Day2: useState Basics</h1>
        <p>Understanding React state management with useState hook.</p>
        <br />
        <p>The program in Counter.jsx uses useState hook to manage state.</p>
        <p>The increment and decrement buttons increase and decrease the state of the count.</p>
        <p>So if the count is 0, pressing the increment button will increase the count to 1.</p>
        <br />
        <blockquote className="italic">The useState hook returns an array with two values: the current state and a function to update the state.</blockquote>
        <p>
          <a href="https://react.dev/reference/react/useState" target="_blank">React Docs</a>
        </p>
      </div>
    </div>
  );
};

export default State;
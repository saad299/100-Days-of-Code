const StateManagement = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-red-400 bg-green-500">
        Day11: State Management
      </h1>
      <p>
        State Management is the process and technique of maintaining and
        managing states in a component.
      </p>
      <ul>
        <h2>Workflow</h2>
        <li>Start simple with useState for local component needs.</li>
        <li>
          Lift state up to the common parent if nearby components need the same
          data.
        </li>
        <li>
          Use Context API for lightweight, application-wide data that doesn't
          change often (like user authentication or themes).
        </li>
        <li>
          Consider libraries like Zustand or Redux for large, complex
          applications with substantial global state requirements.
        </li>
        <li>
          Use a dedicated library like React Query for managing server data
          efficiently.
        </li>
      </ul>

      <h2>Day12: Zustand</h2>
      <p>Zustand is a small, fast, and secure state manager for React.</p>
      <p>
        At the glance, it looks very similar to custom hook and Context API.
      </p>
      <p>
        It lets use create a container called <code>store</code>. In the store,
        we can add all the necessary states that will be needed throughout the
        application.
      </p>
    </div>
  );
};

export default StateManagement;

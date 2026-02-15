const StateManagement = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold">
        Day11: State Management
      </h1>
      <p>
        State Management is the process and technique of maintaining and
        managing states in a component.
      </p>
      <p>There are two types of states in React.</p>
      <ul>
        <li>Client side State</li>
        <li>Server side State</li>
      </ul>

      <h2 className="text-3xl font-bold">Workflow</h2>
      <ul>
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

      <h2 className="text-3xl font-bold">Day12: Zustand</h2>
      <p>Zustand is a small, fast, and secure state manager for React.</p>
      <p>
        At the glance, it looks very similar to custom hook and Context API.
      </p>
      <p>
        It lets use create a container called <code>store</code>. In the store,
        we can add all the necessary states that will be needed throughout the
        application.
      </p>
      <p>It's working is very similar to Context API, except that it doesn't require context wrappers.</p>

      <h2 className="text-3xl font-bold">Day13: Tanstack Query</h2>
      <p>
        TanStack Query (formerly React Query) is a powerful data fetching and
        state management library for React applications.
      </p>
      <p>It is used to manage server state.</p>
      <p>
        Server state is basically a state that is coming from the server (APIs).
      </p>
      <p>For managing a state that is coming from the server, Tanstack Query(formely React Query) is preferably used.</p>

      <h2 className="text-3xl font-bold">Day14: Pagination + Infinite Scroll</h2>
    </div>
  );
};

export default StateManagement;

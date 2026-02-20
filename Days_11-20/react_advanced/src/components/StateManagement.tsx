import FileUpload from "./FileUpload";

const StateManagement = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold">Day11: State Management</h1>
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
      <br />
      <h2 className="text-3xl font-bold text-amber-700">Day12: Zustand</h2>
      <p>Zustand is a small, fast, and secure state manager for React.</p>
      <p>
        At the glance, it looks very similar to custom hook and Context API.
      </p>
      <p>
        It lets use create a container called <code>store</code>. In the store,
        we can add all the necessary states that will be needed throughout the
        application.
      </p>
      <p>
        It's working is very similar to Context API, except that it doesn't
        require context wrappers.
      </p>
      <br />
      <h2 className="text-3xl font-bold text-sky-800">Day13: Tanstack Query</h2>
      <p>
        TanStack Query (formerly React Query) is a powerful data fetching and
        state management library for React applications.
      </p>
      <p>It is used to manage server state.</p>
      <p>
        Server state is basically a state that is coming from the server (APIs).
      </p>
      <p>
        For managing a state that is coming from the server, TanStack Query is
        preferably used.
      </p>
      <br />
      <h2 className="text-3xl font-bold">
        Day14: Pagination + Infinite Scroll
      </h2>
      <p>
        It is the technique of loading more data when the user scrolls down the
        page.
      </p>
      <p>
        Either by <code>Pagination</code> where we load more data when the user
        clicks on the page number, or by <code>Infinite Scroll</code> where we
        load more data when the user scrolls down the page.
      </p>
      <br />
      <h2 className="text-3xl font-bold text-purple-700">
        Day15: React Router
      </h2>
      <p>React Router is a library for routing in React.</p>
      <p>
        It is used to navigate between different pages in a React application.
      </p>
      <p>There are two approaches to use React Router.</p>
      <ol>
        <li>Component Based Routing</li>
        <li>Data Based Routing</li>
      </ol>
      <p>Component Based Routing is the most common but old approach.</p>
      <p>
        Data Based Routing is the new and modern approach introduced in React
        Router v6.4+.
      </p>
      <h2 className="text-3xl font-bold text-green-700">
        Day17: Forms with libraries
      </h2>
      <p>There are many libraries for handling forms in React.</p>
      <p>Some of the popular libraries are:</p>
      <ul>
        <li>Formik</li>
        <li>React Hook Form</li>
        <li>Final Form</li>
        <li>Zod/Yup</li>
      </ul>
      <p>
        These libraries provide a lot of features for handling forms in React.
      </p>
      <p>They provide features like validation, error handling, and more.</p>

      <FileUpload />
    </div>
  );
};

export default StateManagement;

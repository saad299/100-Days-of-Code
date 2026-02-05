const ListRendering = () => {
  const colors = ["red", "green", "blue", "yellow", "orange", "purple", "pink", "cyan", "magenta", "lime", "teal", "indigo", "violet"];
  const users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
  ];
    const isLoggedIn = false;
    const handleLogin = () => {
      console.log("Login clicked");
    };
    const handleLogout = () => {
      console.log("Logout clicked");
    };
  
  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold underline text-emerald-800">
        Day 3: Rendering List + Conditional Rendering
      </h2>
      <p>
        This component demonstrates list rendering and conditional rendering in
        React.
      </p>
      <br />
      <p>In the Counter component, we used useState to manage state.</p>
      <p>
        Now, we will see how to render lists and conditionally render elements
        based on state or props.
      </p>
      <br />
      <p className="text-2xl font-bold">List rendering:</p>
      <p>
        List rendering is typically done using the map() function to iterate
        over an array and return a list of elements.
      </p>
      <p>
        Conditional rendering can be achieved using JavaScript conditional
        statements like if-else or ternary operators within the JSX.
      </p>
      <br />
      <p>
        For example, if we have an array of colors, we can use map() to render a
        list of color boxes:
      </p>
      <pre className="bg-gray-300 p-4 rounded text-left">
        {`const colors = ['red', 'green', 'blue'];
return (
  <div>
    {colors.map((color) => (
    <div
        key={color}
        style={{
            backgroundColor: color,
            width: '100px',
            height: '100px',
            margin: '10px',
        }}
    ></div>
    ))}
  </div>
);`}
      </pre>
      <p>This gives us a list of color boxes.</p>
      <div>
        {colors.map((color) => (
          <div
            key={color}
            style={{
              backgroundColor: color,
              width: "100px",
              height: "100px",
              margin: "10px",
            }}
          ></div>
        ))}
      </div>
      <p>
        And if we have a list of users, we can use map() to render a list of
        user cards:
      </p>
      <pre className="bg-gray-300 p-4 rounded text-left">
        {`const users = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
return (
  <div>
    {users.map((user) => (
      <div key={user.id}>
        <h2>{user.name}</h2>
        <p>User ID: {user.id}</p>
      </div>
    ))}
  </div>
);`}
      </pre>
      <p>This gives us a list of user cards.</p>
      <div className="text-left text-3xl">
        {users.map((user) => (
          <div key={user.id}>
            <h2>{user.name}</h2>
            <p>User ID: {user.id}</p>
          </div>
        ))}
      </div>
      <p>
        In this example, we use map() to iterate over the colors array and
        render a color box for each color. We also use map() to iterate over the
        users array and render a user card for each user.
      </p>
      <br />
      <p className="text-2xl font-bold">Conditional Rendering</p>
        <p>
          Conditional rendering is done using JavaScript conditional statements
          like if-else or ternary operators within the JSX.
        </p>
        <p>
          For example, if we have a variable called isLoggedIn, we can use it to
          conditionally render a login button or a logout button:
        </p>
        <pre className="bg-gray-300 p-4 rounded text-left">
          {`const isLoggedIn = true;
return (
  <div>
    {isLoggedIn ? (
      <button onClick={handleLogout}>Logout</button>
    ) : (
      <button onClick={handleLogin}>Login</button>
    )}
  </div>
);`}
        </pre>
        <p>This gives us a login button if the user is not logged in, and a logout button if they are logged in.</p>
        <div>
          {isLoggedIn ? (
            <button onClick={handleLogout} className="bg-red-600 text-2xl font-bold p-2 rounded-2xl">Logout</button>
          ) : (
            <button onClick={handleLogin} className="bg-green-600 text-2xl font-bold p-2 rounded-2xl">Login</button>
          )}
        </div>
    </div>
  );
};

export default ListRendering;

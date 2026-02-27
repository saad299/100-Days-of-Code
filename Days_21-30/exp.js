// day 24: express

const express = require("express");
// use when we would want to use some file like HTML file to display
// const path = require("path")
const exp_app = express();
// It is a built-in middleware in Express that parses incoming requests with a JSON
exp_app.use(express.json())




// Exercise 1: Create a simple Express server that listens on port 3000. The server should have the following routes:
// - GET /home: Respond with a welcome message.
// - GET /about: Respond with a brief description about yourself or your project.
// - GET /contact: Respond with your contact information (email, phone number, etc.).
// exp_app.get('/home', (_, res) => {
//     // for displaying html file
//      res.sendFile(path.join(__dirname, "index.html"))

//      // for displaying html elements
// //   res.send('<h1>Hello World!</h1>');
// });

// exp_app.get('/about', (_, res) => {
//     res.send("<h1>About Us page</h1>")
// })

// exp_app.get('/contact', (_, res) => {
//     res.send("<h1>Contact Us page</h1>")
// })

// // to catch error if page is not found
// exp_app.use((_, res) => {
//   res.status(404).send('<h1 style="color: red;">404 - Page Not Found</h1>');
// });





// Exercise 2: Create a new route /users/:id that accepts GET requests. The server should respond with a message that includes the user id from the URL parameter. For example, if a user accesses /users/123, the response should be "User id is: 123". Also, create another route /search that accepts GET requests with a query parameter q. The server should respond with a message that includes the search query. For example, if a user accesses /search?q=express, the response should be "You searched for: express".
// req.params: when user requests some id from the search bar
// exp_app.get('/users/:id', (req, res) => {
//     res.send(`User id is: ${req.params.id}`)
// })

// // req.query: when user searches for 'search?q=something' in the search bar
// exp_app.get('/search', (req, res) => {
//     res.send(`You searched for: ${req.query.q}`);
// })





// Exercise 3: Create a new route /users that accepts POST requests. The request body should contain a user's name and age. The server should respond with a JSON object confirming the user creation and echoing back the user details.
// to run this, go to body tab in postman, select raw, change the format dropdown from Text to JSON and write the following JSON:
// {
//     "name": "Ali",
//     "age": 30
// }
// exp_app.post('/users', (req, res) => {
//     const {name, age} = req.body;
//     res.status(201).json({
//         message: "User created",
//         user: {name, age}
//     })
// })




// Exercise 4: Create a new route /products that accepts POST requests. The request body should contain a product name and price. The server should respond with a JSON object confirming the product creation and echoing back the product details.
// Middleware 1 - Logger
// exp_app.use((req, res, next) => {
//   console.log(`New request: ${req.method} ${req.url}`);
//   next();
// });

// // Middleware 2 - Age check
// function checkAge(req, res, next) {
//   const age = req.headers.age;
//   if (age && age >= 18) {
//     next();
//   } else {
//     res.status(403).send('Access denied. Must be 18+');
//   }
// }

// exp_app.get('/home', (_, res) => res.send('Welcome Home!'));

// exp_app.get('/adults-only', checkAge, (_, res) => {
//   res.send('<h1>Welcome to the OnlyFans page!</h1>');
// });





// Exercise 5: Hardcoded REST API
let users = [
    {id: 1, name: "John"},
    {id: 2, name: "Saad"},
]

// returns all users (send the GET request on the link)
exp_app.get('/users', (_, res) => {
  res.json(users);
});

// Get user by id (send the GET request on the link and mentioning id number at last)
exp_app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
});

// // Create user (write JSON in the body then POST request the link)
exp_app.post('/users', (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name
  };
  users.push(newUser);
  res.status(201).json({ message: 'User created', user: newUser });
});

// // Delete user (send the DELETE request on the link and mentioning id number at last)
exp_app.delete('/users/:id', (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'User not found' });
  users.splice(index, 1);
  res.json({ message: 'User deleted' });
});

// Day 25: Middleware
// It is a function that takes 3 arguments(request, response and next)
// The following is an example of middleware.
// Middleware 1 checks the request method and the url
// Middleware 2 checks the age inputted in the headers. If less than 18, it denies access
// Then in 'exp_app.get('/adults-only', checkAge, (_, res)', it uses 'checkAge' middleware
// to show the 'adults-only' page if the age inputted in the headers is greater than 18.
// Middleware 1 - Logger
// exp_app.use((req, res, next) => {
//   console.log(`New request: ${req.method} ${req.url}`);
//   next();
// });

// // Middleware 2 - Age check
// function checkAge(req, res, next) {
//   const age = req.headers.age;
//   if (age && age >= 18) {
//     next();
//   } else {
//     res.status(403).send('Access denied. Must be 18+');
//   }
// }

// exp_app.get('/home', (_, res) => res.send('Welcome Home!'));

// exp_app.get('/adults-only', checkAge, (_, res) => {
//   res.send('<h1>Welcome to the OnlyFans page!</h1>');
// });

exp_app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
})
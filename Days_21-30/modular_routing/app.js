// Day 26: Modular Routing

const express = require('express');
const app = express();

// accepts incoming data as JSON
app.use(express.json())



// app.get('/', (req, res) => {
//   res.send('<h1>Hello from Express!</h1> <p>This is a paragraph from Express</p>');
//   // res.send(index.html)
// });

// app.get('/about', (req, res) => {
//   res.send('<h1>This is the About page</h1>');
// });



const logger = require('./middleware/logger.middleware');
app.use(logger); // runs on every single request

// import routes
const userRoutes = require("./routes/user.routes")
const todoRoutes = require("./routes/todo.routes")

// use those routes
app.use('/users', userRoutes)
app.use('/todos', todoRoutes)

app.listen(1, () => {
  console.log('Server running at http://localhost:1');
});
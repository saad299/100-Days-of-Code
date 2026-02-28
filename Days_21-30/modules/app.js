// Day 26: Modular Routing

const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('<h1>Hello from Express!</h1> <p>This is a paragraph from Express</p>');
  // res.send(index.html)
});

app.get('/about', (req, res) => {
  res.send('<h1>This is the About page</h1>');
});

app.listen(1, () => {
  console.log('Server running at http://localhost:1');
});
 // Day 21 and 22: Intro to backend, node.js and npm

// const fs = require('fs');

// // Write a file
// fs.writeFileSync('hello.txt', 'Hello! This file was created by Node.js');

// console.log('File created!');

// // Read the file back
// const content = fs.readFileSync('hello.txt', 'utf8');
// console.log('File content:', content);

// const path = require('path');
// const os = require('os');

// // path examples
// const filePath = '/users/ali/documents/file.txt';
// console.log(path.basename(filePath));    // file.txt
// console.log(path.dirname(filePath));     // /users/ali/documents
// console.log(path.extname(filePath));     // .txt

// // os examples
// console.log(os.platform());     // win32 or linux or darwin
// console.log(os.hostname());     // your computer name
// console.log(os.freemem());      // free memory in bytes

// const http = require('http');

// const server = http.createServer((req, res) => {
//   res.write('Hello! This is my first Node server!');
//   res.end();
// });

// server.listen(3000, () => {
//   console.log('Server is running at http://localhost:3000');
// });

// Day 23: Intro to Express js
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
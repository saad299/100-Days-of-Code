const express = require('express');
const app = express();

app.use(express.json())

const logger = require("./middleware/logger.middleware")
app.use(logger)

const booksRoutes = require("./routes/books.routes")
const memberRoutes = require("./routes/members.routes")
const borrrowsRoutes = require("./routes/borrows.routes")

app.use('/books', booksRoutes)
app.use('/members', memberRoutes)
app.use('/borrows', borrrowsRoutes)


app.listen(1, () => {
  console.log('Server running at http://localhost:1');
});
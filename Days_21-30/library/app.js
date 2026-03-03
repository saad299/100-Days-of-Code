const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

const logger = require("./middleware/logger.middleware");
app.use(logger);

const booksRoutes = require("./routes/books.routes");
const memberRoutes = require("./routes/members.routes");
const borrrowsRoutes = require("./routes/borrows.routes");

app.use('/books', booksRoutes);
app.use('/members', memberRoutes);
app.use('/borrows', borrrowsRoutes);

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
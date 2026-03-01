// logs every incoming request — applied at app level
const logger = (req, _, next) => {
  console.log(`[${new Date()}] ${req.method} ${req.url}`);
  next(); // move on to the next middleware or route
};

module.exports = logger;
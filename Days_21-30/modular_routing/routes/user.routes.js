const router = require('express').Router();
const { getAllUsers, getUserById, createUser } = require('../controllers/user.controller');

// router-level middleware — runs for all /users routes
router.use((req, res, next) => {
  console.log('User route accessed');
  next();
});

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);

module.exports = router;
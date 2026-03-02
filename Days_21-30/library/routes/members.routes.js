const router = require('express').Router();
const {
  getAllMembers, getMemberById, getMemberBorrows, createMember, suspendMember
} = require('../controllers/members.controller');
const auth = require('../middleware/auth.middleware');
const validateMember = require('../middleware/validateMember.middleware');

// router-level auth — ALL member routes are protected
router.use(auth);

router.get('/', getAllMembers);
router.get('/:id', getMemberById);
router.get('/:id/borrows', getMemberBorrows); // borrow history for a member
router.post('/', validateMember, createMember);
router.put('/:id/suspend', suspendMember);

module.exports = router;
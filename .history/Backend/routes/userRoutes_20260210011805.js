const express = require('express');
const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  saveJob,
  unsaveJob,
  getSavedJobs
} = require('../controllers/userController');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

router.use(protect);

router.get('/savedjobs', getSavedJobs);
router.route('/savejob/:jobId')
  .put(saveJob)
  .delete(unsaveJob);

router.route('/')
  .get(authorize('admin'), getUsers);

router.route('/:id')
  .get(getUser)
  .put(authorize('admin'), updateUser)
  .delete(authorize('admin'), deleteUser);

module.exports = router;

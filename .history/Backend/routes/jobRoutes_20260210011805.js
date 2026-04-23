const express = require('express');
const {
  getJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
  applyToJob,
  getMyJobs
} = require('../controllers/jobController');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .get(getJobs)
  .post(protect, authorize('employer', 'admin'), createJob);

router.get('/my/posted', protect, getMyJobs);

router.route('/:id')
  .get(getJob)
  .put(protect, updateJob)
  .delete(protect, deleteJob);

router.post('/:id/apply', protect, applyToJob);

module.exports = router;

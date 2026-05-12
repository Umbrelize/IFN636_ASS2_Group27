const express = require('express');
const router = express.Router();

const { protect } = require('../middleware/authMiddleware');
const { adminOnly } = require('../middleware/roleMiddleware');
const upload = require('../middleware/uploadMiddleware');

const {
  createTicket,
  getMyTickets,
  getMyTicketById,
  getTicketActivity,
  updateMyTicket,
  updateMyTicketStatus,
  deleteMyTicket,
  getAllTickets,
  getAnyTicketById,
  updateAnyTicket,
  updateAnyTicketStatus,
  deleteAnyTicket,
} = require('../controllers/ticketController');

// USER routes
router
  .route('/')
  .post(protect, upload.single('image'), createTicket)
  .get(protect, getMyTickets);

router.get('/:id/activity', protect, getTicketActivity);
router.patch('/:id/status', protect, updateMyTicketStatus);

router
  .route('/:id')
  .get(protect, getMyTicketById)
  .put(protect, upload.single('image'), updateMyTicket)
  .delete(protect, deleteMyTicket);

// ADMIN routes
router.get('/admin/all', protect, adminOnly, getAllTickets);
router.get('/admin/:id', protect, adminOnly, getAnyTicketById);
router.patch('/admin/:id/status', protect, adminOnly, updateAnyTicketStatus);
router.put('/admin/:id', protect, adminOnly, upload.single('image'), updateAnyTicket);
router.delete('/admin/:id', protect, adminOnly, deleteAnyTicket);

module.exports = router;
const express = require('express');
const router = express.Router();

const { protect } = require('../middleware/authMiddleware');
const { adminOnly } = require('../middleware/roleMiddleware');

const {
  createTicket,
  getMyTickets,
  getMyTicketById,
  updateMyTicket,
  deleteMyTicket,
  getAllTickets,
  updateAnyTicket,
  deleteAnyTicket,
} = require('../controllers/ticketController');

// USER routes
router.route('/')
  .post(protect, createTicket)
  .get(protect, getMyTickets);

router.route('/:id')
  .get(protect, getMyTicketById)
  .put(protect, updateMyTicket)
  .delete(protect, deleteMyTicket);

// ADMIN routes
router.get('/admin/all', protect, adminOnly, getAllTickets);
router.put('/admin/:id', protect, adminOnly, updateAnyTicket);
router.delete('/admin/:id', protect, adminOnly, deleteAnyTicket);

module.exports = router;
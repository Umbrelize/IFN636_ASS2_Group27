const mongoose = require('mongoose');

const ticketActivityLogSchema = new mongoose.Schema(
  {
    ticket: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ticket',
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    role: {
      type: String,
      enum: ['user', 'admin', 'system'],
      default: 'system',
    },
    action: {
      type: String,
      required: true,
      trim: true,
    },
    statusFrom: {
      type: String,
      default: '',
    },
    statusTo: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('TicketActivityLog', ticketActivityLogSchema);
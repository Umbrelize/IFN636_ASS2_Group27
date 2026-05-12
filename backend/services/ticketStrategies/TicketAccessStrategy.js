const Ticket = require('../../models/Ticket');

class UserTicketAccessStrategy {
  async getTickets(user) {
    return Ticket.find({ user: user.id }).sort({ createdAt: -1 });
  }

  async getTicketById(ticketId, user) {
    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
      const error = new Error('Ticket not found');
      error.statusCode = 404;
      throw error;
    }

    if (ticket.user.toString() !== user.id) {
      const error = new Error('Access denied');
      error.statusCode = 403;
      throw error;
    }

    return ticket;
  }
}

class AdminTicketAccessStrategy {
  async getTickets() {
    return Ticket.find()
      .populate('user', 'name email role')
      .sort({ createdAt: -1 });
  }

  async getTicketById(ticketId) {
    const ticket = await Ticket.findById(ticketId).populate('user', 'name email role');

    if (!ticket) {
      const error = new Error('Ticket not found');
      error.statusCode = 404;
      throw error;
    }

    return ticket;
  }

  async getEditableTicketById(ticketId) {
    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
      const error = new Error('Ticket not found');
      error.statusCode = 404;
      throw error;
    }

    return ticket;
  }
}

module.exports = {
  UserTicketAccessStrategy,
  AdminTicketAccessStrategy,
};
const BaseObserver = require('./BaseObserver');

class ConsoleLogObserver extends BaseObserver {
  async update(eventName, payload) {
    const ticketId = this.getTicketId(payload) || 'unknown-ticket';

    console.log(`[Ticket Event] ${eventName} | Ticket: ${ticketId}`);
  }
}

module.exports = ConsoleLogObserver;
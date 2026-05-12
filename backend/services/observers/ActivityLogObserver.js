const TicketActivityLog = require('../../models/TicketActivityLog');
const BaseObserver = require('./BaseObserver');

class ActivityLogObserver extends BaseObserver {
  async update(eventName, payload) {
    const ticketId = this.getTicketId(payload);

    if (!ticketId) {
      return;
    }

    await TicketActivityLog.create({
      ticket: ticketId,
      user: this.getUserId(payload),
      role: this.getUserRole(payload),
      action: eventName,
      statusFrom: payload.statusFrom || '',
      statusTo: payload.statusTo || payload.ticket?.status || '',
      description: payload.description || '',
    });
  }
}

module.exports = ActivityLogObserver;
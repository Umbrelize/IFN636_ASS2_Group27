const Notification = require('../../models/Notification');
const User = require('../../models/User');
const BaseObserver = require('./BaseObserver');

class NotificationObserver extends BaseObserver {
  async update(eventName, payload) {
    if (eventName === 'ticket.created') {
      await this.notifyAdminsAboutNewTicket(payload);
      return;
    }

    const isAdminClosingTicket =
      (eventName === 'ticket.admin_status_changed' ||
        eventName === 'ticket.admin_updated') &&
      payload.statusTo === 'Closed';

    if (isAdminClosingTicket) {
      await this.notifyUserAboutClosedTicket(payload);
    }
  }

  async notifyAdminsAboutNewTicket(payload) {
    const ticket = payload.ticket;

    if (!ticket?._id) {
      return;
    }

    const admins = await User.find({ role: 'admin' }).select('_id');

    if (!admins.length) {
      return;
    }

    const notifications = admins.map((admin) => ({
      recipient: admin._id,
      ticket: ticket._id,
      title: 'New ticket created',
      message: `A new ticket "${ticket.subject}" has been submitted.`,
      type: 'ticket_created',
    }));

    await Notification.insertMany(notifications);
  }

  async notifyUserAboutClosedTicket(payload) {
    const ticket = payload.ticket;

    if (!ticket?._id || !ticket.user) {
      return;
    }

    await Notification.create({
      recipient: ticket.user,
      ticket: ticket._id,
      title: 'Ticket closed',
      message: `Your ticket "${ticket.subject}" has been closed by IT support.`,
      type: 'ticket_closed',
    });
  }
}

module.exports = NotificationObserver;
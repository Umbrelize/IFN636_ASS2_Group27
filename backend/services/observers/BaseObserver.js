class BaseObserver {
  getTicketId(payload) {
    return payload.ticket?._id || payload.ticketId || null;
  }

  getUserId(payload) {
    return payload.user?._id || payload.user?.id || null;
  }

  getUserRole(payload) {
    return payload.user?.role || 'system';
  }
}

module.exports = BaseObserver;
class BaseTicketState {
  constructor(name, allowedNextStatuses) {
    this.name = name;
    this.allowedNextStatuses = allowedNextStatuses;
  }

  canMoveTo(nextStatus) {
    return this.allowedNextStatuses.includes(nextStatus);
  }

  apply(ticket, nextStatus) {
    if (!this.canMoveTo(nextStatus)) {
      const error = new Error(`Cannot change ticket status from ${this.name} to ${nextStatus}`);
      error.statusCode = 400;
      throw error;
    }

    ticket.status = nextStatus;
    return ticket;
  }
}

class TicketStatusContext {
  constructor() {
    this.states = {
      Open: new BaseTicketState('Open', ['Open', 'In Progress', 'Resolved', 'Closed']),
      'In Progress': new BaseTicketState('In Progress', [
        'Open',
        'In Progress',
        'Resolved',
        'Closed',
      ]),
      Resolved: new BaseTicketState('Resolved', ['In Progress', 'Resolved', 'Closed']),
      Closed: new BaseTicketState('Closed', ['Open', 'Closed']),
    };
  }

  changeStatus(ticket, nextStatus) {
    if (!nextStatus) {
      const error = new Error('Status is required');
      error.statusCode = 400;
      throw error;
    }

    const currentState = this.states[ticket.status];

    if (!currentState) {
      const error = new Error(`Unknown current ticket status: ${ticket.status}`);
      error.statusCode = 400;
      throw error;
    }

    if (!this.states[nextStatus]) {
      const error = new Error(`Invalid ticket status: ${nextStatus}`);
      error.statusCode = 400;
      throw error;
    }

    return currentState.apply(ticket, nextStatus);
  }
}

module.exports = TicketStatusContext;
class TicketEventManager {
  constructor() {
    this.observers = [];
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  async notify(eventName, payload) {
    for (const observer of this.observers) {
      try {
        await observer.update(eventName, payload);
      } catch (error) {
        console.error(`Observer failed for event ${eventName}:`, error.message);
      }
    }
  }
}

module.exports = TicketEventManager;
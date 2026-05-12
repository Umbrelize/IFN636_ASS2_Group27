class TicketFactory {
  static createTicketData({ user, subject, description, category, priority, image }) {
    TicketFactory.validateRequiredFields({ user, subject, description });

    const safeCategory = TicketFactory.getSafeCategory(category);
    const safePriority = TicketFactory.getSafePriority(priority, safeCategory);

    return {
      user,
      subject,
      description,
      category: safeCategory,
      priority: safePriority,
      image: image || '',
    };
  }

  static validateRequiredFields({ user, subject, description }) {
    if (!user) {
      const error = new Error('User is required');
      error.statusCode = 400;
      throw error;
    }

    if (!subject || !description) {
      const error = new Error('Subject and description are required');
      error.statusCode = 400;
      throw error;
    }
  }

  static getSafeCategory(category) {
    const cleanCategory = String(category || '').trim().replace(/\s+/g, ' ');

    if (!cleanCategory) {
      return 'Other';
    }

    if (cleanCategory.length > 50) {
      return cleanCategory.slice(0, 50);
    }

    return cleanCategory;
  }

  static getSafePriority(priority, category) {
    if (!priority) {
      return TicketFactory.getDefaultPriority(category);
    }

    const normalisedPriority = String(priority).trim().toLowerCase();

    if (normalisedPriority.startsWith('low')) {
      return 'Low';
    }

    if (normalisedPriority.startsWith('medium')) {
      return 'Medium';
    }

    if (normalisedPriority.startsWith('high')) {
      return 'High';
    }

    return TicketFactory.getDefaultPriority(category);
  }

  static getDefaultPriority(category) {
    const defaultPriorities = {
      Hardware: 'High',
      Software: 'Medium',
      Network: 'High',
      Account: 'Medium',
      Other: 'Medium',
    };

    return defaultPriorities[category] || 'Medium';
  }
}

module.exports = TicketFactory;
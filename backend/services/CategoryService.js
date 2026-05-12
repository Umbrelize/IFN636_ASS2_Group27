const Category = require('../models/Category');
const Ticket = require('../models/Ticket');

class CategoryService {
  constructor() {
    this.defaultCategories = [
      { name: 'Hardware', description: 'Device, workstation, printer, or equipment issues' },
      { name: 'Software', description: 'Application errors, installation, or software access' },
      { name: 'Network', description: 'Wi-Fi, internet, VPN, or connectivity issues' },
      { name: 'Account', description: 'Login, password, or access permission issues' },
      { name: 'Other', description: 'General IT support request' },
    ];
  }

  normaliseName(name) {
    return String(name || '').trim().replace(/\s+/g, ' ');
  }

  validateName(name) {
    const cleanName = this.normaliseName(name);

    if (!cleanName) {
      const error = new Error('Category name is required');
      error.statusCode = 400;
      throw error;
    }

    if (cleanName.length > 50) {
      const error = new Error('Category name must be 50 characters or less');
      error.statusCode = 400;
      throw error;
    }

    return cleanName;
  }

  async ensureDefaultCategories() {
    for (const category of this.defaultCategories) {
      await Category.findOneAndUpdate(
        { name: category.name },
        {
          $setOnInsert: {
            name: category.name,
            description: category.description,
            isActive: true,
          },
        },
        { upsert: true, new: true }
      );
    }
  }

  async getActiveCategories() {
    await this.ensureDefaultCategories();

    return Category.find({ isActive: true }).sort({ name: 1 });
  }

  async getAllCategoriesForAdmin() {
    await this.ensureDefaultCategories();

    return Category.find().sort({ name: 1 });
  }

  async createCategory(data, user) {
    const name = this.validateName(data.name);
    const description = String(data.description || '').trim();

    const existingCategory = await Category.findOne({
      name: new RegExp(`^${name}$`, 'i'),
    });

    if (existingCategory) {
      const error = new Error('Category already exists');
      error.statusCode = 400;
      throw error;
    }

    return Category.create({
      name,
      description,
      isActive: true,
      createdBy: user.id,
      updatedBy: user.id,
    });
  }

  async updateCategory(categoryId, data, user) {
    const category = await Category.findById(categoryId);

    if (!category) {
      const error = new Error('Category not found');
      error.statusCode = 404;
      throw error;
    }

    if (data.name !== undefined) {
      const newName = this.validateName(data.name);

      const duplicate = await Category.findOne({
        _id: { $ne: categoryId },
        name: new RegExp(`^${newName}$`, 'i'),
      });

      if (duplicate) {
        const error = new Error('Another category with this name already exists');
        error.statusCode = 400;
        throw error;
      }

      category.name = newName;
    }

    if (data.description !== undefined) {
      category.description = String(data.description || '').trim();
    }

    category.isActive = true;
    category.updatedBy = user.id;

    return category.save();
  }

  async deleteCategory(categoryId) {
    const category = await Category.findById(categoryId);

    if (!category) {
      const error = new Error('Category not found');
      error.statusCode = 404;
      throw error;
    }

    if (category.name === 'Other') {
      const error = new Error('The Other category cannot be deleted');
      error.statusCode = 400;
      throw error;
    }

    await Category.deleteOne({ _id: categoryId });

    return category;
  }

  async getCategoryUsage(categoryName) {
    return Ticket.countDocuments({ category: categoryName });
  }
}

module.exports = new CategoryService();
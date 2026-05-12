const categoryService = require('../services/CategoryService');

const handleError = (res, error) => {
  const statusCode = error.statusCode || 500;
  return res.status(statusCode).json({ message: error.message });
};

const getActiveCategories = async (req, res) => {
  try {
    const categories = await categoryService.getActiveCategories();
    res.status(200).json(categories);
  } catch (error) {
    handleError(res, error);
  }
};

const getAllCategoriesForAdmin = async (req, res) => {
  try {
    const categories = await categoryService.getAllCategoriesForAdmin();

    const categoriesWithUsage = await Promise.all(
      categories.map(async (category) => {
        const usageCount = await categoryService.getCategoryUsage(category.name);

        return {
          ...category.toObject(),
          usageCount,
        };
      })
    );

    res.status(200).json(categoriesWithUsage);
  } catch (error) {
    handleError(res, error);
  }
};

const createCategory = async (req, res) => {
  try {
    const category = await categoryService.createCategory(req.body, req.user);
    res.status(201).json(category);
  } catch (error) {
    handleError(res, error);
  }
};

const updateCategory = async (req, res) => {
  try {
    const category = await categoryService.updateCategory(
      req.params.id,
      req.body,
      req.user
    );

    res.status(200).json(category);
  } catch (error) {
    handleError(res, error);
  }
};

const deleteCategory = async (req, res) => {
  try {
    const category = await categoryService.deleteCategory(req.params.id);

    res.status(200).json({
      message: 'Category deleted successfully',
      category,
    });
  } catch (error) {
    handleError(res, error);
  }
};

module.exports = {
  getActiveCategories,
  getAllCategoriesForAdmin,
  createCategory,
  updateCategory,
  deleteCategory,
};
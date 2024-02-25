const Category = require('../Category/category.model')
//adding a category
const addCategory = async (CategoryData) => {
    try {
      const category = new Category(CategoryData);
      await category.save();
      console.log('Category added successfully');
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };
//extra function
  const getCategoryIdByName = async (categoryName) => {
    try {
      // Query the database for the album with the given name
      const category = await Category.findOne({ name: categoryName });
  
      // If the category exists, return its ID
      if (category) {
        return category._id;
      } else {
        console.error('category not found');
        return null;
      }
    } catch (error) {
      console.error('Error retrieving category ID:', error);
      return null;
    }
  };

  module.exports.addCategory = addCategory;
  
  module.exports.getCategoryIdByName = getCategoryIdByName;
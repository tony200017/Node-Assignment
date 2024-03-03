const Category = require('./category.model')
//adding a category
const addCategory = async (CategoryData) => {
   
      const category = new Category(CategoryData);
      await category.save();
      console.log('Category added successfully');
      return category._id;
   
  };
  //get
  const getCategoryById = async (categoryId) => {
   
    const category = await Category.findById(categoryId);
    if (category) {
      return category;
    } else {
     throw new Error('category not found');
    }
  
};

  module.exports.addCategory = addCategory;
  module.exports.getCategoryById = getCategoryById;
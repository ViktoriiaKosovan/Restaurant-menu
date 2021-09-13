const { Category } = require('../models/models');
const handleError = require('../utils/handleError');


class CategoriesController {
   
    async getCategories(req, res) {
        try {
            const categories = await Category.findAll();
            res.status(200).send({categories });
          
        } catch (error) {
           handleError(error, res, 'Categories not found')
        }
            
        
    }
    
    async createCategory(req, res) {
        try {
            let { category } = req.body;
            let newCategory = await Category.create({ category });
            res.status(201).send(newCategory)
            
        } catch (error) {
            handleError(error, res, 500, 'New category did not create')

        }
     }

    async updateCategory(req, res) {
        try {
            let { id } = req.body;
            let count = await Category.update(req.body.category, { where: { id: id } });
            if (count == 1) {
                res.send({message: "Category was updated successfully."});
            } else {
                res.send({message: `Can not update category with id=${id}.`});
      }
        } catch (error) {
            handleError(error, res, 500, `Error updating category with id=${id}`);
        }
        

    }
}

module.exports = new CategoriesController();
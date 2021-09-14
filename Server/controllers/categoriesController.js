const { Category } = require('../models/models');
const handleError = require('../utils/handleError');


class CategoriesController {
   
    async getCategories(req, res) {
        try {
            const categories = await Category.findAll();
            res.status(200).send({ categories });
        } catch (error) {
           handleError(error, res, 'Categories not found', 404)
        }
            
        
    }
    
    async createCategory(req, res) {
        try {
            let { title } = req.body;
            if (!title) throw Error;
            let newItem = await Category.create({ title });
            res.status(201).send(newItem)
        } catch (error) {
            handleError(error, res, 'New category did not create');
        }
     }

    async updateCategory(req, res) {
        try {
            let { id, title } = req.body;
            if (!id) throw Error;
            await Category.update({title}, { where: { id: id } });
            res.status(200).send({message: "Category was updated successfully."});
        } catch (error) {
            handleError(error, res,  "Can not update category", 409);
        }
    }
}
module.exports = new CategoriesController();
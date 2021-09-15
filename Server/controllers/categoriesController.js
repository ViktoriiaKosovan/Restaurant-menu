const { Category } = require('../models/models');
const { resultCodeSuccess, successMessage } = require('../constants/constants');
const handleError = require('../utils/handleError');


class CategoriesController {
   
    async getCategories(req, res) {
        try {
            let categories=await Category.findAll();
            res.status(200).send({ statusCode: resultCodeSuccess, categories });
        } catch (error) {
            handleError(res, error);
        }
        
    }
    
    
    async createCategory(req, res) {
        try {
            let { title } = req.body;
            if (!title) throw Error;
            await Category.create({ title });
            res.status(201).send({ statusCode: resultCodeSuccess, message: successMessage  })
        } catch (error) {
            handleError(res, error);
        }
     }

    async updateCategory(req, res) {
        try {
            let { id, title } = req.body;
            if (!id) throw Error;
            await Category.update({title}, { where: { id: id } });
            res.status(200).send({statusCode: resultCodeSuccess, message: successMessage });
        } catch (error) {
            handleError(res, error, 409);
        }
    }
}
module.exports = new CategoriesController();
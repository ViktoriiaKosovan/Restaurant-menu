const { Category } = require('../models/models');
const { resultCodeSuccess, successMessage } = require('../constants/constants');
const handleError = require('../utils/handleError');


   
    const getCategories = async (req, res) => {
        try {
            let categories=await Category.findAll();
            res.status(200).send({ statusCode: resultCodeSuccess, categories });
        } catch (error) {
            handleError(res, error);
        }
        
    }
    
    
    const createCategory= async (req, res) => {
        try {
            let { title } = req.body;
            await Category.create({ title });
            res.status(201).send({ statusCode: resultCodeSuccess, message: successMessage  })
        } catch (error) {
            handleError(res, error);
        }
     }

    const updateCategory=async (req, res) => {
        try {
            let { id, title } = req.body;
            await Category.update({title}, { where: { id: id } });
            res.status(200).send({statusCode: resultCodeSuccess, message: successMessage });
        } catch (error) {
            handleError(res, error, 409);
        }
    }

module.exports = {getCategories, createCategory, updateCategory};
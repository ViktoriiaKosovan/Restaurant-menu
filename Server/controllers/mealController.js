const handleError = require('../utils/handleError');
const { Meal } = require('../models/models');
const { resultCodeSuccess, successMessage } = require('../constants/constants');



   const getMealByCategory = async (req, res) =>{
        try {
            const id = req.params.id;
            if (!id) throw Error;
            let mealsByCategory = await Meal.findAll({ where: { categoryId: id } });
            res.status(200).send({  statusCode: resultCodeSuccess, message: successMessage, mealsByCategory });
        } catch (error) {
           handleError(res, error);
        }
    }
    
    const  createMeal = async (req, res) =>{
       try {
           let { img, name, description, weight, price, categoryId } = req.body;
            await Meal.create({ img,name, description, weight, price, categoryId } );
           res.status(201).send({ statusCode: resultCodeSuccess, message: successMessage });
        } catch (error) {
            handleError(res, error);

        }
     }
    
   const updateMeal = async (req, res) => {
        try {
            let { id, img, name, description, weight, price, categoryId } = req.body;
            await Meal.update({ img, name, description, weight, price, categoryId } , { where: { id: id } });
            res.status(200).send({ statusCode: resultCodeSuccess, message: successMessage });
        } catch (error) {
           handleError(res, error, 409);
        }
     }
    
   const deleteMeal = async (req, res) =>{
        try {
            const id = req.params.id;
            if (!id) throw Error;
            await Meal.destroy({ where: { id: id } });
            res.status(200).send({ statusCode: resultCodeSuccess, message: successMessage });
        } catch (error) {
             handleError(res, error);
        }

     }



module.exports = {getMealByCategory, createMeal, updateMeal, deleteMeal};
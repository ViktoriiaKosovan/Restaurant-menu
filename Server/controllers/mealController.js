const handleError = require('../utils/handleError');
const { Meal } = require('../models/models');



class MealController {
    async getMealByCategory(req, res) {
        try {
            const id = req.params.id;
            if (!id) throw Error;
            let mealsByCategory = await Meal.findAll({ where: { categoryId: id } });
            res.status(200).send({ mealsByCategory });
        } catch (error) {
             handleError(error, res, 'Meals not found')
        }
    }
    
     async createMeal(req, res) {
       try {
            let { img,name, description, weight, price, categoryId} = req.body;
            let newMeal = await Meal.create({ img,name, description, weight, price, categoryId } );
            res.status(201).send(newMeal)
            
        } catch (error) {
            handleError(error, res, 'New meal did not create')

        }
     }
    
    async updateMeal(req, res) {
        try {
            let { id, img, name, description, weight, price, categoryId } = req.body;
            if (!id) throw Error;
            await Meal.update({ img, name, description, weight, price, categoryId } , { where: { id: id } });
                res.status(200).send({message: "Meal was updated successfully."});
        } catch (error) {
            handleError(error, res, "Error updating meal", 409);
        }
     }
    
    async deleteMeal(req, res) {
        try {
            const id = req.params.id;
            if (!id) throw Error;
            await Meal.destroy({ where: { id: id } });
            res.status(200).send({ message: "Meal was deleted successfully." });
        } catch (error) {
             handleError(error, res, "Error deleting meal ");
        }

     }

}

module.exports = new MealController();
const handleError = require('../utils/handleError');
const { Meal } = require('../models/models');



class MealController {
    async getMealByCategory(req, res) {
        try {
            const id = req.params.id;
            let mealsByCategory = await Meal.findAll({ where: { categoryId: id } });
            res.status(200).send({ mealsByCategory });
        } catch (error) {
             handleError(error, res, 500, 'Meals not found')
        }
    }
    
     async createMeal(req, res) {
       try {
            let { img,name, description, weight, price, categoryId} = req.body;
         let newMeal = await Meal.create({ img,name, description, weight, price, categoryId } );
            res.status(201).send(newMeal)
            
        } catch (error) {
            handleError(error, res, 500, 'New meal did not create')

        }
     }
    
    async updateMeal(req, res) {
        try {
            let { id, img, name, description, weight, price, categoryId } = req.body;
            if (!id || !img || !name || !description || !weight || !price || !categoryId) {
                res.send({message: "Can not update meal"});
            }
            let count = await Meal.update({ img, name, description, weight, price, categoryId } , { where: { id: id } });
            if (count == 1) {
                res.send({message: "Meal was updated successfully."});
            } else {
                res.send({message: `Can not update meal with id=${id}.`});
      }
        } catch (error) {
            handleError(error, res, 500, `Error updating meal with id=${id}`);
        }
     }
    
    async deleteMeal(req, res) {
        try {
            const id = req.params.id;
            if (!id) {
                res.send({message: "Can not delete meal"});
            }
            let count = await Meal.destroy({ where: { id: id } });
            if (count == 1) {
                res.send({ message: "Meal was deleted successfully." });
            } else {
                res.send({ message: `Can not deleted meal with id=${id}.` });
            }
        } catch (error) {
             handleError(error, res, 500, `Error deleting meal with id=${id}`);
        }

     }

}

module.exports = new MealController();
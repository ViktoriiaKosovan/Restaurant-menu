const Router = require('express');
const router = new Router();
const mealController = require('../controllers/mealController');


router.get('/:id', mealController.getMealByCategory);//??
router.post('/', mealController.createMeal);
router.patch('/', mealController.updateMeal);
router.delete('/:id', mealController.deleteMeal);



module.exports = router;
const Router = require('express');
const router = new Router();
const mealController = require('../controllers/mealController');

router.get('/', mealController.getAll);
router.get('/?categoryId=[id]', mealController.getAll);//??

router.post('/', mealController.create);
router.patch('/:id', mealController.edit);
router.delete('/:id', mealController.delete);



module.exports = router;
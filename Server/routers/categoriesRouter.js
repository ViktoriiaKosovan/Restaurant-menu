const Router = require('express');
const router = new Router();
const categoriesController = require('../controllers/categoriesController');


router.get('/', categoriesController.getCategories);
router.post('/', categoriesController.createCategory);
router.patch('/', categoriesController.updateCategory);

module.exports = router;
const Router = require('express');
const router = new Router();
const categoriesController = require('../controllers/categoriesController');
const { categoryCreateSchema, categoryUpdateSchema } = require('./schemas/categoriesSchemas');
const validationMiddleware = require('../middleware/validationMiddleware');

router.get('/', categoriesController.getCategories);
router.post('/', validationMiddleware(categoryCreateSchema), categoriesController.createCategory);
router.patch('/', validationMiddleware(categoryUpdateSchema), categoriesController.updateCategory);

module.exports = router;
const Router = require('express');
const categoriesRouter = require('./categoriesRouter');
const infoRouter = require('./infoRouter');
const mealRouter = require('./mealRouter');


const router = new Router();


router.use('/category', categoriesRouter);
router.use('/meal', mealRouter);
router.use('/info', infoRouter);

module.exports = router;
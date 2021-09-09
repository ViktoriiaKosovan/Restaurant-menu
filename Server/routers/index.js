const Router = require('express');
const categoryRouter = require('./categoryRouter');
const infoRouter = require('./infoRouter');
const mealRouter = require('./mealRouter');


const router = new Router();


router.use('/category', categoryRouter);
router.use('/meal', infoRouter);
router.use('/info', mealRouter);

module.exports = router;
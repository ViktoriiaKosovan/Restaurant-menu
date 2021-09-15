const Router = require('express');
const router = new Router();
const infoControllers = require('../controllers/infoControllers');
const infoUpdateSchema = require('./schemas/infoSchema');
const validationMiddleware = require('../middleware/validationMiddleware');

router.get('/', infoControllers.getInfo);
router.patch('/',validationMiddleware(infoUpdateSchema), infoControllers.updateInfo);



module.exports = router;
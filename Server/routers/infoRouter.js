const Router = require('express');
const {getInfo, updateInfo} = require('../controllers/infoControllers');
const infoUpdateSchema = require('./schemas/infoSchema');
const validationMiddleware = require('../middleware/validationMiddleware');

const router = new Router();

router.get('/', getInfo);
router.patch('/',validationMiddleware(infoUpdateSchema), updateInfo);



module.exports = router;
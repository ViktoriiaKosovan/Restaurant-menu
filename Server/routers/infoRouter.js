const Router = require('express');
const router = new Router();
const infoControllers = require('../controllers/infoControllers');

router.get('/', infoControllers.getAll);
router.post('/', infoControllers.create);
router.patch('/', infoControllers.edit);
router.delete('/', infoControllers.delete);



module.exports = router;